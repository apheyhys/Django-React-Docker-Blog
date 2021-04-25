from rest_framework import serializers
from .models import Like, Dislike


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = [
            'user'
        ]


class DislikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dislike
        fields = [
            'user'
        ]
