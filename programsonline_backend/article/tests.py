from datetime import timedelta
from django.contrib.auth import get_user_model
from django.utils import timezone
from oauth2_provider.oauth2_validators import AccessToken
from oauthlib.oauth2.rfc6749.tokens import random_token_generator
from rest_framework import status
from django.urls import include, path
from rest_framework.test import force_authenticate, APIRequestFactory
from collections import OrderedDict
from rest_framework.utils import json
from users.models import User
from .models import Article
from .views import ListArticle, ListAllArticle, DetailArticle, CommentCreate, ListTagsCounter, \
    ListPopularArticle
from rest_framework.test import APITestCase, URLPatternsTestCase

UserModel = get_user_model()


class ArticleTest(APITestCase, URLPatternsTestCase):
    urlpatterns = [
        path('', include('article.urls')),
    ]

    @classmethod
    def setUpTestData(cls):
        Article.objects.create(
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
        Article.objects.create(
            slug='second_slug',
            publications_date=timezone.now(),
            tag='secondary',
            title='Second test article',
            url='https://second.com',
            content_preview='second_another_picture',
            body='Second test body for rest api',
            image_preview='',
            image_preview_name='Second Test image name',
            views_count=100,
            description='second_blank',
        )
        User.objects.create(
            username='test_user',
            id=1
        )

    def test_get_list_article(self):
        factory = APIRequestFactory()
        request = factory.get('/article/')
        view = ListArticle.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['slug'], 'slug_name')

    def test_get_list_all_article(self):
        factory = APIRequestFactory()
        request = factory.get('/all-article/')
        view = ListAllArticle.as_view()
        response = view(request)
        expected_data = OrderedDict([('title', 'Test article'),
                                     ('url', 'https://any.com'),
                                     ('tag', 'another'),
                                     ('id', 1)
                                     ])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[1], expected_data)

    def test_detail_article(self):
        factory = APIRequestFactory()
        request = factory.get('/article/slug_name')
        view = DetailArticle.as_view()
        response = view(request, slug='slug_name')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], 1)
        self.assertEqual(response.data['image_preview_name'], 'Test image name')

    def test_create_comment(self):
        factory = APIRequestFactory()
        data = {
                                   "user": 1,
                                   "body": "Test body",
                                   "post": "1",
                                   "parent": ""
                                }
        json_data = json.dumps(data)
        request = factory.post('/article/create/slug_name/', data=json_data, content_type='application/json')
        access_token = AccessToken.objects.create(
            user=User.objects.get(username='test_user'),
            scope='read write',
            expires=timezone.now() + timedelta(seconds=300),
            token=random_token_generator(request)
        )
        force_authenticate(request, user=User.objects.get(username='test_user'), token=access_token)
        view = CommentCreate.as_view()
        response = view(request, slug='slug_name')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['body'], 'Test body')

    def test_list_tags(self):
        factory = APIRequestFactory()
        request = factory.get('/tags-count/')
        view = ListTagsCounter.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
        self.assertEqual(response.data['results'][0]['tag'], 'another')

    def test_list_popular_article(self):
        factory = APIRequestFactory()
        request = factory.get('/article-popular/')
        view = ListPopularArticle.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(response.data[0]['views_count'], response.data[1]['views_count'])
