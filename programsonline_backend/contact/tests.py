from django.urls import include, path
from rest_framework import status
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework.test import APIRequestFactory
from rest_framework.utils import json
from contact.views import CreateContact


class ContactTest(APITestCase, URLPatternsTestCase):
    urlpatterns = [
        path('', include('contact.urls')),
    ]

    def test_create_contact(self):
        factory = APIRequestFactory()
        data = {
            "name": "Test contact name",
            "body": "Test contact body"
        }
        json_data = json.dumps(data)
        request = factory.post('', data=json_data, content_type='application/json')
        view = CreateContact.as_view()
        response = view(request, slug='slug_name')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], "Test contact name")
