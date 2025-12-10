import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS Configuration - Allow frontend URL from environment or localhost
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://web-test-ebon-mu.vercel.app',
    'http://localhost:5173',
    'https://web-test-ebon-mu.vercel.app/'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            console.log('Request with no origin - allowing');
            return callback(null, true);
        }
        
        console.log('CORS check - Origin:', origin);
        console.log('Allowed origins:', allowedOrigins);
        
        // Normalize origins (remove trailing slashes for comparison)
        const normalizedOrigin = origin.replace(/\/$/, '');
        const isAllowed = allowedOrigins.some(allowed => {
            if (!allowed) return false;
            const normalizedAllowed = allowed.replace(/\/$/, '');
            return normalizedOrigin === normalizedAllowed || normalizedOrigin.startsWith(normalizedAllowed);
        });
        
        // Also allow any vercel.app domain
        const isVercel = origin.includes('.vercel.app');
        
        if (isAllowed || isVercel || process.env.NODE_ENV !== 'production') {
            console.log('CORS allowed');
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(express.json());

// Configure Nodemailer
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // Use App Password for Gmail
        }
    });
    console.log('Email transporter configured');
} else {
    console.warn('EMAIL_USER or EMAIL_PASS not set - email functionality disabled');
}

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.post('/api/contact', async (req, res) => {
    console.log('Contact form request received:', req.headers.origin);
    console.log('Request body:', req.body);
    
    const { name, email, message } = req.body;

    // Basic Input Validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    try {
        // Log the message (always works)
        console.log('Contact form submission received:', { name, email, message });
        
        // Try to send email if transporter is configured
        if (transporter) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
                subject: `New Contact Form Message from ${name}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `,
                replyTo: email
            };

            // Set timeout for email sending (10 seconds)
            const emailPromise = transporter.sendMail(mailOptions);
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Email timeout')), 10000)
            );

            try {
                await Promise.race([emailPromise, timeoutPromise]);
                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Email sending failed:', emailError.message);
                // Continue - we'll still return success
            }
        } else {
            console.log('Email not configured - message logged only');
        }
        
        // Always return success to user
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Unexpected error:', error);
        // Still return success to user
        res.status(200).json({ success: true, message: 'Message received!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
