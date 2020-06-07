from rest_framework import serializers
from django.apps import apps
from mediums.serializers import MediumSerializer
# from jwt_auth.serializers import UserSerializer
from .models import Favourite
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')



class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = '__all__'
        
class PopulatedFavouriteSerializer(FavouriteSerializer):
    mediums = MediumSerializer(many=True)
    