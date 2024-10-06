from flask import Flask,jsonify, render_template, url_for, flash, redirect, request, session
from transformers import pipeline
import os
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)


# Garbage classification model
print("Loading the Hugging Face model...")
classifier = pipeline("image-classification", model="watersplash/waste-classification")
print("Model loaded successfully!")
print("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")


# Make sure the upload folder exists
#if not os.path.exists(app.config['UPLOAD_FOLDER']):
#    os.mkdirs(app.config['UPLOAD_FOLDER'])

@app.route('/', methods = ['GET', 'POST'])
def register():
    return jsonify({"message" : "Hello World"})

# Endpoint to receive image and classify itd
@app.route('/classify', methods=['POST', "GET"])
def classify_image():
    print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']

    print("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
    print(file.filename)
    print("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Open the image using PIL
        image = Image.open(BytesIO(file.read()))
        image.show()

        # Apply your waste classification pipeline to the image
        result = classifier(image)
        print("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
        print(result[0]['label'])
        print("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")

        # Get the highest confidence classification label
        garbage_label = result[0]['label']

        action = ''

        if garbage_label == 'battery':
            action = 'BATTERY DISPOSAL'
        elif garbage_label == 'biological':
            action = 'COMPOST'
        elif garbage_label in ['brown-glass', 'cardboard', 'green-glass', 'metal', 'paper', 'plastic', 'white-glass']:
            action = 'RECYCLE'
        elif garbage_label in ['clothes', 'shoes']:
            action = 'CLOTHING DONATION'
        elif garbage_label == 'trash':
            action = 'GENERAL WASTE'


        # Return the classification result
        return jsonify({"classification": garbage_label}, {"action" : action})

    except Exception as e:
        return jsonify({"error": f"Error processing the image: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

