# 🚀 Google Cloud Run Deployment Guide

This guide provides step-by-step instructions for deploying the **NomadAI Travel Assistant** to Google Cloud.

## 📦 Prerequisites
1.  **Google Cloud Project**: Create one at [console.cloud.google.com](https://console.cloud.google.com).
2.  **GCloud CLI**: Installed and authenticated (`gcloud auth login`).
3.  **Docker**: Installed and running locally.
4.  **Gemini API Key**: Your key from [aistudio.google.com](https://aistudio.google.com).

---

## 🛠️ Step 1: Backend Deployment (Node.js API)

The backend must be deployed first so the frontend knows where to send requests.

1.  **Navigate to backend**:
    ```bash
    cd backend
    ```

2.  **Build and Push to Artifact Registry**:
    ```bash
    # Replace PROJECT_ID with your actual Google Cloud Project ID
    gcloud builds submit --tag gcr.io/PROJECT_ID/nomadai-backend
    ```

3.  **Deploy to Cloud Run**:
    ```bash
    gcloud run deploy nomadai-backend \
      --image gcr.io/PROJECT_ID/nomadai-backend \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated \
      --set-env-vars="GEMINI_API_KEY=YOUR_API_KEY_HERE,PORT=8080"
    ```
    *Note: Copy the Service URL provided after deployment (e.g., `https://nomadai-backend-xyz.a.run.app`).*

---

## 🌐 Step 2: Frontend Deployment (Vite/React)

Before building the frontend, we must update the API endpoint to point to your new backend URL.

1.  **Update API URL**:
    Open `frontend/src/pages/Itinerary.jsx` and `frontend/src/pages/Reviews.jsx`.
    Replace `http://localhost:5000` with your deployed Backend Service URL.

2.  **Navigate to frontend**:
    ```bash
    cd frontend
    ```

3.  **Build and Push**:
    ```bash
    gcloud builds submit --tag gcr.io/PROJECT_ID/nomadai-frontend
    ```

4.  **Deploy to Cloud Run**:
    ```bash
    gcloud run deploy nomadai-frontend \
      --image gcr.io/PROJECT_ID/nomadai-frontend \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated
    ```

---

## 🔒 Security Best Practices
- **Secret Manager**: For production, use [Google Cloud Secret Manager](https://cloud.google.com/secret-manager) to store the `GEMINI_API_KEY` instead of passing it as an environment variable in the command line.
- **VPC Connector**: If connecting to a private Firestore or SQL instance, configure a VPC connector.
- **CORS**: In `backend/index.js`, ensure `cors()` is configured to only allow your frontend domain.

## 📈 Monitoring
You can monitor logs and performance directly in the [Google Cloud Console](https://console.cloud.google.com/run).
