from django.urls import path
from .views import ImageUploadView, translate_text

urlpatterns = [
    path('upload/', ImageUploadView.as_view()),
     path('translate/', translate_text, name='translate'),
]