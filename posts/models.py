from django.db import models



class Post(models.Model):
    title = models.CharField(max_length=50)
    date_posted = models.DateTimeField()
    info = models.CharField(max_length=1000)
    image = models.CharField(max_length=400, blank=True, null=True)

#! ONE TO MANY
    mediums = models.ForeignKey(
        'mediums.Medium',
        related_name='posts',
        on_delete=models.CASCADE
        
    )

    def __str__(self):
        return f'{self.title}'
