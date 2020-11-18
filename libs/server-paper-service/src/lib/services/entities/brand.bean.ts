import { ApiProperty } from '@nestjs/swagger';

/**
 * Brand data
 */
export class Brand {

  @ApiProperty({description: 'Url for the logo'})
  logoUrl: string;

  @ApiProperty({description: 'Brand title'})
  title: string;
}
