# 🏏 IPL Live Score Updates - React App

## 🔴 Live Preview  
![{9FC46E84-043B-49F8-895C-0077C7A99CC5}](https://github.com/user-attachments/assets/2755a314-56e4-4114-a684-b61d6bcc9b9a)
![{D4423698-8585-4587-A023-5E15179F0983}](https://github.com/user-attachments/assets/7f7dcc30-eddb-451e-843f-38536a6587f9)
![{A4AB305A-D28F-4821-9E2C-954B0B342019}](https://github.com/user-attachments/assets/5552c9e5-d057-494e-b86a-1ea9c7b3c1cc)

---

## 📜 Overview

The **IPL Live Score Updates App** is a dynamic cricket dashboard that simulates a real-time match experience using ball-by-ball JSON data. Built with **React JS**, it delivers detailed player stats, innings summaries, live commentary, and match predictions — all beautifully organized with theme toggle support and responsive design.

---

## 🧭 App Section 

- 🏠 **Match Overview Section**
- 📋 **Innings Summary**
- 🏏 **Live Player Stats**
- 🔁 **Ball-by-Ball Commentary**
- 📊 **Winning Probability Chart**
- 🌓 **Theme Switcher**

---

## 🚀 Features

- 🧠 Centralized state with `MatchContext`
- 🔢 Smart innings switching logic
- 📈 Real-time chase summary with match-end detection
- ⏱ Auto-updating live commentary feed
- 📊 Dynamic winning probability chart
- 💡 Responsive UI
- 🎨 Theme toggle with light/dark support
  
---

## 🛠️ Technologies Used

- **React JS**
- **React Context API**
- **Styled-Components**
- **Recharts**
- **React Icons**
- **React Tooltip**
- **Classnames**

---

## 📂 Folder Structure

```bash
src/
│
├── components/
│   ├── MatchDetails/
│   ├── InningsSummary/
│   ├── LiveCommentary/
│   ├── PlayerStats/
│   ├── MatchPredictor/
│   ├── RecentDeliveries/
│   └── Scoreboard/
│
├── context/
│   └── MatchContext.js
│
├── data/
│   └── matchData.json
│
├── App.js
└── index.js
