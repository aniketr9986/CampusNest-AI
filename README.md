# CampusNest AI 🎓🏠
> **"Find the Right Place Before You Find Your Classroom."**

![CampusNest AI Thumbnail](thumbnail.png)

---

## 🚀 Project Overview

**CampusNest AI** is an intelligent student relocation assistant designed to solve the real-world anxieties of millions of students moving to new cities for higher education. Unlike standard property listing sites that only show rental posts, CampusNest AI operates as a collaborative **Multi-Agent Hive Mind** to recommend personalized PGs, hostels, and shared flats based on target campus, budget constraints, safety specifications, and lifestyle preferences.

Every year, millions of students struggle with a single question: *"I got admission to my college. Where should I live?"* 
CampusNest AI solves this by coordinating 5 specialized AI agents to deliver a comprehensive, data-driven **Relocation Report** including transit times, area advice, safety scores, and actual monthly expense projections.

---

## 🧠 Hive-Mind Multi-Agent Architecture

CampusNest AI simulates a pipeline of 5 specialized agents that collaborate to evaluate housing choices:

1. **🔍 PG Discovery Agent**: Filters housing databases and co-living records for accommodations matching the student's room sharing, budget, and gender preferences.
2. **🛡️ Safety Agent**: Cross-references local safety databases, analyze CCTV surveillance coverage, warden presence, streetlighting audits, and parses student review sentiment to compute a **Safety Index (out of 10)**.
3. **💰 Budget Agent**: Estimates utility bills, local travel costs, and calculates the total monthly cash flow outflow (Rent + Utilities + Food + Commute).
4. **📍 College Area Advisor**: Assesses local residential sectors to recommend the cheapest areas, most student-friendly zones, and overall best spots to live.
5. **⚡ Commute Agent**: Calculates routing data and commute times for walking, local bus transits, and two-wheeler rides to the college gate.

---

## ✨ Key Features

* **🔮 Procedural Recommendation Engine**: In addition to pre-seeded popular colleges (like *Delhi University*, *IIT Bombay*, *Christ University*), the system procedurally generates realistic neighborhoods, housing rates, and safety logs for **any custom college name** entered by the user.
* **🗺️ Interactive Vector SVG Map**: Generates a dynamic transit map plotting the spatial layout of the campus, the selected PG, safety coverage rings, and transit paths.
* **📊 Comprehensive Budget Breakdown**: Computes exact estimated secondary expenses (food, transport, electricity) tailored to distance and PG details.
* **🛡️ Defensive Error-Handling**: Implements try-catch protection blocks and safe DOM-bindings ensuring continuous operation.
* **🔌 Zero-Installation Local Run**: Engineered without CORS script blocking, meaning users can run the portal by spinning up the server or **simply double-clicking `index.html`** in their file explorer.

---

## 🛠️ Technology Stack

* **Frontend Structure**: Semantic HTML5 & Modern Layout Grids
* **Design & Styling**: Custom HSL dark-theme palette, glassmorphic UI card designs, glowing states, and keyframe micro-animations (Vanilla CSS)
* **Logic & Rendering**: Vanilla JavaScript (ES6+), SVG Map Generator, timed Multi-Agent State Machine
* **Dev Server**: Vite (for hot-reloaded local serves and optimized production builds)

---

## ⚡ Quick Start

### Run locally via file manager:
Simply double-click the **`index.html`** file in your file explorer to open it in any modern browser.

### Run locally via Development Server:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173/` in your browser.
