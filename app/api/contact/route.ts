import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import OpenAI from 'openai';

// Initialize Groq client for smart responses
const initGroqClient = () => {
  if (!process.env.GROQ_API_KEY) {
    console.warn('GROQ_API_KEY environment variable is not configured. Using fallback responses.');
    return null;
  }

  return new OpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
    timeout: 180000, // 3 minutes
    maxRetries: 3,
    defaultHeaders: {
      "Accept-Encoding": "gzip",
      "Accept": "application/json",
      "Connection": "keep-alive"
    },
    defaultQuery: {
      "model": "llama-3.1-8b-instant"
    }
  });
};

// Generate smart response using Groq API
const generateSmartResponse = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const groq = initGroqClient();
  
  if (!groq) {
    // Fallback response if Groq is not configured
    return {
      greeting: `Hello ${data.name},`,
      response: `Thank you for reaching out about "${data.subject}". I've received your message and will get back to you as soon as possible. I appreciate your interest and look forward to our conversation.`,
      closing: "Best regards,\nMalek Maghraoui"
    };
  }

  try {
    const systemPrompt = `
      You are Malek Maghraoui, a professional developer responding to a contact form submission.
      Respond in a friendly, professional tone using "I" (not "we").
      Keep your response concise, warm, and natural.
      Acknowledge the specific subject and message content.
      Don't repeat the entire message back to the sender.
      Format your response as a JSON object with three fields:
      - greeting: A personalized greeting using their name
      - response: Your main response acknowledging their specific inquiry
      - closing: Your professional sign-off
    `;

    const userPrompt = `
      A user named ${data.name} (${data.email}) has submitted a contact form with the subject: "${data.subject}"
      
      Their message is:
      "${data.message}"
      
      Please craft a personalized, professional response.
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2,
      max_tokens: 500,
      top_p: 0.9,
      response_format: { type: "json_object" }
    });

    const responseContent = JSON.parse(response.choices[0].message.content);
    return responseContent;
  } catch (error) {
    console.error('Error generating smart response:', error);
    
    // Fallback response if Groq API fails
    return {
      greeting: `Hello ${data.name},`,
      response: `Thank you for reaching out about "${data.subject}". I've received your message and will get back to you as soon as possible. I appreciate your interest and look forward to our conversation.`,
      closing: "Best regards,\nMalek Maghraoui"
    };
  }
};

// Email template for admin notification
const generateAdminEmailTemplate = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  smartResponse?: {
    greeting: string;
    response: string;
    closing: string;
  };
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
        }
        .container {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          padding: 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 15px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          position: relative;
          z-index: 1;
        }
        .header p {
          margin: 10px 0 0;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }
        .content {
          background-color: white;
          padding: 30px 20px;
        }
        .field {
          margin-bottom: 15px;
        }
        .field-name {
          font-weight: bold;
          color: #0f766e;
        }
        .message-box {
          background-color: #f9fafb;
          padding: 15px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          margin-top: 5px;
        }
        .section-divider {
          margin: 30px 0;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }
        .ai-response {
          background-color: #f0f9ff;
          border-left: 4px solid #0ea5e9;
          padding: 15px;
          border-radius: 0 6px 6px 0;
          margin-top: 5px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
        }
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          .header {
            padding: 20px 15px;
          }
          .content {
            padding: 20px 15px;
          }
          .logo {
            max-width: 120px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>You've received a new message from your portfolio website</p>
        </div>
        <div class="content">
          <div class="field">
            <span class="field-name">Name:</span> ${data.name}
          </div>
          <div class="field">
            <span class="field-name">Email:</span> ${data.email}
          </div>
          <div class="field">
            <span class="field-name">Subject:</span> ${data.subject}
          </div>
          <div class="field">
            <span class="field-name">Message:</span>
            <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          
          ${data.smartResponse ? `
          <div class="section-divider"></div>
          <div class="field">
            <span class="field-name">AI Response Sent to User:</span>
            <div class="ai-response">
              <p><strong>Greeting:</strong> ${data.smartResponse.greeting}</p>
              <p><strong>Response:</strong> ${data.smartResponse.response}</p>
              <p><strong>Closing:</strong> ${data.smartResponse.closing.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          <p>This email was sent from the contact form on your portfolio website.</p>
          <p>&copy; ${new Date().getFullYear()} Malek Maghraoui. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Email template for user confirmation with smart response
const generateUserEmailTemplate = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  smartResponse: {
    greeting: string;
    response: string;
    closing: string;
  };
}) => {
  // Use the provided smart response
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Message</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
        }
        .container {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header {
          background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 15px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          position: relative;
          z-index: 1;
        }
        .header p {
          margin: 10px 0 0;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }
        .content {
          padding: 30px 20px;
        }
        .message {
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .message p {
          margin: 0 0 15px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
        }
        .social-links {
          text-align: center;
          padding: 15px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #0f766e;
          text-decoration: none;
        }
        .button {
          display: inline-block;
          background-color: #0f766e;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin-top: 15px;
          font-weight: 500;
        }
        .button:active,
        .button:link,
        .button:visited {
          color: white;
        }
        .signature {
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
          font-style: normal;
        }
        /* Removed .signature img styling as logo is now in header */
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          .header {
            padding: 20px 15px;
          }
          .content {
            padding: 20px 15px;
          }
          .logo {
            max-width: 120px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Message</h1>
          <p>I appreciate you reaching out</p>
        </div>
        <div class="content">
          <div class="message">
            <p>${data.smartResponse.greeting}</p>
            
            <p>${data.smartResponse.response}</p>
            
            <p>If you have any other questions or would like to discuss further, please don't hesitate to let me know.</p>
            
            <p style="text-align: center;">
              <a href="https://malekverse.com" class="button">Visit My Portfolio</a>
            </p>
            
            <div class="signature">
              <p>${data.smartResponse.closing.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        </div>
        <div class="social-links">
          <a href="https://github.com/malekverse">GitHub</a>
          <a href="https://www.linkedin.com/in/malek-maghraoui">LinkedIn</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Malek Maghraoui. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate the required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email configuration
    if (process.env.EMAIL_SERVICE) {
      // If using a service like SendGrid or Gmail, we only need to check for credentials
      if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        console.error('Email service credentials missing. Please check your .env.local file');
        return NextResponse.json(
          { 
            error: 'Email service not configured properly', 
            details: 'Email service credentials are missing. Please check EMAIL_SETUP.md for configuration instructions.'
          },
          { status: 500 }
        );
      }
    } else {
      // If using custom SMTP, we need to check for host and credentials
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        console.error('SMTP configuration missing. Please check your .env.local file');
        return NextResponse.json(
          { 
            error: 'Email service not configured properly', 
            details: 'SMTP configuration is incomplete. Please check EMAIL_SETUP.md for configuration instructions.'
          },
          { status: 500 }
        );
      }
    }

    // Create a transporter using SMTP
    // Check if we're using a service like SendGrid or a custom SMTP server
    let transportConfig;
    
    if (process.env.EMAIL_SERVICE && process.env.EMAIL_SERVICE.toLowerCase() === 'sendgrid') {
      // SendGrid configuration
      transportConfig = {
        service: 'SendGrid',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      };
      console.log('Using SendGrid email service');
    } else if (process.env.EMAIL_SERVICE && process.env.EMAIL_SERVICE.toLowerCase() === 'gmail') {
      // Gmail configuration
      transportConfig = {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      };
      console.log('Using Gmail email service');
    } else {
      // Custom SMTP configuration
      transportConfig = {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      };
      
      console.log('Using custom SMTP configuration:', {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        user: process.env.SMTP_USER ? '✓ Set' : '✗ Missing',
        pass: process.env.SMTP_PASSWORD ? '✓ Set' : '✗ Missing'
      });
    }
    
    const transporter = nodemailer.createTransport(transportConfig);

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP connection verification failed:', verifyError);
      
      // Provide more specific error message based on the error type
      let errorDetails = 'Unable to establish connection with the email server. Please check EMAIL_SETUP.md for configuration instructions.';
      
      if (verifyError.code === 'ECONNREFUSED') {
        errorDetails = 'Connection to email server was refused. This usually means the server address is incorrect or the server is not running.';
      } else if (verifyError.code === 'ETIMEDOUT') {
        errorDetails = 'Connection to email server timed out. Please check your network connection and server address.';
      } else if (verifyError.code === 'EAUTH') {
        errorDetails = 'Authentication failed. Please check your email credentials (username and password).';
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to connect to email server', 
          details: errorDetails
        },
        { status: 500 }
      );
    }

    // Generate smart response first so we can use it in both emails
    const smartResponse = await generateSmartResponse({ name, email, subject, message });
    
    // Generate user email template with the smart response we already created
    const userEmailHtml = generateUserEmailTemplate({ name, email, subject, message, smartResponse });

    // Send email to admin with both user message and AI response
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: ['malek.magraoui3@gmail.com'],
        subject: `New Contact: ${subject}`,
        html: generateAdminEmailTemplate({ name, email, subject, message, smartResponse }),
      });
      
      // Send confirmation email to user
      await transporter.sendMail({
        from: `"Malek Maghraoui" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thank you for contacting me',
        html: userEmailHtml,
      });

      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    } catch (sendError) {
      console.error('Error sending email:', sendError);
      
      // Provide more specific error message based on the error type
      let errorMessage = 'Failed to send email';
      let errorDetails = 'There was a problem sending your message. Please check EMAIL_SETUP.md for configuration instructions.';
      
      if (sendError.code === 'ECONNREFUSED') {
        errorDetails = 'Connection to email server was refused. This usually means the server address is incorrect or the server is not running.';
      } else if (sendError.code === 'ETIMEDOUT') {
        errorDetails = 'Connection to email server timed out. Please check your network connection and server address.';
      } else if (sendError.code === 'EAUTH') {
        errorDetails = 'Authentication failed. Please check your email credentials (username and password).';
      } else if (sendError.responseCode >= 500) {
        errorDetails = 'The email server encountered an error. Please try again later.';
      } else if (sendError.responseCode >= 400) {
        errorDetails = 'The email request was invalid. Please check your email configuration.';
      }
      
      return NextResponse.json(
        { 
          error: errorMessage, 
          details: errorDetails
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request', 
        details: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}