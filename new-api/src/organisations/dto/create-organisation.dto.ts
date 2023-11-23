import { createZodDto } from 'nestjs-zod';

import { z } from 'nestjs-zod/z';

export class CreateOrganisationDto extends createZodDto(
  z.object({
    name: z.string().min(3, 'Organisation name must at least 3 characters.'),
  }),
) {}
