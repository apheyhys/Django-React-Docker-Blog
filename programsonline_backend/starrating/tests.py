from datetime import timedelta
from django.contrib.auth import get_user_model
from django.utils import timezone
from oauth2_provider.oauth2_validators import AccessToken
from oauthlib.oauth2.rfc6749.tokens import random_token_generator
from rest_framework import status
from django.urls import include, path
from rest_framework.test import force_authenticate, APIRequestFactory
from rest_framework.utils import json
from starrating.models import StarRating
from starrating.views import CreateStarRating
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
            id=1,
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
        StarRating.objects.create(
            user=user,
            post=article,
            rating=3
        )

    def test_create_starrating(self):
        factory = APIRequestFactory()
        data = {
            "user": 1,
            "article_id": 1,
            "rating": 1
        }
        json_data = json.dumps(data)
        request = factory.post('/', data=json_data, content_type='application/json')
        access_token = AccessToken.objects.create(
            user=User.objects.get(username='test_user'),
            scope="read write",
            expires=timezone.now() + timedelta(seconds=300),
            token=random_token_generator(request)
        )
        force_authenticate(request, user=User.objects.get(username='test_user'), token=access_token)
        view = CreateStarRating.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['rating'], 1)
