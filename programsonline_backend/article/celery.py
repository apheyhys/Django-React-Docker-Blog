from __future__ import absolute_import, unicode_literals
from celery.schedules import crontab
import os
import django
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'programsonline_backend.settings')
django.setup()

app = Celery('programsonline_backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    'clear_tokens_per_one_day': {
        'task': 'article.tasks.clear_tokens',
        'schedule': crontab(minute=0, hour=0)
    },
}
app.conf.timezone = 'UTC'
