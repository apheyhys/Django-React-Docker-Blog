from rest_framework import serializers
from .models import Subscriber


class SubscriberCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = (
            'email',
            'confirmed',
            'verification_code'
        )
