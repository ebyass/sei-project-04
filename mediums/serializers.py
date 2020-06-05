from rest_framework import serializers
from django.contrib.auth import get_user_model

# from comments.serializers import CommentSerializer
from genres.serializers import GenreSerializer
from categories.serializers import CategorySerializer
from .models import Medium
User = get_user_model()

#* wrote another one as only want the id and username
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')



#* making serisalizer
#* importing serializers pacakge to inherit + modelserializer to serialize the models.
#* stringifys so we can use and send as json
class MediumSerializer(serializers.ModelSerializer): #* Wite serializer, used still to create/update mediums
    #* what we define here is the shape of the json
    #* and sepcify what fields. you can specify whcih fields or you can say __all__
    #* if using only one it will only be a valid tuple like ('this',)
    class Meta:
        model = Medium
        fields = '__all__'
        

# # #* second serializer for medium to nest
# #* this one inheirts from the reqular MediumSerializer
# #* it already has it's meta class as it's inherited
class PopulatedMediumSerializer(MediumSerializer): #* Read serializer, used when you want to send populated data 
#     #* should be run through the CommentSerializer and many will need to be handled
# #     comments = CommentSerializer(many=True)
    genres = GenreSerializer(many=True)
    category = CategorySerializer()