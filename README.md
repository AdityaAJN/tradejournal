# 📒 Trade Journal

> A personal trading journal to log, analyze, and improve trading performance — built around Smart Money Concepts (SMC) and Market Structure analysis.



---

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 📌 About

**Trade Journal** is a full-stack web/mobile application designed to help traders systematically log their trades, track profit & loss, review chart setups, and identify patterns in their trading behavior. It is especially tailored for traders who follow **Smart Money Concepts (SMC)**, **ICT methodology**, and **price action-based** strategies.

The goal is simple — trade smarter by reviewing every trade with discipline and data.

---

## ✨ Features

- 📝 **Trade Logging** — Record entry/exit price, lot size, instrument, direction (Long/Short), and session
- 💰 **P&L Tracker** — Auto-calculate profit/loss per trade with cumulative performance summary
- 📊 **Performance Dashboard** — Win rate, risk-reward ratio, drawdown, expectancy metrics
- 🏗️ **SMC / Market Structure Notes** — Tag trades with concepts like BOS, CHoCH, OB, FVG, Liquidity grabs
- 🖼️ **Chart Screenshot Uploads** — Attach before/after chart images for post-trade review
- 📆 **Session & Timeframe Filtering** — Filter by London, New York, or Asia session; filter by M15, H1, H4, Daily
- 📈 **TradingView Integration** *(planned)* — Embed or link TradingView chart snapshots
- 🗒️ **Trade Notes & Emotion Tagging** — Log mindset, mistakes, and lessons learned per trade
- 🔐 **User Authentication** — Secure login/signup with JWT or OAuth

---

## 🛠 Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Frontend     | React.js / Flutter           |
| Backend      | Python (Django REST) / Node.js |
| Database     | PostgreSQL / Firebase        |
| Auth         | JWT / Firebase Auth          |
| File Storage | AWS S3 / Cloudinary          |
| Charts       | Chart.js / Recharts          |
| Deployment   | Vercel (Frontend) / Render (Backend) |

> *(Update this table to match your actual stack)*

---

## 🚦 Getting Started

### Prerequisites

```bash
node >= 18.x       # If using React frontend
python >= 3.10     # If using Django backend
git
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/trade-journal.git
   cd trade-journal
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   cp .env.example .env
   # Add your DB credentials and secret keys in .env
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Add your API base URL in .env
   npm start
   ```

4. **Access the app**
   ```
   Frontend: http://localhost:3000
   Backend API: http://localhost:8000/api/
   ```

---

## 💻 Usage

### Logging a Trade

1. Click **"New Trade"** from the dashboard
2. Fill in: Instrument, Direction, Entry, Stop Loss, Take Profit, Lot Size
3. Tag the **SMC concept** used (e.g., Order Block, FVG, BOS)
4. Upload your **chart screenshot** (before & after)
5. Add post-trade notes and emotion tag
6. Hit **Save** — your P&L and stats update automatically

### Reviewing Performance

- Navigate to **Dashboard** to see:
  - Total trades, Win %, Avg RR, Max Drawdown
  - Daily / Weekly / Monthly P&L chart
  - Best and worst performing instruments/sessions

---

## 📸 Screenshots

> *(Add your screenshots here)*

| Dashboard | Trade Log Entry |
|-----------|-----------------|
| ![Dashboard](screenshots/dashboard.png) | ![Trade Log](screenshots/trade-log.png) |

| SMC Tags | Performance Chart |
|----------|-------------------|
| ![SMC](screenshots/smc-tags.png) | ![Chart](screenshots/performance.png) |

---

## 📁 Project Structure

```
trade-journal/
├── backend/
│   ├── trades/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   ├── users/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TradeForm/
│   │   │   ├── Dashboard/
│   │   │   └── Charts/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
├── screenshots/
├── .env.example
└── README.md
```

---

## 🗺️ Roadmap

- [x] Trade log CRUD operations
- [x] P&L calculation per trade
- [x] SMC concept tagging
- [ ] Chart screenshot upload
- [ ] Performance analytics dashboard
- [ ] TradingView chart embed
- [ ] Mobile app (Flutter)
- [ ] Export trades to CSV / PDF
- [ ] AI-based trade feedback *(future)*

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---


## 📬 Contact

**Aditya**  
📧 adityajiwan16@gmail.com 
🔗 [LinkedIn](https://linkedin.com/in/adityajiwan)  
🐙 [GitHub](https://github.com/AdityaAJN)

---

> *"The goal of a good trader is not to make money — it's to make good decisions. The money follows."*
