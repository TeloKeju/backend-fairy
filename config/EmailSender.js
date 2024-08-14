// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer'

// Buat transporter
export const transporter = nodemailer.createTransport({
    service: 'Gmail',  // Gunakan layanan email Anda
    auth: {
        user: 'yosanokta12@gmail.com', // Email Anda
        pass: 'fuvd qwwn hzrg nuhp'  // Password email Anda
    }
});