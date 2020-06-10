from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Review
User = get_user_model()

#* wrote another one as only want the id and username
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')



class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        #* similar to populate
        fields = '__all__'


class PopulatedReviewSerializer(ReviewSerializer):
    owner = UserSerializer()