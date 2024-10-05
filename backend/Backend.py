from flask import Flask,jsonify, render_template, url_for, flash, redirect, request, session
from transformers import pipeline
import os
from PIL import Image

app = Flask(__name__)
app.config['UPLOAD FOLDER'] = "./uploads" #Folder to save uploads

# Garbage classification model
classifier = pipeline("image-classification", model="watersplash/waste-classification")

# Make sure the upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/', methods = ['GET', 'POST'])
def register():
    return jsonify({"message" : "Hello World"})

# Endpoint to receive image and classify it
@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        # Save the uploaded image
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(image_path)

        # Open the image file using PIL
        image = Image.open(image_path)

        # Apply your waste classification pipeline to the image
        # Result Format:
        # ([{'label': 'metal', 'score': 0.9994459748268127}, {'label': 'clothes', 'score': 0.4722229540348053}, 
        # {'label': 'plastic', 'score': 0.41513681411743164}, {'label': 'shoes', 'score': 0.3249179422855377}, 
        # {'label': 'cardboard', 'score': 0.32456502318382263}])
        result = classifier(image)

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
        return jsonify({"classification": result}, {"action" : action})

    return jsonify({"error": "File could not be processed"}), 500

if __name__ == '__main__':
    app.run(debug=True)
