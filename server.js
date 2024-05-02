// server.js

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Import cors middleware

const app = express();
const port = 3000;

// Use cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post("/sendEmail", (req, res) => {
  // Extract form data from request body
  const {
    lastname,
    name,
    phone,
    email,
    people,
    apartment,
    checkin,
    checkout,
    message,
  } = req.body;

  // Construct email message
  const mailOptions = {
    from: "mihai.murg@demomailtrap.com", // Replace with your email address
    to: "myshu_m@yahoo.com",
    subject: "Test Email",
    html: `
            <p><strong>Last Name:</strong> ${lastname}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Number of People:</strong> ${people}</p>
            <p><strong>Apartment:</strong> ${apartment}</p>
            <p><strong>Check-in Date:</strong> ${checkin}</p>
            <p><strong>Check-out Date:</strong> ${checkout}</p>
            <p><strong>Message/Special Requests:</strong> ${message}</p>
        `,
  };

  // Create SMTP transporter using Mailtrap credentials
  var transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "7c017f52561cc586a2cc170080492ec1",
    },
  });

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

/*
{
  "name": "glitch-hello-node",
  "version": "0.1.0",
  "description": "A simple Node app built on fastify, instantly up and running. Built to be remixed on Glitch.com.",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "fastify": "^4.21.0",
    "handlebars": "^4.7.8",
    "@fastify/formbody": "^7.4.0",
    "@fastify/static": "^6.10.2",
    "@fastify/view": "^8.0.0",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "nodemailer": "^6.9.13"
  },
  "engines": {
    "node": "14.x"
  },
  "repository": {
    "url": "https://glitch.com/edit/#!/glitch-hello-node"
  },
  "license": "MIT",
  "keywords": [
    "node",
    "glitch"
  ]
}

*/
