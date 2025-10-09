# **Technical Readme**

## **SDG and Target**
Our project aligns with **SDG 3: Good Health and Well-Being**, focusing on the target of promoting mental health and well-being for all.  
**AI'm Healthy** serves as a personal AI companion designed to foster self-reflection and emotional awareness. Through guided journaling and mood tracking, it encourages users to understand their emotions, identify trends, and build healthy mental habits. The system aims to make emotional wellness more accessible by combining intuitive design with intelligent AI feedback that supports users in their self-improvement journey.

## **Tech Stack**
- **Frontend:** React.js – for building a dynamic, interactive, and responsive interface.  
- **Backend:** Node.js with Express.js – for managing API routes and handling requests.  
- **Database:** PostgreSQL – for securely storing user data, journal entries, and AI responses.  
- **ORM:** Prisma – for seamless database communication and schema management.  
- **AI Integration:** OpenAI API – for generating personalized insights and emotional analysis.  
- **Styling:** TailwindCSS – for creating a clean, modern, and calming interface.  
- **Deployment:** Vercel (frontend) and Render (backend).  
- **Architecture Pattern:** PERN (PostgreSQL, Express, React, Node).

## **Architecture**
The system follows a **PERN full-stack architecture** that enables smooth communication between all components.  
Users interact with the **React frontend**, where they can write journal entries, log emotions, and view AI-generated feedback. When a user submits an entry, the frontend sends a **POST request** to the **Express.js backend**. The backend validates the input and uses **Prisma** to store the entry in the **PostgreSQL database**.  
If AI analysis is requested, the backend sends the journal content to the **OpenAI API**, which processes it and returns an intelligent, empathetic response. This response is then sent back to the frontend, displayed to the user, and optionally saved in the database for pattern tracking.  
This architecture allows for real-time feedback, secure data handling, and scalable expansion for future mental health insights and analytics.

## **Biggest Challenge**
The most significant technical challenge was **CORS (Cross-Origin Resource Sharing) configuration** during deployment. Since the **frontend** (Vercel) and **backend** (Render) were hosted on different domains, the browser blocked requests due to mismatched origin headers.  
To resolve this, we:
1. Configured the **Express CORS middleware** to include the exact production domain of the frontend.  
2. Used **environment variables** to dynamically set allowed origins for development and production environments.  
3. Tested deployment pipelines to ensure consistent API communication without exposing sensitive URLs or keys.  

By implementing these fixes, the system achieved stable communication between all layers, allowing user inputs and AI responses to flow securely and efficiently. This solution not only solved the deployment issue but also strengthened the project’s overall architecture for scalability and future integrations.
