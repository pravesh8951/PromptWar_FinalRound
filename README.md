# ✈️ AI Travel Assistant

> *Your personal AI-powered travel architect — craft personalized itineraries, optimize budgets, and discover unforgettable experiences.*

Built for the **Google Antigravity Challenge 🚀** by [Pravesh Dubey](https://github.com/pravesh-dubey)

---

## 📸 Preview

![AI Travel Assistant Preview](https://placehold.co/900x450/0D0D0D/C9A84C?text=AI+Travel+Assistant)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Itinerary Generator** | Day-by-day travel plans personalized to your style, budget, and interests |
| 💰 **Budget Planner** | Interactive slider with category-wise cost breakdown and visual estimates |
| 🧳 **Experience Recommendations** | Curated activities matched to your travel preferences |
| 📊 **Travel Tips & Insights** | Language, transport, food, hidden gems, and safety tips for every destination |
| 🔄 **Dynamic Replanning** | Instantly regenerate trips based on updated preferences |
| 📱 **Responsive UI** | Works beautifully on desktop, tablet, and mobile |
| ☁️ **Cloud Ready** | Deployable on Google Cloud Run, Firebase, and Vercel |

---

## 🛠️ Tech Stack

### Frontend
- [React](https://react.dev/) — Component-based UI
- [Vite](https://vitejs.dev/) — Fast dev server and build tool
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — Animations and transitions

### Backend
- [Node.js](https://nodejs.org/) — JavaScript runtime
- [Express.js](https://expressjs.com/) — REST API server

### AI & Cloud
- [Google Gemini API](https://ai.google.dev/) — AI-powered itinerary and recommendations
- [Google Cloud Run](https://cloud.google.com/run) — Serverless container hosting
- [Firebase](https://firebase.google.com/) — Scalable architecture and hosting

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/pravesh-dubey/ai-travel-assistant.git
cd ai-travel-assistant
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Start the backend server:

```bash
npm start
```

The API will be running at `http://localhost:5000`.

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗺️ How It Works

```
User enters preferences
    │
    ▼
┌─────────────────────────────┐
│  Destination, Budget,       │
│  Duration, Travel Style     │
└────────────┬────────────────┘
             │
             ▼
    Express.js Backend
             │
             ▼
    Google Gemini AI
             │
             ▼
┌─────────────────────────────┐
│  • Day-wise Itinerary       │
│  • Budget Breakdown         │
│  • Experience Suggestions   │
│  • Food Recommendations     │
│  • Travel Tips              │
└─────────────────────────────┘
             │
             ▼
   Beautiful React Frontend
```

1. **User inputs:** destination, budget, duration, travel style, traveler type, and accommodation preference
2. **Backend processes** the request and calls the Gemini API with a structured prompt
3. **AI generates** a full travel plan in structured JSON
4. **Frontend renders** the itinerary, budget breakdown, experiences, and tips in a clean tabbed UI
5. **User can replan** anytime with updated preferences

---

## 📂 Project Structure

```
ai-travel-assistant/
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level pages
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service calls
│   │   └── main.jsx           # App entry point
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   └── travel.js          # Travel planning API routes
│   ├── services/
│   │   └── gemini.js          # Gemini AI integration
│   ├── middleware/
│   │   └── validation.js      # Input validation
│   ├── .env                   # Environment variables (not committed)
│   ├── server.js              # Express app entry point
│   └── package.json
│
├── README.md
└── DEPLOYMENT.md
```

---

## 🔐 Environment Variables

| Variable | Location | Description |
|---|---|---|
| `GEMINI_API_KEY` | `backend/.env` | Your Google Gemini API key |
| `PORT` | `backend/.env` | Backend server port (default: `5000`) |

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore` by default.

---

## ☁️ Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full deployment instructions. Quick options:

### Google Cloud Run

```bash
gcloud run deploy ai-travel-assistant \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

### Firebase Hosting (Frontend)

```bash
npm run build
firebase deploy --only hosting
```

### Vercel (Frontend)

```bash
vercel --prod
```

---

## 🔌 API Reference

### `POST /api/travel/plan`

Generate a personalized travel itinerary.

**Request body:**

```json
{
  "destination": "Tokyo, Japan",
  "duration": 7,
  "budget": 3000,
  "travelers": "couple",
  "style": ["cultural", "food & culinary"],
  "accommodation": "mid-range hotels"
}
```

**Response:**

```json
{
  "destination": "Tokyo, Japan",
  "tagline": "Where ancient temples meet neon-lit streets",
  "itinerary": [...],
  "budget": {
    "accommodation": { "amount": 980, "note": "Mid-range hotel in Shinjuku" },
    "food": { "amount": 600, "note": "Mix of ramen shops and izakayas" },
    ...
  },
  "tips": [...],
  "experiences": [...]
}
```

---

## 🔮 Roadmap

- [ ] 🌤️ Live weather integration (OpenWeatherMap API)
- [ ] 🗺️ Google Maps embedded route visualization
- [ ] 🎙️ Voice-based travel assistant
- [ ] 👨‍👩‍👧 Group travel planning and expense splitting
- [ ] 🚦 Real-time traffic and transport optimization
- [ ] 🌐 Multi-language support
- [ ] 💾 Save and share itineraries

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👨‍💻 Author

**Pravesh Dubey**

Built with ❤️ for the **Google Antigravity Challenge 🚀**

[![GitHub](https://img.shields.io/badge/GitHub-pravesh--dubey-181717?style=flat&logo=github)](https://github.com/pravesh-dubey)

---

<p align="center">
  <sub>Star ⭐ this repo if you found it helpful!</sub>
</p>
