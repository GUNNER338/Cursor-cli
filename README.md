🧠 Cursor Clone CLI (Node.js + Express)
This is a CLI-based AI Assistant, inspired by Cursor's tool-based reasoning system. It interacts with the OpenAI API using a custom prompt framework (START, THINK, ACTION, OBSERVE) and executes real shell commands or retrieves weather information in a structured, JSON-driven interaction loop.

🚀 Features
AI Agent Prompted to Reason Before Acting

Structured JSON-Only Communication

Supports Tool Calls:

getWeatherInfo(city: string)

executeCommand(command: string)

Handles Actions, Observes Results, and Continues Thought

Dockerized for Easy Deployment

📂 Project Structure
pgsql
Copy
Edit
.
├── Dockerfile
├── .env
├── index.js
├── package.json
├── package-lock.json
└── README.md
🧰 Available Tools
The AI Assistant can use the following tools via action calls:

getWeatherInfo(city: string) – Returns simulated weather for the given city.

executeCommand(command: string) – Executes a shell command inside the Docker container and returns stdout/stderr.

🔧 Prerequisites
Node.js v18+

Docker & Docker Compose

OpenAI API Key

⚙️ Setup
Clone the Repository

bash
Copy
Edit
git clone https://github.com/your-username/cursor-clone-cli.git
cd cursor-clone-cli
Create .env file

Create a .env file in the root directory and add your OpenAI key:

ini
Copy
Edit
OPENAIKEY=your_openai_api_key_here
Install Dependencies (if running locally)

bash
Copy
Edit
npm install
Run Locally

bash
Copy
Edit
node index.js
Run via Docker

Build and run the containerized app:

bash
Copy
Edit
docker build -t cursor-clone-cli .
docker run --env OPENAIKEY=your_openai_api_key_here cursor-clone-cli
Alternatively, using Docker Compose:

bash
Copy
Edit
docker-compose up --build
💡 How It Works
The project uses a special AI prompt format where the assistant thinks through problems step-by-step before taking any action.

🧠 Prompt Workflow:
START — The user asks a question.

THINK — The assistant reasons through steps (at least 3–4 thoughts).

ACTION — If necessary, a tool is called (e.g., executeCommand).

OBSERVE — The system observes the result of the action.

OUTPUT — The assistant responds to the user with the final answer.

📘 Example:
makefile
Copy
Edit
User: Can you create a todoApp folder with HTML, CSS, JS?

Assistant:
{
  "step": "think",
  "content": "The user is asking to create a web-based todo app..."
}
...
{
  "step": "action",
  "tool": "executeCommand",
  "input": "mkdir todoApp && cd todoApp && touch index.html style.css script.js"
}
...
{
  "step": "observe",
  "content": "stdout: success"
}
...
{
  "step": "output",
  "content": "Your TodoApp with HTML, CSS, and JS has been created!"
}
📦 Dockerfile Overview
Your project is fully containerized using a simple Dockerfile:

Dockerfile
Copy
Edit
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
✅ Notes
You must provide your own OpenAI key via .env or Docker --env.

The assistant only accepts and returns strict JSON for each step.

This is an experimental CLI-based AI — avoid running unsafe commands via executeCommand.

📜 License
MIT License. Use it freely, and contribute improvements if you'd like!