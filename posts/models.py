from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=50)
    date_posted = models.DateTimeField()
    info = models.CharField(max_length=1000)
    image_film = models.CharField(max_length=400)
    image_art = models.CharField(max_length=400)
    image_music = models.CharField(max_length=400)
    film_title = models.CharField(max_length=50)
    art_title = models.CharField(max_length=50)
    music_title = models.CharField(max_length=50)

#! MANY TO MANY
    mediums = models.ManyToManyField(
        'mediums.Medium',
        related_name='posts',
        
    )

    def __str__(self):
        return f'{self.title}'
