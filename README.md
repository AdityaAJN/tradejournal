📈 Trade Journal
Professional Trading Analytics & Performance Tracking System










A full-stack trading journal application designed to help traders track, analyze, and improve their trading performance through structured trade logging and performance analytics.

This project replicates the workflow used by professional traders who maintain a systematic trade log to analyze strategies, measure risk, and improve decision making.

🚀 Live Features
📊 Trade Logging

Record new trades instantly

Store entry price, exit price, quantity

Track long and short positions

Add notes for strategies or mistakes

Edit and delete trades

📈 Performance Dashboard

Total Profit & Loss tracking

Win/Loss ratio

Trade performance summary

Key statistics displayed using dashboard cards

📉 Market Visualization

Interactive market heatmap

Quick overview of market sentiment

Helps traders identify sector performance

📑 Trade History

Full trade history log

Organized tabular display

Easy review of past trades

⚡ Fast API Communication

REST API architecture

Axios based frontend communication

Real-time UI updates

🖥️ Tech Stack
Frontend

React.js

JavaScript (ES6+)

HTML5

CSS3

Axios

React Router

Backend

Node.js

Express.js

REST API Architecture

Database

MongoDB (or SQL depending on implementation)

Development Tools

Git

GitHub

VS Code

Postman

npm

🏗️ System Architecture
          ┌───────────────────┐
          │    React Frontend │
          │  (UI Components)  │
          └─────────▲─────────┘
                    │
                    │ Axios / REST API
                    │
          ┌─────────▼─────────┐
          │   Node.js Server  │
          │    Express API    │
          └─────────▲─────────┘
                    │
                    │ Database Queries
                    │
          ┌─────────▼─────────┐
          │     Database      │
          │ MongoDB / MySQL   │
          └───────────────────┘

📂 Project Structure
trade-journal
│
├── backend
│   ├── controllers
│   │     tradeController.js
│   │
│   ├── routes
│   │     tradeRoutes.js
│   │
│   ├── models
│   │     tradeModel.js
│   │
│   └── server.js
│
├── frontend
│   ├── components
│   │     AddTrade.js
│   │     Sidebar.js
│   │     SummaryCards.js
│   │     MarketHeatmap.js
│   │
│   ├── pages
│   │     Dashboard.js
│   │
│   ├── services
│   │     api.js
│   │
│   └── App.js
│
└── README.md

⚙️ Installation Guide
1️⃣ Clone the Repository
git clone https://github.com/yourusername/trade-journal.git

2️⃣ Backend Setup
cd backend
npm install


Run the backend server

npm start

3️⃣ Frontend Setup
cd frontend
npm install


Start the React application

npm start

📊 Example Trade Record
Trade	Entry	Exit	Quantity	Result
BTC/USDT	40000	42000	0.5	+1000
ETH/USDT	2500	2400	1	-100
🎯 Project Objectives

The goal of this project is to build a professional trade tracking system that:

Helps traders maintain discipline

Enables data-driven decision making

Tracks profitability and strategy performance

Improves trading consistency

🔮 Future Enhancements
Planned Features

🔐 User Authentication (JWT)

📊 Advanced trading analytics

📉 TradingView chart integration

🧠 Strategy tagging

📷 Trade screenshot upload

📱 Mobile responsive UI

☁️ Cloud deployment

🌐 Deployment (Optional)

The application can be deployed using:

Frontend

Vercel

Netlify

Backend

Render

Railway

AWS

Database

MongoDB Atlas

📸 Screenshots (Recommended)

Add screenshots of:

Dashboard
Trade Entry Form
Trade History
Market Heatmap


Example:

/screenshots/dashboard.png
/screenshots/add-trade.png
/screenshots/history.png

👨‍💻 Author

Aditya Jiwan

Computer Engineering Student
Interested in

Software Development

Trading Systems

Data Analytics

⭐ Contribution

Contributions are welcome!

If you want to improve the project:

Fork the repository

Create a feature branch

Commit your changes

Open a pull request

📜 License

This project is licensed under the MIT License.
