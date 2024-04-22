import { ros } from './domain';

export const reactTech = () => {
  return {
    technologyId: 'react',
    name: 'React',
    domainId: ros().domainId,
  };
};

export const angularTech = () => {
  return {
    technologyId: 'angular',
    name: 'Angular',
    domainId: ros().domainId,
  };
};

export const nestJsTech = () => {
  return {
    technologyId: 'nestjs',
    name: 'Nest JS',
    domainId: ros().domainId,
  };
};
