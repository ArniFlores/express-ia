import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  groqApiKey: process.env.GROQ_API_KEY || '',
  cerebrasApiKey: process.env.CEREBRAS_API_KEY || ''
};
