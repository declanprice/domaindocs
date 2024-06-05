import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { benPerson, declanPerson, natashaPerson, personContacts, personRoles, personSkills } from './people';
import { teamContacts, teamKeplar, teamLinks, teamMembers, teamOrion } from './teams';
import { documentation, documentationDocuments, documentationFiles } from './documentation';
import { apiDevSkill, devOpsSkill, uiDevSkill } from './skills';
import { softwareDevRole, teamLeadRole } from './roles';
import { PrismaClient } from '@prisma/client';
import { onboarding, onboardingSteps } from './onboarding';
import { workAreaPeople, workAreas, workItemAssignees, workItemAttachments, workItems, workItemStatuses } from './work';
import { files } from './files';
import { componentContacts, componentLinks, deedSearchComponent } from './components';

const client = new PrismaClient();

(async () => {
    /** CLEAR **/

    await client.workItemAssigne.deleteMany();
    await client.workItemAttachment.deleteMany();
    await client.workItem.deleteMany();
    await client.workItemStatus.deleteMany();
    await client.workAreaPerson.deleteMany();
    await client.workArea.deleteMany();

    await client.onboardingGuideProgress.deleteMany();
    await client.onboardingGuideStep.deleteMany();
    await client.onboardingGuide.deleteMany();

    await client.documentationFile.deleteMany();
    await client.documentationDocument.deleteMany();
    await client.documentation.deleteMany();

    await client.componentLabel.deleteMany();
    await client.componentContact.deleteMany();
    await client.componentLink.deleteMany();
    await client.component.deleteMany();

    await client.teamLink.deleteMany();
    await client.teamContact.deleteMany();
    await client.teamMember.deleteMany();
    await client.team.deleteMany();

    await client.personContact.deleteMany();
    await client.personSkill.deleteMany();
    await client.personRole.deleteMany();
    await client.person.deleteMany();

    await client.role.deleteMany();
    await client.skill.deleteMany();

    await client.file.deleteMany();
    await client.domain.deleteMany();
    await client.user.deleteMany();

    /** INSERTS **/

    await client.user.createMany({ data: [declanUser(), benUser(), natashaUser()] });

    await client.domain.create({ data: ros() });

    await client.file.createMany({ data: files() });

    await client.skill.createMany({ data: [uiDevSkill(), apiDevSkill(), devOpsSkill()] });

    await client.role.createMany({ data: [softwareDevRole(), teamLeadRole()] });

    await client.person.createMany({ data: [declanPerson(), benPerson(), natashaPerson()] });

    await client.personSkill.createMany({ data: personSkills() });

    await client.personRole.createMany({ data: personRoles() });

    await client.personContact.createMany({ data: personContacts() });

    await client.team.createMany({ data: [teamOrion(), teamKeplar()] });
    await client.teamMember.createMany({ data: teamMembers() });
    await client.teamLink.createMany({ data: teamLinks() });
    await client.teamContact.createMany({ data: teamContacts() });

    await client.component.createMany({ data: deedSearchComponent() });
    await client.componentLink.createMany({ data: componentLinks() });
    await client.componentContact.createMany({ data: componentContacts() });

    await client.documentation.createMany({ data: documentation() });
    await client.documentationDocument.createMany({ data: documentationDocuments() });
    await client.documentationFile.createMany({ data: documentationFiles() });

    await client.onboardingGuide.createMany({ data: onboarding() });
    await client.onboardingGuideStep.createMany({ data: onboardingSteps() });

    await client.workArea.createMany({ data: workAreas() });
    await client.workAreaPerson.createMany({ data: workAreaPeople() });
    await client.workItemStatus.createMany({ data: workItemStatuses() });
    await client.workItem.createMany({ data: workItems() });
    await client.workItemAssigne.createMany({ data: workItemAssignees() });
    await client.workItemAttachment.createMany({ data: workItemAttachments() });
    process.exit(0);
})();
