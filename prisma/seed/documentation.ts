import { Documentation } from '@prisma/client';

export const logoItem = (): Documentation => {
  return {
    documentationId: '1',
    name: 'Logo',
    isFolder: false,
    folderPosition: 1,
  };
};

export const projectPlanItem = (): Documentation => {
  return {
    documentationId: '2',
    name: 'Project Plan',
    isFolder: false,
    folderPosition: 2,
  };
};

export const siteMapsFolder = (): Documentation => {
  return {
    documentationId: '3',
    name: 'Site Maps',
    isFolder: true,
    position: 3,
  };
};

export const siteMapItem = (): Documentation => {
  return {
    documentationId: '3',
    name: 'Item 1',
    isFolder: true,
    folderId: '3',
    position: 1,
  };
};
