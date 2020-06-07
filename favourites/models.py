from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Favourite(models.Model):

    medium = models.ForeignKey('mediums.Medium', related_name='favourites', on_delete=models.PROTECT)
    owner = models.ForeignKey('jwt_auth.User', related_name='favourites', on_delete=models.PROTECT)
    
def __str__(self):
    return f'Favourite {self.owner}'