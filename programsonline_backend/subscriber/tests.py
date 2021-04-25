from django.urls import include, path
from rest_framework import status
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework.test import APIRequestFactory
from rest_framework.utils import json
from views import NewSubscriber, DeleteSubscriber

from django.conf import settings


class ContactTest(APITestCase, URLPatternsTestCase):
    urlpatterns = [
        path('', include('subscriber.urls')),
    ]

    def test_create_subscriber(self):
        factory = APIRequestFactory()
        data = {
            "email": "test@mail.ru",
            "verification_code": "9cfd09b6-2a6b-11eb-adc1-0242ac120002"
        }
        json_data = json.dumps(data)
        request = factory.post('', data=json_data, content_type='application/json')
        view = NewSubscriber.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, "Subscriber create")

    def test_get_subscriber(self):
        factory = APIRequestFactory()
        request = factory.get('/?confirmation="9cfd09b6-2a6b-11eb-adc1-0242ac120002')
        view = NewSubscriber.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertEqual(response.url, settings.CURRENT_HOST + "subscribed")

    def test_delete_subscriber(self):
        factory = APIRequestFactory()
        request = factory.get('/?confirmation="9cfd09b6-2a6b-11eb-adc1-0242ac120002')
        view = DeleteSubscriber.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertEqual(response.url, settings.CURRENT_HOST + "unsubscribed")
