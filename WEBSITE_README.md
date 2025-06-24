# Malekverse Portfolio

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- Modern UI with space theme
- Responsive design for all devices
- Dark/Light mode support
- Contact form with email notifications
- Admin dashboard for managing contacts

## Contact Form Email System

The portfolio includes a professional email notification system for the contact form. When a visitor submits the contact form:

1. The server sends an email notification to the portfolio owner (to both `malek.magraoui3@gmail.com` and `contact@malekverse.com`)
2. The visitor receives a confirmation email thanking them for their message

### Email System Setup

To configure the email system, you need to set up the following environment variables in your `.env.local` file:

```
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-email-password
SMTP_SECURE=false
```

### How It Works

1. The contact form collects user input (name, email, subject, message)
2. When submitted, the form data is sent to the `/api/contact` endpoint
3. The API route uses Nodemailer to send two emails:
   - An admin notification with the form details
   - A confirmation email to the person who submitted the form
4. Both emails use responsive HTML templates with a space theme matching the portfolio design

### Email Templates

The email templates are designed to be responsive and match the space theme of the portfolio:

- **Admin Notification Email**: Contains all the details from the form submission including name, email, subject, and the full message
- **User Confirmation Email**: Thanks the user for their message and includes links to the portfolio and social media

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## License

All rights reserved © Malek Magraoui
