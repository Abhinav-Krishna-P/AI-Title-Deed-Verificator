from django.db import models

class UploadedImage(models.Model):
    image = models.ImageField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class ExtractedData(models.Model):
    image = models.ForeignKey(UploadedImage, on_delete=models.CASCADE)
    field_name = models.CharField(max_length=255)
    field_value = models.TextField()
