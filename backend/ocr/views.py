from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import query_gemini
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser
from .models import UploadedImage
from .utils import extract_text_from_image

class ImageUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        images = request.FILES.getlist('images')
        result_data = []

        for img in images:
            uploaded = UploadedImage.objects.create(image=img)
            # Extract text from the image using pytesseract (OCR)
            extracted_text = extract_text_from_image(uploaded.image.path)
            result_data.append({'extracted_text': extracted_text})

        return Response({'data': result_data})

@csrf_exempt
@api_view(['POST'])
def translate_text(request):
    try:
        text = request.data.get("text", "")
        if not text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Call Gemini
        translated = query_gemini(text)
        return Response({"translated": translated})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

