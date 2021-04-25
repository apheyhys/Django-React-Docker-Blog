import datetime
import uuid
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from os import path as op
from time import time
from hashlib import md5
from uuslug import slugify
from tinymce.models import HTMLField
from subscriber.models import Subscriber
from django.conf import settings


# Auto generate name for File and Image fields
def upload_to(instance, filename, unique=False):
    ext = op.splitext(filename)[1]
    name = str(instance.pk or '') + filename + (str(time()) if unique else '')
    filename = slugify(instance.image_preview_name)
    filename_unique = slugify(instance.image_preview_name) + '-' + md5(name.encode('utf8')).hexdigest() + ext
    basedir = op.join(instance._meta.app_label)
    return op.join(basedir, 'image_preview_name', filename, filename_unique)


class Article(models.Model):
    id = models.AutoField(primary_key=True)
    slug = models.SlugField()
    publications_date = models.DateTimeField(blank=True, null=True, default=datetime.datetime.now)
    tag = models.CharField(max_length=100, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    url = models.URLField(blank=True)
    content_preview = models.TextField(blank=True)
    body = HTMLField(blank=True, null=True)
    image_preview = models.ImageField(upload_to=upload_to, blank=True)
    image_preview_name = models.CharField(max_length=100, blank=True, null=True)
    views_count = models.IntegerField(default=0)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.title

    @property
    def comments_list(self):
        return self.comments.filter()


# Signal after create article
@receiver(post_save, sender=Article)
def save_profile(sender, created, instance, **kwargs):
    if created:
        period = 50
        for e in Subscriber.objects.filter(confirmed=True):
            from article.tasks import send_subscribed_email
            send_subscribed_email.delay(period,
                                        e.email,
                                        e.verification_code,
                                        instance.title,
                                        instance.slug,
                                        instance.content_preview)
            period *= 2


class Comment(models.Model):
    """Model for the comments in the blog posts"""
    id = models.CharField(max_length=100, blank=True, unique=True, default=uuid.uuid4, primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField(blank=True, null=True)
    post = models.ForeignKey(Article, on_delete=models.CASCADE, blank=True,
                             related_name='comments', related_query_name='comment')
    parent = models.ForeignKey('self', related_name='reply', null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'Post - "{self.post.title}", Body - "{self.body}"'
