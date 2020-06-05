from django.urls import path
from .views import MediumListView

#* mini router to be hooked up to main router in projects

urlpatterns = [
    path('', MediumListView.as_view()),
]