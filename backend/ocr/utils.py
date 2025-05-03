import pytesseract
from PIL import Image
import cv2
import numpy as np
import requests
import os
from dotenv import load_dotenv
import re

load_dotenv()

# Set path to tesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
def correct_rotation_and_preprocess(image_path):
    # Load image and convert to grayscale
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian blur and thresholding for better contrast
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # Find rotation angle and correct the image orientation
    coords = np.column_stack(np.where(thresh > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle

    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

    return Image.fromarray(cv2.cvtColor(rotated, cv2.COLOR_BGR2RGB))

def extract_text_from_image(image_path):
    processed_image = correct_rotation_and_preprocess(image_path)
    custom_config = r'--oem 3 --psm 6 -l mal'
    raw_text = pytesseract.image_to_string(processed_image, config=custom_config)

    # Clean the text
    cleaned_text = re.sub(r'\n+', '\n', raw_text)       # collapse multiple newlines
    cleaned_text = re.sub(r'[ ]{2,}', ' ', cleaned_text) # collapse multiple spaces

    # Remove unwanted characters and fix common OCR errors
    cleaned_text = re.sub(r'[^\w\s‌\u0D00-\u0D7F]', '', cleaned_text)  # Retain only Malayalam and whitespace
    cleaned_text = cleaned_text.replace('വഹ', 'വാ')  # Example fix for OCR errors

    # Split into lines and bullet for readability
    lines = [line.strip() for line in cleaned_text.split('\n') if line.strip()]
    formatted_text = lines

    return formatted_text


def query_gemini(text):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={os.getenv('GEMINI_API_KEY')}"
    headers = {"Content-Type": "application/json"}
    prompt = f"Extract field names and values from this Malayalam text:\n\n{text}"

    response = requests.post(url, json={
        "contents": [{"parts": [{"text": prompt}]}]
    }, headers=headers)

    try:
        parsed = response.json()['candidates'][0]['content']['parts'][0]['text']
        lines = [line for line in parsed.split('\n') if ':' in line]
        return {line.split(':')[0].strip(): line.split(':')[1].strip() for line in lines}
    except:
        return {"Error": "Gemini failed to respond"}
