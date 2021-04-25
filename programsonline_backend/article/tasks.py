from time import sleep
from django.core.mail import EmailMultiAlternatives
from django.template import loader
from oauth2_provider.models import clear_expired

from article.celery import app


# Remove those refresh tokens whose lifetime is greater
@app.task
def clear_tokens():
    clear_expired()


@app.task
def send_confirmation_email(to_email, verification_code):
    sleep(10)  # delay 10 seconds after created new subscriber
    subject = 'Подтвердите подписку на рассылку от Programsonline'
    from_email = 'admin@programsonline.ru'
    to = to_email
    text_content = 'This is an important message.'
    html_content = loader.render_to_string('mail_template.html', {'verification_code': verification_code})
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()


@app.task
def send_subscribed_email(period, email, verification_code, title, slug, content_preview):
    sleep(period)
    subject = title
    from_email = 'admin@programsonline.ru'
    to = email
    text_content = 'This is an important message.'
    html_content = loader.render_to_string('mailing_template.html',
                                           {'title': title,
                                            'slug': slug,
                                            'content_preview': content_preview,
                                            'verification_code': verification_code})
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
