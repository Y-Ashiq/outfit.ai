import { Controller, Get } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}


  @Get()

  outfitDescription(){
    return this.openaiService.outfitDescription()
  }
}
