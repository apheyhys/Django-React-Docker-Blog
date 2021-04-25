import os
from pathlib import Path
import environ

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, True)
)
# reading .env file
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
DEBUG = env('DEBUG')
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
if DEBUG:
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = env('DJANGO_ALLOWED_HOSTS').split(',')

DJANGO_SUPERUSER_PASSWORD = env('DJANGO_SUPERUSER_PASSWORD')
DJANGO_SUPERUSER_USERNAME = env('DJANGO_SUPERUSER_USERNAME')
DJANGO_SUPERUSER_EMAIL = env('DJANGO_SUPERUSER_EMAIL')

CURRENT_HOST = env('CURRENT_HOST')
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'environ',
    'sslserver',
    'corsheaders',
    'article',
    'social_auth',
    'contact',
    'likes',
    'starrating',
    'subscriber',
    'tinymce',
    'filebrowser',
    'rest_framework',
    'django_filters',
    'oauth2_provider',
    'social_django',
    'rest_framework_social_oauth2',
    'users.apps.UsersConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'programsonline_backend.urls'

AUTH_USER_MODEL = 'users.User'

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'users.serializers.UserSerializer',
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'programsonline_backend.wsgi.application'

DATABASES = {
    "default": env.db()
}

CSRF_COOKIE_SECURE = True

SECURE_SSL_REDIRECT = True

SESSION_COOKIE_SECURE = True

SECURE_HSTS_PRELOAD = True

SECURE_HSTS_INCLUDE_SUBDOMAINS = True

SECURE_HSTS_SECONDS = 518400

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

USE_X_FORWARDED_HOST = True

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

CORS_ORIGIN_ALLOW_ALL = True

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_METADATA_CLASS': 'rest_framework.metadata.SimpleMetadata'
}

AUTHENTICATION_BACKENDS = (
    # Facebook OAuth2
    'social_core.backends.facebook.FacebookAppOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    # VK OAuth2
    'social_core.backends.vk.VKOAuth2',
    # Google OAuth2
    'social_core.backends.google.GoogleOAuth2',
    # Instagram
    'social_core.backends.instagram.InstagramOAuth2',
    # Yandex
    'social_core.backends.yandex.YandexOAuth2',
    # OK
    'social_core.backends.odnoklassniki.OdnoklassnikiOAuth2',
    # Mail
    'social_core.backends.mailru.MailruOAuth2',
    # django-rest-framework-social-oauth2
    'rest_framework_social_oauth2.backends.DjangoOAuth2',
    # Django
    'django.contrib.auth.backends.ModelBackend',
)

SOCIAL_AUTH_FACEBOOK_KEY = env('SOCIAL_AUTH_FACEBOOK_KEY')
SOCIAL_AUTH_FACEBOOK_SECRET = env('SOCIAL_AUTH_FACEBOOK_SECRET')

SOCIAL_AUTH_VK_OAUTH2_KEY = env('SOCIAL_AUTH_VK_OAUTH2_KEY')
SOCIAL_AUTH_VK_OAUTH2_SECRET = env('SOCIAL_AUTH_VK_OAUTH2_SECRET')

SOCIAL_AUTH_VK_OAUTH2_SCOPE = ['email']

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env('SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET')

SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
]

SOCIAL_AUTH_YANDEX_OAUTH2_KEY = env('SOCIAL_AUTH_YANDEX_OAUTH2_KEY')
SOCIAL_AUTH_YANDEX_OAUTH2_SECRET = env('SOCIAL_AUTH_YANDEX_OAUTH2_SECRET')

SOCIAL_AUTH_ODNOKLASSNIKI_OAUTH2_KEY = env('SOCIAL_AUTH_ODNOKLASSNIKI_OAUTH2_KEY')
SOCIAL_AUTH_ODNOKLASSNIKI_OAUTH2_SECRET = env('SOCIAL_AUTH_ODNOKLASSNIKI_OAUTH2_SECRET')
SOCIAL_AUTH_ODNOKLASSNIKI_OAUTH2_PUBLIC_NAME = env('SOCIAL_AUTH_ODNOKLASSNIKI_OAUTH2_PUBLIC_NAME')

SOCIAL_AUTH_MAILRU_OAUTH2_KEY = env('SOCIAL_AUTH_MAILRU_OAUTH2_KEY')
SOCIAL_AUTH_MAILRU_OAUTH2_SECRET = env('SOCIAL_AUTH_MAILRU_OAUTH2_SECRET')

SOCIAL_AUTH_POSTGRES_JSONFIELD = True

SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
    'fields': 'id, name, email, picture.type(large), link'
}

SOCIAL_AUTH_VK_PROFILE_EXTRA_PARAMS = {
    'fields': 'photo_big, email'
}

SOCIAL_AUTH_FACEBOOK_EXTRA_DATA = [
    ('name', 'name'),
    ('first_name', 'first_name'),
    ('last_name', 'last_name'),
    ('email', 'email'),
    ('picture', 'photo'),
    ('id', 'id'),  # 1-какие данные, 2-поле куда записывать
]

SOCIAL_AUTH_VK_OAUTH2_EXTRA_DATA = ['photo_big', 'email']

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'users.pipeline.add_extra_data_to_the_user',
    'social_core.pipeline.user.user_details',

)

OAUTH2_PROVIDER = {
    'SCOPES': {'read': 'Read scope', 'write': 'Write scope'},
    'ACCESS_TOKEN_EXPIRE_SECONDS': 300000,
    'REFRESH_TOKEN_EXPIRE_SECONDS': 300000
}

CELERY_BROKER_URL = 'redis://redis:6379/0'
CELERY_RESULT_BACKEND = "redis://redis:6379"
BROKER_TRANSPORT = 'redis'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.yandex.ru'
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

ACCOUNT_DEFAULT_HTTP_PROTOCOL = "https"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'article/../media')
STATIC_URL = '/staticfiles/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_DIR = os.path.join(BASE_DIR, 'staticfiles')

FILEBROWSER_DIRECTORY = './'

SITE_ID = 1

TINYMCE_DEFAULT_CONFIG = {
    'selector': 'textarea',
    'theme': 'modern',
    'plugins': 'link image preview codesample contextmenu table code lists template',
    'toolbar1': 'formatselect | bold italic underline | alignleft aligncenter alignright alignjustify '
                '| bullist numlist | template | outdent indent | table | link image | codesample | preview code ',
    'width': '80%',
    'extended_valid_elements': 'p[class="MuiTypography-root MuiTypography-body2"],li[class="MuiTypography-root '
                               'MuiTypography-body2"],span[class="MuiTypography-root MuiTypography-body2"],'
                               '[class="MuiTypography-root MuiLink-root MuiLink-underlineHover '
                               'MuiTypography-colorPrimary"]',
    'relative_urls': 0,
    'remove_script_host': 0,
    'convert_urls': 'true',
    'image_class_list': [
        {'title': 'img-responsive', 'value': 'img-responsive'},
    ],
}
