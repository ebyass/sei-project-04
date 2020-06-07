from rest_framework import serializers
# from django.contrib.auth import get_user_model
# User = get_user_model()
from .models import Favourite

class FavouriteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Favourite
        fields = '__all__'

# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = ('id', 'username')


# class PopulatedFavouriteSerializer(FavouriteSerializer):
#     owner = UserSerializer()
