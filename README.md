# 🗺️ HackMap India

> **India's #1 Hackathon Discovery & Team-Building Platform for College Students**

Discover 500+ hackathons across India — online, offline, hybrid. Filter by your city, tech stack, and prize pool.

![React](https://img.shields.io/badge/React-18-blue) ![Firebase](https://img.shields.io/badge/Firebase-10.7-orange) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-cyan) ![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

🔍 **Discover Hackathons** — Browse 500+ hackathons with advanced filters  
🗺️ **Interactive Map** — View offline hackathons plotted on India map with Leaflet.js  
👥 **Team Finder** — Find and form teams based on skills  
💳 **Payment Integration** — Cashfree Payment Gateway for paid registrations  
📲 **Telegram Alerts** — Never miss a deadline with Telegram reminders  
🏆 **Leaderboard** — College rankings and hacker stats  
🎨 **Dark Theme** — Beautiful dark UI with orange accent  
📱 **Fully Responsive** — Mobile-first design

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend/Database** | Firebase Firestore (real-time) |
| **Authentication** | Firebase Auth (Google, GitHub OAuth) |
| **Storage** | Firebase Storage |
| **State Management** | Zustand |
| **Routing** | React Router DOM v6 |
| **Maps** | Leaflet.js, React-Leaflet |
| **Payments** | Cashfree Payment Gateway |
| **Notifications** | Telegram Bot API |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Cashfree account (for payments)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/raunitx-02/hackmap-india.git
cd hackmap-india
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**  
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_CASHFREE_APP_ID=your_cashfree_app_id
```

4. **Start development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
hackmap-india/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components (Home, Discover, etc.)
│   ├── firebase/           # Firebase config & seed data
│   ├── store/              # Zustand state management
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── README.md               # You are here!
```

---

## 🎨 Design System

### Colors
- **Background:** `#0D0D1A` (deep dark navy)
- **Surface:** `#13131F` (card backgrounds)
- **Primary:** `#FF6B35` (energetic orange)
- **Secondary:** `#7C3AED` (purple)
- **Success:** `#10B981` (green)
- **Text:** `#F1F0F5` (white)

### Fonts
- **Headings:** Space Grotesk
- **Body:** Inter

---

## 🚧 Roadmap

- [x] v1.0 — Core platform with discovery & team finder
- [ ] v1.1 — Mobile app (React Native)
- [ ] v1.2 — AI-powered team matching
- [ ] v2.0 — Organizer analytics dashboard
- [ ] v2.1 — Live hackathon streaming

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

**Commit Convention:** Use conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 💌 Contact

**Built with ❤️ for Indian Hackers by Raunit Raj**

- GitHub: [@raunitx-02](https://github.com/raunitx-02)
- LinkedIn: [Raunit Raj](https://linkedin.com/in/raunitx)
- Twitter: [@raunitx](https://twitter.com/raunitx)

---

⭐ **If you like this project, give it a star!**
