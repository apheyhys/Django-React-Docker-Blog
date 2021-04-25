from rest_framework.permissions import IsAuthenticated
from .models import Like, Dislike
from article.models import Comment
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope


class LikeCreate(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]

    @staticmethod
    def post(request):
        comment = get_object_or_404(Comment, pk=request.data['comment_id'])
        if Like.objects.filter(user=request.user, comment=comment).exists():
            Like.objects.get(user=request.user, comment=comment).delete()
            comment.save()
            return Response({"like": "off"}, status=status.HTTP_200_OK)
        else:
            Like.objects.create(user=request.user, comment=comment)
            if Dislike.objects.filter(user=request.user, comment=comment).exists():
                Dislike.objects.get(user=request.user, comment=comment).delete()
            comment.save()
            return Response({"like": "on"}, status=status.HTTP_200_OK)


class DislikeCreate(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]

    @staticmethod
    def post(request):
        comment = get_object_or_404(Comment, pk=request.data['comment_id'])
        if Dislike.objects.filter(user=request.user, comment=comment).exists():
            Dislike.objects.get(user=request.user, comment=comment).delete()
            comment.save()
            return Response({"dislike": "off"}, status=status.HTTP_200_OK)
        else:
            Dislike.objects.create(user=request.user, comment=comment)
            if Like.objects.filter(user=request.user, comment=comment).exists():
                Like.objects.get(user=request.user, comment=comment).delete()
            comment.save()
            return Response({"dislike": "on"}, status=status.HTTP_200_OK)
