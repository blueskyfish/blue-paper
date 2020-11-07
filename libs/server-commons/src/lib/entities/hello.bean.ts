import { ApiProperty } from '@nestjs/swagger';

export class Hello {

  @ApiProperty({description: 'The greeting'})
  message: string;
}
