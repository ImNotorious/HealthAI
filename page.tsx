import { useState, useRef } from 'react';

interface PredictionResult {
  class: string;
  confidence: number;
  preview: string;
}

export default function ImageClassifier() {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError('Please select an image first');
      return;
    }

    try {
      setIsLoading(true);
      setPreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data: PredictionResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Image Classifier</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {preview && <img src={preview} alt="Preview" className="preview" />}

      {result && (
        <div className="result">
          <p>Prediction: {result.class}</p>
          <p>Confidence: {result.confidence}%</p>
          {result.preview && <img src={result.preview} alt="Result Preview" />}
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}
