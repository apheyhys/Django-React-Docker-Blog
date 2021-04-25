from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/', include('article.urls')),
    path('api/auth/', include('rest_framework_social_oauth2.urls')),
    path('api/api-auth/', include('rest_framework.urls')),
    path('api/create-contact/', include('contact.urls')),
    path('api/get-token/', include('social_auth.urls')),
    path('api/likes/', include('likes.urls')),
    path('api/star-rating/', include('starrating.urls')),
    path('api/subscriber/', include('subscriber.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
