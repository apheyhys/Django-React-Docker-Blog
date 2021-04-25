from rest_framework import serializers
from .models import StarRating


class StarRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StarRating
        fields = '__all__'
