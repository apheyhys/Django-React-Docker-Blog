from django.db.models import Avg
from rest_framework.permissions import IsAuthenticated
from .models import StarRating
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope


class CreateStarRating(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]

    @staticmethod
    def post(request):
        if 0.1 < float(request.data['rating']) <= 5:
            if StarRating.objects.filter(user=request.user, post_id=request.data['article_id']).exists():
                star_rating = StarRating.objects.get(user=request.user, post_id=request.data['article_id'])
                star_rating.rating = request.data['rating']
                star_rating.save(update_fields=['rating'])
            else:
                StarRating.objects.create(user=request.user, post_id=request.data['article_id'],
                                          rating=request.data['rating'])
        else:
            if StarRating.objects.filter(user=request.user, post_id=request.data['article_id']).exists():
                StarRating.objects.get(user=request.user, post_id=request.data['article_id']).delete()
        rating_count = StarRating.objects.filter(post=request.data['article_id']).count()
        rating = StarRating.objects.filter(post=request.data['article_id']).aggregate(Avg('rating'))
        return Response({"rating_count": rating_count, "rating": rating['rating__avg']}, status=status.HTTP_200_OK)

