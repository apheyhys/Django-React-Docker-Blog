from rest_framework import serializers
from article.models import Article, Comment
from likes.models import Like, Dislike
from starrating.models import StarRating
from django.db.models import Avg
from likes.serializers import LikeSerializer, DislikeSerializer
from starrating.serializers import StarRatingSerializer
from easy_thumbnails.templatetags.thumbnail import thumbnail_url


class ThumbnailSerializer(serializers.ImageField):
    def __init__(self, alias, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.read_only = True
        self.alias = alias

    def to_representation(self, value):
        if not value:
            return None

        url = thumbnail_url(value, self.alias)
        request = self.context.get('request', None)
        if request is not None:
            return request.build_absolute_uri(url)
        return url


class RecursiveSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        if self.context is not None:
            serializer = self.parent.parent.__class__(value, context=self.context)
            return serializer.data


class CommentSerializer(serializers.ModelSerializer):
    """DRF Serializer For Listing Published Comment"""
    reply = RecursiveSerializer(many=True)
    user_name = serializers.ReadOnlyField(source='user.first_name')
    user_surname = serializers.ReadOnlyField(source='user.last_name')
    user_photo = serializers.ReadOnlyField(source='user.photo')
    owner_state = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()

    def get_owner_state(self, obj):
        queryset_like = Like.objects.filter(comment=obj.id, user=self.context.get('auth_user_id'))
        serializer_like = LikeSerializer(queryset_like, many=True)
        queryset_dislike = Dislike.objects.filter(comment=obj.id, user=self.context.get('auth_user_id'))
        serializer_dislike = DislikeSerializer(queryset_dislike, many=True)
        if self.context.get('auth_user_id'):
            if serializer_like.data:
                return "Like"
            elif serializer_dislike.data:
                return "Dislike"
            else:
                return "None"
        else:
            return "Unauthorized"

    @staticmethod
    def get_likes(obj):
        return obj.like_set.count()

    @staticmethod
    def get_dislikes(obj):
        return obj.dislike_set.count()

    class Meta:
        model = Comment
        fields = [
            'user_name',
            'user_surname',
            'user_photo',
            'body',
            'date',
            'id',
            'parent',
            'reply',
            'likes',
            'dislikes',
            'owner_state'
        ]


class ArticleSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    star_rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()
    rating_owner = serializers.SerializerMethodField()
    image_preview = ThumbnailSerializer(alias='list_preview')
    image_preview_big = serializers.SerializerMethodField()

    def get_image_preview_big(self, obj):
        return self.context['request'].build_absolute_uri('/media/') + str(obj.image_preview)

    def get_comments(self, obj):
        queryset = Comment.objects.filter(post_id=obj.id, parent_id=None).order_by('-date')
        user_id = self.context['request'].user.id
        return CommentSerializer(queryset, many=True, context={'auth_user_id': user_id}).data

    @staticmethod
    def get_comments_count(obj):
        return obj.comments.count()

    @staticmethod
    def get_rating_count(obj):
        return StarRating.objects.filter(post=obj.id).count()

    def get_rating_owner(self, obj):
        if self.context['request'].user.id:
            if StarRating.objects.filter(post=obj.id, user=self.context['request'].user.id).exists():
                queryset_rating = StarRating.objects.get(post=obj.id, user=self.context['request'].user.id)
                serializer_rating = StarRatingSerializer(queryset_rating)
                return serializer_rating.data['rating']
            else:
                return "None"
        else:
            return "Unauthorized"

    @staticmethod
    def get_star_rating(obj):
        queryset = StarRating.objects.filter(post=obj.id).aggregate(Avg('rating'))
        return queryset['rating__avg']

    class Meta:
        model = Article
        lookup_field = 'slug'
        fields = (
            'id',
            'slug',
            'publications_date',
            'tag',
            'title',
            'content_preview',
            'body',
            'url',
            'image_preview',
            'image_preview_big',
            'image_preview_name',
            'comments',
            'comments_count',
            'views_count',
            'description',
            'star_rating',
            'rating_count',
            'rating_owner'
        )


class TagsCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        lookup_field = 'slug'
        fields = (
            'slug',
            'tag'
        )


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            'user',
            'body',
            'post',
            'parent'
        )


class AllArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'title',
            'url',
            'tag',
            'slug',
            'id'
        )


class ArticlePopularSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'id',
            'title',
            'views_count',
            'slug'
        )
