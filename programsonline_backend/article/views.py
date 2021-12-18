from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer, TagsCountSerializer, AllArticleSerializer, ArticlePopularSerializer
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import CommentCreateSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope


class ArticleResultsSetPagination(LimitOffsetPagination):
    page_size = 10
    default_limit = 10

    def __init__(self):
        self.count = None

    def get_paginated_response(self, data):
        queryset = Article.objects.filter(published=True).count()

        return Response({
            'count': self.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'total_count': self.page_size,
            'offset':  self.offset,
            'all_article_count': queryset,
            'results': data,
        })


class ListArticle(generics.ListAPIView):
    queryset = Article.objects.filter(published=True)
    serializer_class = ArticleSerializer
    pagination_class = ArticleResultsSetPagination
    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id']
    ordering = ['-id']
    filterset_fields = ['tag']
    search_fields = ['title', 'content_preview']

    def get_view_name(self):
        return 'Programs Online'

    def get_view_description(self, html=False):
        return 'Онлайн программы и сервисы'


class ListAllArticle(generics.ListAPIView):
    queryset = Article.objects.filter(published=True)
    serializer_class = AllArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.filter(published=True).order_by('-tag')
        return queryset


class DetailArticle(APIView):
    queryset = Article.objects.filter(published=True)
    serializer_class = ArticleSerializer
    lookup_field = 'slug'

    @staticmethod
    def get(request, slug):
        articles = Article.objects.get(slug=slug)
        articles.views_count += 1
        articles.save(update_fields=("views_count",))
        if request:
            serializer = ArticleSerializer(articles, context={'request': request})
        else:
            serializer = ArticleSerializer(articles)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListTagsCounter(generics.ListAPIView):
    queryset = Article.objects.filter(published=True)
    serializer_class = TagsCountSerializer
    pagination_class = ArticleResultsSetPagination

    def list(self, request, *args, **kwargs):
        response = super().list(request, args, kwargs)
        response.data['tag_count'] = Article.objects.values('tag').annotate(count=Count('tag')).order_by('-tag')
        return response


class CommentCreate(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]

    @staticmethod
    def post(request, slug):
        serializer = CommentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListPopularArticle(generics.ListAPIView):
    queryset = Article.objects.filter(published=True).order_by('-views_count')[:5]
    serializer_class = ArticlePopularSerializer
