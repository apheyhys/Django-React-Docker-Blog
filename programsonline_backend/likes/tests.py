from datetime import timedelta
from django.contrib.auth import get_user_model
from django.utils import timezone
from oauth2_provider.oauth2_validators import AccessToken
from oauthlib.oauth2.rfc6749.tokens import random_token_generator
from rest_framework import status
from django.urls import include, path
from rest_framework.test import force_authenticate, APIRequestFactory
from rest_framework.utils import json
from article.models import Comment
from likes.views import LikeCreate, DislikeCreate
from users.models import User
from article.models import Article
from rest_framework.test import APITestCase, URLPatternsTestCase

UserModel = get_user_model()


class LikesTest(APITestCase, URLPatternsTestCase):
    urlpatterns = [
        path('', include('likes.urls')),
    ]

    @classmethod
    def setUpTestData(cls):
        user = User.objects.create(
            username='test_user',
            id=1
        )
        article = Article.objects.create(
            slug='slug_name',
            publications_date=timezone.now(),
            tag='another',
            title='Test article',
            url='https://any.com',
            content_preview='another_picture',
            body='This is a test body for rest api',
            image_preview='',
            image_preview_name='Test image name',
            views_count=1,
            description='blank',
        )
        Comment.objects.create(
            id="bd65600d-8669-4903-8a14-af88203add38",
            user=user,
            body='Test comment',
            post=article
        )

    def test_create_like(self):
        factory = APIRequestFactory()

        data = {
            "comment_id": "bd65600d-8669-4903-8a14-af88203add38"
        }
        json_data = json.dumps(data)
        request = factory.post('/likes/like_create', data=json_data, content_type='application/json')
        access_token = AccessToken.objects.create(
            user=User.objects.get(username='test_user'),
            scope="read write",
            expires=timezone.now() + timedelta(seconds=300),
            token=random_token_generator(request)
        )
        force_authenticate(request, user=User.objects.get(username='test_user'), token=access_token)
        view = LikeCreate.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['like'], 'on')

    def test_create_dislike(self):
        factory = APIRequestFactory()

        data = {
            "comment_id": "bd65600d-8669-4903-8a14-af88203add38"
        }
        json_data = json.dumps(data)
        request = factory.post('/likes/dislike_create', data=json_data, content_type='application/json')
        access_token = AccessToken.objects.create(
            user=User.objects.get(username='test_user'),
            scope="read write",
            expires=timezone.now() + timedelta(seconds=300),
            token=random_token_generator(request)
        )
        force_authenticate(request, user=User.objects.get(username='test_user'), token=access_token)
        view = DislikeCreate.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['dislike'], 'on')
