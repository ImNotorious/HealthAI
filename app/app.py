from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from PIL import Image
import numpy as np
import tensorflow as tf
import os

from flask_cors import CORS  # Add this import

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}
app.config['MODEL_INPUT_SIZE'] = (256, 256)

# Load ML model
model = tf.keras.models.load_model('best_model.keras')
class_labels = ["Benign case", "Malignant case", "Normal case"]

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400
            
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400

        # Process image
        img = Image.open(file.stream).convert('RGB').resize(app.config['MODEL_INPUT_SIZE'])
        img_array = np.array(img) / 255.0

        # Validate input shape
        expected_shape = app.config['MODEL_INPUT_SIZE'] + (3,)
        if img_array.shape != expected_shape:
            return jsonify({
                'error': f'Invalid image shape {img_array.shape}. Expected {expected_shape}'
            }), 400

        # Create uploads directory if missing
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

        # Save preview
        filename = secure_filename(file.filename)
        preview_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        img.save(preview_path)

        # Prediction
        img_batch = np.expand_dims(img_array, axis=0)
        predictions = model.predict(img_batch)[0]
        top_idx = np.argmax(predictions)
        
        return jsonify({
            'class': class_labels[top_idx],
            'confidence': round(float(predictions[top_idx]) * 100, 2),
            'preview': f'/uploads/{filename}'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(host='0.0.0.0', port=5000)
