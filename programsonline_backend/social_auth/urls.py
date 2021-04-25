from django.urls import path
from . import views


urlpatterns = [
    path('user/', views.UserDetail.as_view()),
    path('vk-api/', views.VkConvert.as_view()),
    path('yandex-convert/', views.YandexConvert.as_view()),
    path('mail-convert/', views.MailConvert.as_view()),
    path('ok-convert/', views.OkConvert.as_view()),
]
