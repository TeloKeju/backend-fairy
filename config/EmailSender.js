// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer'

// Buat transporter
export const transporter = nodemailer.createTransport({
    service: 'gmail',  // Gunakan layanan email Anda
    auth: {
        user: 'pbsiproyek@gmail.com', // Email Anda
        pass: 'alung01042003'  // Password email Anda
    }
});