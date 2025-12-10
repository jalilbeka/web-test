# Deployment Guide

This guide will help you deploy your portfolio website so it's accessible to anyone in the world.

## Prerequisites

- A GitHub account (free)
- A Gmail account (or any email service) for receiving contact form messages

## Step 1: Deploy Backend (Server)

### Option A: Render (Recommended - Free Tier Available)

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: portfolio-backend (or any name)
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: `server`
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000` (Render will override this, but include it)
   - `FRONTEND_URL` = (You'll add this after deploying frontend)
   - `EMAIL_USER` = Your Gmail address
   - `EMAIL_PASS` = Your Gmail App Password (see below)
   - `RECEIVER_EMAIL` = Your email where you want to receive messages
6. Click "Create Web Service"
7. Copy the URL (e.g., `https://portfolio-backend.onrender.com`)

### Setting up Gmail App Password:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it as `EMAIL_PASS`

### Option B: Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set Root Directory to `server`
5. Add environment variables (same as Render)
6. Deploy

## Step 2: Deploy Frontend (Client)

### Using Vercel (Recommended - Free & Easy)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = Your backend URL from Step 1 (e.g., `https://portfolio-backend.onrender.com`)
6. Click "Deploy"
7. Copy your frontend URL (e.g., `https://your-portfolio.vercel.app`)

### Alternative: Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
5. Add environment variable `VITE_API_URL` with your backend URL
6. Deploy

## Step 3: Update Backend CORS

After deploying the frontend, go back to your backend service (Render/Railway) and update:
- `FRONTEND_URL` = Your frontend URL from Step 2

This allows your backend to accept requests from your frontend.

## Step 4: Test Everything

1. Visit your frontend URL
2. Fill out the contact form
3. Check your email inbox for the message!

## Troubleshooting

### Contact form not working?
- Check browser console (F12) for errors
- Verify `VITE_API_URL` is set correctly in frontend
- Verify `FRONTEND_URL` is set correctly in backend
- Check backend logs in Render/Railway dashboard

### Email not sending?
- Verify Gmail App Password is correct (not your regular password)
- Check that 2FA is enabled on Gmail
- Check backend logs for error messages

### CORS errors?
- Make sure `FRONTEND_URL` in backend matches your exact frontend URL
- Include `https://` in the URL
- Don't include trailing slashes

## Your Live URLs

- **Frontend**: https://your-portfolio.vercel.app
- **Backend**: https://portfolio-backend.onrender.com

Share your frontend URL with anyone - they can now view your portfolio and send you messages!

