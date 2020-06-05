from django.urls import path
from .views import MediumListView, MediumDetailView

#* mini router to be hooked up to main router in projects

urlpatterns = [
    path('', MediumListView.as_view()),
    #* same as /:id
    path('<int:pk>/', MediumDetailView.as_view())
]