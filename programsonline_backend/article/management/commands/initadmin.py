from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.conf import settings


class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        if User.objects.exists():
            return

        username = settings.DJANGO_SUPERUSER_USERNAME
        password = settings.DJANGO_SUPERUSER_PASSWORD
        email = settings.DJANGO_SUPERUSER_EMAIL

        User.objects.create_superuser(username=username, password=password, email=email)

        self.stdout.write(f'Local user "{username}" was created')
