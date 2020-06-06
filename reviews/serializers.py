from rest_framework import serializers
from .models import Review



class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        #* similar to populate
        fields = '__all__'

