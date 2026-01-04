# AI Chat API (Groq & Cerebras)

A high-performance Chat API built with **Node.js**, **Express**, and **TypeScript**. This project integrates the ultra-fast inference capabilities of **Groq** and **Cerebras** to provide seamless AI conversational experiences.

## 🚀 Features

* **Dual Provider Support:** Easily switch between Groq and Cerebras Cloud.
* **Context-Aware:** Supports message arrays to maintain conversation history.
* **Type Safe:** Fully written in TypeScript for robust development.
* **Fast Response:** Leveraging the hardware-accelerated inference of Groq (LPUs) and Cerebras (CS-3).

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Language:** TypeScript
* **AI SDKs:** `groq-sdk`, `@cerebras/cerebras_cloud_sdk`
* **Environment:** Dotenv, Nodemon, Cors

---

## 📋 Prerequisites

Ensure you have the following API keys:
1.  **Groq API Key:** Obtain from [Groq Console](https://console.groq.com/).
2.  **Cerebras API Key:** Obtain from [Cerebras Cloud](https://cloud.cerebras.ai/).

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name

2. **Install dependencies:**
  `npm install`

3. **Configure Environment Variables:** Create a `.env` file in the root directory:
  PORT=3000
  GROQ_API_KEY=your_groq_key_here
  CEREBRAS_API_KEY=your_cerebras_key_here

4. **Run the application:**
  # Development mode
  `npm run dev`

  # Production build
  `npm run build`
  `npm start`


# 🔌 API Documentation

POST `/api/chat`
Handles chat completions using the provided message history.

## Request Body:

```json 
{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful coding assistant."
    },
    {
      "role": "user",
      "content": "How do I implement a singleton pattern in TS?"
    }
  ]
}
```

# 📁 Project Structure

├── src
│   ├── controllers    # Route handlers
│   ├── services       # Groq & Cerebras API logic
│   ├── routes         # Express route definitions
│   ├── types          # TypeScript interfaces/types
│   └── app.ts         # Express configuration & entry point
├── .env               # Environment secrets
├── tsconfig.json      # TypeScript configuration
├── nodemon.json       # Scripts and dependencies
└── package.json       # Scripts and dependencies