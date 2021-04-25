from django.urls import path, include
from django.conf.urls import url
from . import views
from django.conf import settings
from django.conf.urls.static import static
from filebrowser.sites import site

urlpatterns = [
    path('article/', views.ListArticle.as_view()),
    path('article/<slug:slug>', views.DetailArticle.as_view()),
    path('article/create/<slug:slug>', views.CommentCreate.as_view()),
    path('tinymce/', include('tinymce.urls')),
    path('admin/filebrowser/', site.urls),
    path('tags-count/', views.ListTagsCounter.as_view()),
    path('all-article/', views.ListAllArticle.as_view()),
    path('article-popular/', views.ListPopularArticle.as_view()),
]
