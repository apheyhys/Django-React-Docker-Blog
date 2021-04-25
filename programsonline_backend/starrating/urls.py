from django.urls import path
from . import views


urlpatterns = [
    path('', views.CreateStarRating.as_view()),
]