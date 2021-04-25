from django.urls import path
from . import views


urlpatterns = [
    path('', views.CreateContact.as_view()),
]
