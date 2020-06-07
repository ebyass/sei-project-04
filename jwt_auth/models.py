from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    user_favourites = models.ForeignKey(
    'favourites.Favourite',
    related_name='jwt_auth',
    on_delete=models.CASCADE,
    null=True
    )



