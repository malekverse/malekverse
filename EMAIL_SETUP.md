# Email Configuration Setup Guide

## Overview

The contact form in this portfolio website requires proper email configuration to work correctly. This guide will help you set up the necessary environment variables for sending emails through the contact form.

## Error Details

If you're seeing an error like this:
```
Error sending email: Error: connect ECONNREFUSED 127.0.0.1:587
```

This means the application is trying to connect to a local SMTP server that doesn't exist. You need to configure a proper email service.

## Configuration Options

The application supports three email service options:

1. **SendGrid** (Recommended for production)
2. **Gmail** (Good for testing)
3. **Custom SMTP Server**

## Environment Variables

Create or update your `.env.local` file in the root directory with the following variables:

```env
# Choose one: 'sendgrid', 'gmail', or leave empty for custom SMTP
EMAIL_SERVICE=sendgrid

# SendGrid or Gmail credentials
SMTP_USER=your_username_or_api_key
SMTP_PASSWORD=your_password_or_api_key

# Only needed for custom SMTP configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
```

## Setup Instructions

### Option 1: SendGrid (Recommended)

1. Sign up for a [SendGrid account](https://sendgrid.com/)
2. Create an API key in the SendGrid dashboard
3. Set your environment variables:
   ```env
   EMAIL_SERVICE=sendgrid
   SMTP_USER=apikey
   SMTP_PASSWORD=your_sendgrid_api_key
   ```

### Option 2: Gmail

1. You'll need a Gmail account
2. If you have 2-factor authentication enabled, create an [App Password](https://myaccount.google.com/apppasswords)
3. Set your environment variables:
   ```env
   EMAIL_SERVICE=gmail
   SMTP_USER=your_gmail_address@gmail.com
   SMTP_PASSWORD=your_password_or_app_password
   ```
   
> **Note**: Gmail has sending limits and may not be suitable for production use.

### Option 3: Custom SMTP Server

1. Obtain SMTP credentials from your email provider
2. Set your environment variables:
   ```env
   # Leave EMAIL_SERVICE empty or remove it
   SMTP_HOST=smtp.your-provider.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@example.com
   SMTP_PASSWORD=your_password
   ```

## Testing Your Configuration

After setting up your environment variables:

1. Restart your development server
2. Try submitting the contact form
3. Check the console logs for any error messages

## Troubleshooting

- **Connection Refused**: Check that your SMTP credentials and server details are correct
- **Authentication Failed**: Verify your username and password
- **Rate Limiting**: Some providers (like Gmail) have sending limits
- **Firewall Issues**: Make sure your environment allows outgoing connections on the SMTP port

## Security Notes

- Never commit your `.env.local` file to version control
- Consider using environment variables in your hosting platform for production deployments
- Regularly rotate your API keys and passwords for better security