# **Technical Readme**

## **SDG and Target**
This project supports **SDG 3: Good Health and Well-Being**, focusing on improving mental health and emotional awareness.  
**AI'm Healthy** is an AI-powered journaling companion that promotes self-reflection and emotional understanding. It helps users monitor their mood patterns, engage with guided prompts, and receive meaningful insights that encourage personal growth and mental wellness.  
By combining intelligent analysis with a calming, user-friendly interface, the system makes emotional health management accessible to everyone.

## **Tech Stack**
- **Frontend:** React.js — for an interactive and responsive user experience.  
- **Backend:** Node.js with Express.js — for handling API routes and server logic.  
- **Database:** PostgreSQL — to store user journals, AI insights, and mood logs.  
- **ORM:** Prisma — for simplified database schema and secure queries.  
- **AI Integration:** OpenAI API — to generate contextual feedback and emotion-based insights.  
- **Styling:** TailwindCSS — for modern, minimalistic, and responsive design.  
- **Deployment:** Vercel (frontend) and Render (backend).  
- **Architecture Pattern:** PERN (PostgreSQL, Express, React, Node).

## **Architecture**
The platform follows a **PERN stack architecture** that ensures seamless interaction between the client, server, and AI services.  
User inputs such as journal entries or emotion logs are submitted through the **React frontend**, which sends requests to the **Express.js backend**. The backend validates and stores the data in **PostgreSQL** via **Prisma ORM**.  
If AI analysis is required, the backend connects to the **OpenAI API**, processes the journal content, and returns an emotionally intelligent reflection. The response is then displayed in the frontend interface and optionally stored for tracking emotional patterns over time.  
This data flow allows real-time communication, maintains data privacy, and ensures a smooth and responsive user experience.

## **Biggest Challenge**
The main technical challenge was ensuring **secure and consistent CORS communication** between the deployed frontend and backend.  
When the frontend (Vercel) and backend (Render) were hosted on separate domains, mismatched origin headers caused blocked API requests. To solve this, the team:  
1. Configured **CORS middleware** in Express to allow only verified domains.  
2. Implemented **environment-based configurations** for development and production URLs.  
3. Secured API keys and database credentials using environment variables.  

After refining these configurations, data exchange between the client and server became stable, secure, and production-ready.  
This solution strengthened the overall reliability of the system and paved the way for future scalability and AI feature expansion.
