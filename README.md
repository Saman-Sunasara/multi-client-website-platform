# Multi-Client SaaS Portfolio Platform

A premium, modern SaaS platform built with React, Node.js, and MongoDB. Each user can sign up, manage their own professional portfolio, and share it via a unique public URL.

## Features
- **Modern UI**: Built with Tailwind CSS, Framer Motion, and Lucide icons.
- **Authentication**: Secure sign-up/login using JWT and bcrypt.
- **Dashboard**: Full management of bio, role, avatar, and social links.
- **Project Showcase**: Add, edit, and remove projects with titles, links, and descriptions.
- **Custom Theme**: Users can choose their own primary brand color.
- **Public Portfolios**: Dynamic pages at `/p/username` reflecting user data in real-time.
- **Glassmorphism**: Sleek, high-tech aesthetics with depth and gradients.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT.

## Quick Start
1. **Clone the repo**
2. **Setup Server**
   - `cd server`
   - `npm install`
   - Create a `.env` file with `MONGO_URI` and `JWT_SECRET`.
   - `node server.js`
3. **Setup Client**
   - `cd client`
   - `npm install`
   - `npm run dev`
4. **Access**
   - Open `http://localhost:5173` for the landing page.
   - Register and update your profile in the dashboard.
   - View your public site at `http://localhost:5173/p/yourusername`.

## Deployment
- **Backend**: Deploy to Render, Heroku, or DigitalOcean.
- **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages.
- **Database**: Use MongoDB Atlas for a managed cloud database.
