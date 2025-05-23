# Chat Feature Setup Guide

The portfolio website includes an AI-powered chat feature that allows visitors to interact with an AI assistant that represents you. This guide will help you set up the necessary environment variables for the chat functionality.

## Required API Keys

The chat feature supports two AI providers:

1. **Groq API** (Primary, recommended for faster responses)
2. **OpenAI API** (Fallback option)

You need to set up at least one of these services for the chat feature to work properly.

## Environment Variables

Create or update your `.env.local` file in the root directory with the following variables:

```
# Groq API Key (Primary)
GROQ_API_KEY=your_groq_api_key_here

# OpenAI API Key (Fallback)
OPENAI_API_KEY=your_openai_api_key_here
```

## How to Obtain API Keys

### Groq API Key

1. Create an account at [groq.com](https://console.groq.com/)
2. Navigate to the API Keys section
3. Generate a new API key
4. Copy the key and add it to your `.env.local` file

### OpenAI API Key

1. Create an account at [openai.com](https://platform.openai.com/)
2. Navigate to the API Keys section
3. Generate a new API key
4. Copy the key and add it to your `.env.local` file

## Testing the Chat Feature

After setting up the environment variables:

1. Restart your development server
2. Visit your portfolio website
3. Click on the chat icon in the bottom right corner or use the "Chat with Me" section
4. Try sending a message to test if the AI responds correctly

## Troubleshooting

If the chat feature is not working:

1. Check that your API keys are correctly set in the `.env.local` file
2. Verify that the API keys are valid and have not expired
3. Check the browser console for any error messages
4. Ensure your development server has been restarted after adding the environment variables

## Customization

You can customize the AI's personality and knowledge by modifying the system prompt in the `app/api/chat/route.ts` file. The system prompt contains information about you, your skills, and projects, which guides how the AI responds to user queries.