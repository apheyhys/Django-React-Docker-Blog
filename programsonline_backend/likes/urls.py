from django.urls import path
from . import views


urlpatterns = [
    path('like_create/', views.LikeCreate.as_view()),
    path('dislike_create/', views.DislikeCreate.as_view()),
]
