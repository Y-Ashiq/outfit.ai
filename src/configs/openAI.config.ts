import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
