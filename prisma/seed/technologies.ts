import { Technology } from '@prisma/client';
import { ros } from './domain';

export const reactTech = (): Technology => {
  return {
    technologyId: 'react',
    name: 'React',
    domainId: ros().domainId,
  };
};

export const angularTech = (): Technology => {
  return {
    technologyId: 'angular',
    name: 'Angular',
    domainId: ros().domainId,
  };
};

export const nestJsTech = (): Technology => {
  return {
    technologyId: 'nestjs',
    name: 'Nest JS',
    domainId: ros().domainId,
  };
};
