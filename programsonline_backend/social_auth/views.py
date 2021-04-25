from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from django.conf import settings
from rest_framework_social_oauth2.authentication import SocialAuthentication
import requests


class VkConvert(APIView):

    @staticmethod
    def post(request):
        url = 'https://oauth.vk.com/access_token'
        code = request.data['code']
        data = {
            "client_id": settings.SOCIAL_AUTH_VK_OAUTH2_KEY,
            "client_secret": settings.SOCIAL_AUTH_VK_OAUTH2_SECRET,
            "redirect_uri": settings.CURRENT_HOST + "auth",
            "code": code,
        }
        res = requests.post(url, data=data)
        result = res.json()
        return Response(result['access_token'])


class YandexConvert(APIView):

    @staticmethod
    def post(request):
        url = 'https://oauth.yandex.com/token'
        code = request.data['code']
        data = {
            "client_id": settings.SOCIAL_AUTH_YANDEX_OAUTH2_KEY,
            "client_secret": settings.SOCIAL_AUTH_YANDEX_OAUTH2_SECRET,
            "code": code,
            "grant_type": "authorization_code",
        }
        res = requests.post(url, data=data)
        result = res.json()
        return Response(result['access_token'])


class MailConvert(APIView):

    @staticmethod
    def post(request):
        url = 'https://connect.mail.ru/oauth/token'
        code = request.data['code']
        print(code)
        data = {
            "client_id": settings.SOCIAL_AUTH_MAILRU_OAUTH2_KEY,
            "client_secret": settings.SOCIAL_AUTH_MAILRU_OAUTH2_SECRET,
            "code": code,
            "redirect_uri": settings.CURRENT_HOST + "auth",
            "grant_type": "authorization_code",
        }
        res = requests.post(url, data=data)
        result = res.json()
        return Response(result['access_token'])


class OkConvert(APIView):

    @staticmethod
    def post(request):
        url = 'https://api.ok.ru/oauth/token.do'
        code = request.data['code']
        data = {
            "client_id": settings.SOCIAL_AUTH_ODNOKLASSNIKI_OAUTH2_KEY,
            "client_secret": settings.SOCIAL_AUTH_ODNOKLASSNIKI_OAUTH2_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": settings.CURRENT_HOST + "auth",
        }
        res = requests.post(url, data=data)
        result = res.json()
        return Response(result['access_token'])


class UserDetail(APIView):
    authentication_classes = [TokenAuthentication, OAuth2Authentication, SocialAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request):
        content = {
            'name': str(request.user.first_name),
            'surname': str(request.user.last_name),
            'pictureLink': str(request.user.photo),
            'id': str(request.user.id),
        }
        return Response(content)
