from rest_framework import serializers
from .models import Favourite
# from jwt_auth.serializers import UserSerializer 
from mediums.serializers import MediumSerializer


class FavouriteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Favourite
        fields = '__all__'

class PopulatedFavouriteSerializer(FavouriteSerializer):
    medium = MediumSerializer()
    #* populates the owner on the favourite model 



