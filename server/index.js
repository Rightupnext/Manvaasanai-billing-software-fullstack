
//Copyright (c) 2022 Panshak Solomon

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import pdf from 'html-pdf'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import invoiceRoutes from './routes/invoices.js'
import clientRoutes from './routes/clients.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productsRoute.js'
import CategoryRoutes from './routes/categoryRoutes.js'
import profile from './routes/profile.js'
import pdfTemplate from './documents/index.js'
// import invoiceTemplate from './documents/invoice.js'
import emailTemplate from './documents/email.js'
const app = express()
dotenv.config()

app.use((express.json({ limit: "30mb", extended: true})))
app.use((express.urlencoded({ limit: "30mb", extended: true})))
app.use((cors()))

app.use('/api/invoices', invoiceRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/users', userRoutes)
app.use('/api/profiles', profile)
app.use("/api/products", productRoutes);
app.use("/api/category", CategoryRoutes);

// NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port : process.env.SMTP_PORT,
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
    },
    tls:{
        rejectUnauthorized:false
    }
})


var options = { format: 'A4' };
//SEND PDF INVOICE VIA EMAIL
app.post('/api/send-pdf', (req, res) => {
    const { email, company } = req.body

    // pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
       
          // send mail with defined transport object
        transporter.sendMail({
            from: ` Accountill <hello@accountill.com>`, // sender address
            to: `${email}`, // list of receivers
            replyTo: `${company.email}`,
            subject: `Invoice from ${company.businessName ? company.businessName : company.name}`, // Subject line
            text: `Invoice from ${company.businessName ? company.businessName : company.name }`, // plain text body
            html: emailTemplate(req.body), // html body
            attachments: [{
                filename: 'invoice.pdf',
                path: `${__dirname}/invoice.pdf`
            }]
        });

        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});


//Problems downloading and sending invoice
// npm install html-pdf -g
// npm link html-pdf
// npm link phantomjs-prebuilt

//CREATE AND SEND PDF INVOICE
app.post('/api/create-pdf', (req, res) => {
    const outputPath = path.join(__dirname, 'downloads', 'invoice.pdf'); 

    pdf.create(pdfTemplate(req.body), {}).toFile(outputPath, (err) => {
        if (err) {
            return res.status(500).send('Failed to create PDF');
        }
        res.send({ success: true });
    });
});


app.get('/api/fetch-pdf', (req, res) => {
    const filePath = path.join(__dirname, 'downloads', 'invoice.pdf');  
    res.sendFile(filePath, (err) => {
        if (err) {
            return res.status(500).send('Failed to send PDF');
        }
    });
});


app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING')
  })


  const DB_URL = process.env.DB_URL;
  const PORT = process.env.PORT || 5000;
  
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.error('MongoDB connection error:', error));