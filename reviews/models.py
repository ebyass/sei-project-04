# pylint: disable=no-member
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model

User = get_user_model()

class Review(models.Model):
    content = models.TextField(max_length=300)
    #! RATING
    #* small number that must be positive. Minium number of 1, max of 5. Any number in between.
    rating = models.PositiveSmallIntegerField(blank=True, null=True,validators=[MinValueValidator(1), MaxValueValidator(5)])
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='reviews', 
        on_delete=models.CASCADE
        )
    medium = models.ForeignKey(
        'mediums.Medium',
        related_name='reviews',
        on_delete=models.CASCADE
        )
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        #* can laster change string if want a different review identification i.e user
        return f'Review {self.id} - Medium {self.medium}'