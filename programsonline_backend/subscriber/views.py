from .models import Subscriber
from .serializers import SubscriberCreateSerializer
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from article.tasks import send_confirmation_email

from django.conf import settings


class NewSubscriber(APIView):

    @staticmethod
    def post(request):
        serializer = SubscriberCreateSerializer(data=request.data)
        if serializer.is_valid():
            subscriber_email = request.data["email"]
            serializer.save()
            verification_code = serializer.data["verification_code"]
            send_confirmation_email.delay(subscriber_email, verification_code)
            return Response("Subscriber create", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def get(request):
        confirmed_code = request.GET['confirmation']
        if Subscriber.objects.filter(verification_code=confirmed_code).exists():
            Subscriber.objects.filter(verification_code=confirmed_code).update(confirmed=True)
        return redirect(settings.CURRENT_HOST + "subscribed")


class DeleteSubscriber(APIView):
    @staticmethod
    def get(request):
        delete_email = request.GET['confirmation']
        if Subscriber.objects.filter(verification_code=delete_email).exists():
            Subscriber.objects.filter(email=delete_email).delete()
        return redirect(settings.CURRENT_HOST + "unsubscribed")
