import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  async outfitDescription(url: string) {
    const prompt: String = `Generate a short, structured description of the visible outfit, including:
      - main clothing items,
      - primary colors,
      - overall style (e.g., casual, formal, sporty).
      Respond only with the outfit description in one short sentence.
      If no outfit is visible, respond with exactly: "No outfit detected."
      Do not mention people, faces, background, or accessories.`;

    const response = await this.openai.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [
            { type: 'input_text', text: `${prompt}` },
            {
              type: 'input_image',
              image_url: url,
              detail: 'auto',
            },
          ],
        },
      ],
    });
    // console.log(response.output_text);

    // const results = this.getEmbedding(response.output_text);
    return response.output_text;
  }

  async getEmbedding(text: string) {
    const results = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float',
    });
    return results.data[0].embedding;
  }
}
