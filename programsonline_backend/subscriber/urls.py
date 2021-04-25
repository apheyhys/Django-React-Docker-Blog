from django.urls import path
from . import views


urlpatterns = [
    path('new-subscriber/', views.NewSubscriber.as_view()),
    path('delete-subscriber/', views.DeleteSubscriber.as_view()),
]
