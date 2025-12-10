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
    'http://localhost:5173'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        // Check if origin matches any allowed origin
        const isAllowed = allowedOrigins.some(allowed => {
            return origin === allowed || origin.startsWith(allowed);
        });
        if (isAllowed || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            console.log('Allowed origins:', allowedOrigins);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(express.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use App Password for Gmail
    }
});

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
        // Send email to your inbox
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

        await Promise.race([emailPromise, timeoutPromise]);
        
        console.log('Contact form submission sent:', { name, email });
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        // Still return success to user even if email fails (log it for debugging)
        console.log('Message received but email failed:', { name, email, message });
        res.status(200).json({ success: true, message: 'Message received! (Email notification may be delayed)' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
