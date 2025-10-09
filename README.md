# **Technical Readme**

## **SDG and Target**
Our project aligns with **SDG 3: Good Health and Well-Being**, specifically targeting the goal of ensuring healthy lives and promoting well-being for all at all ages.  
**AI'm Healthy** serves as a personal AI companion designed to foster self-reflection and emotional understanding. With its intuitive features, users can gain insights into their mental well-being while enjoying a supportive journaling experience.  
The system aims to promote mental wellness by helping individuals track their emotions, identify behavioral patterns, and receive AI-driven recommendations that encourage self-awareness and positive habits.

## **Tech Stack**
- **Frontend:** React.js (for building a dynamic, responsive user interface)  
- **Backend:** Node.js with Express.js (for handling API requests and routing)  
- **Database:** PostgreSQL (for storing user data, AI responses, and journaling entries)  
- **ORM:** Prisma (for efficient database management and schema handling)  
- **AI Integration:** OpenAI API (for generating personalized reflections and emotional insights)  
- **Styling:** TailwindCSS (for modern, minimalist interface design)  
- **Deployment:** Vercel (frontend) and Render (backend)  
- **Full Stack Architecture:** PERN (PostgreSQL, Express, React, Node)

## **Architecture**
The system follows a **PERN architecture**. The **frontend React client** allows users to log emotions, write journal entries, and interact with AI-generated reflections.  
These inputs are sent via HTTP requests to the **Express.js backend**, which processes and validates the data, communicates with the **PostgreSQL database** using Prisma ORM, and—if AI processing is needed—requests a response from the **OpenAI API**.  
The AI then generates emotionally intelligent responses that the backend returns to the frontend in real time. These insights can be displayed to the user and optionally stored for trend analysis.  
This architecture ensures smooth data flow, scalability, and a secure connection between the client, server, and AI services.

## **Biggest Challenge**
The most challenging technical hurdle was managing **CORS configuration and secure communication between the deployed frontend and backend**.  
When the client hosted on Vercel and the server hosted on Render, mismatched origin headers caused blocked API requests. To overcome this, we:
- Configured the Express CORS middleware to match the exact frontend domain.
- Used environment variables to handle different URLs for development and production.
- Secured API keys and database credentials using `.env` files.  

This fix ensured consistent communication across services, enabling the system to operate smoothly in production while maintaining security and reliability.
