import { ApiProperty } from '@nestjs/swagger';

export class HelloParams {

  @ApiProperty({
    description: 'The optional name',
    required: false,
    type: String,
  })
  name?: string;
}
