from rest_framework import serializers
from .models import Post
from mediums.serializers import MediumSerializer

class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields = '__all__'

class PopulatedPostSerializer(PostSerializer):

    mediums = MediumSerializer(many=True)