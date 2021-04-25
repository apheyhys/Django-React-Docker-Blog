from rest_framework.generics import CreateAPIView
from .models import Contact
from .serializers import ContactCreateSerializer


class CreateContact(CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactCreateSerializer
