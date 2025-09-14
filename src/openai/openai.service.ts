import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  async outfitDescription(url: string) {
    const prompt: String =
      'Generate a concise description of the visible outfit (clothing items, colors, style). If the person is not wearing clothes or no outfit is clearly visible, respond with: "No outfit detected." Avoid mentioning identity or background.';
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
