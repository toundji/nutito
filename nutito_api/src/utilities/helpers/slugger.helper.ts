import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConfig } from 'nestjs-config';
const slugify = require('slugify');

@Injectable()
export class Slugger {
  constructor(private readonly config: ConfigService) {}

  slugify(slug: string): Promise<string> {
    return slugify(slug, {
      replacement: this.replacement(),
      remove: /[*+~.,()\/\\'"!:@]/g,
      lower: true, 
      trim: true 
    });
  }

  replacement(): string {
    return this.config.get('REPLACEMENT');
  }
  
}