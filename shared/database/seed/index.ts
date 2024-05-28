import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { benPerson, declanPerson, natashaPerson, personContactDetails, personRoles, personSkills } from './people';
import { teamKeplar, teamMembers, teamOrion } from './teams';
import { documentation, documentationDocuments, documentationFiles } from './documentation';
import { apiDevSkill, devOpsSkill, uiDevSkill } from './skills';
import { softwareDevRole, teamLeadRole } from './roles';
import { deedSearchProject, projectLinks, projectOwnership } from './projects';
import { PrismaClient } from '@prisma/client';
import { onboarding, onboardingSteps } from './onboarding';
import { workAreaPeople, workAreas, workItems, workItemStatuses } from './work';

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

    await client.projectLink.deleteMany();
    await client.projectOwnership.deleteMany();
    await client.project.deleteMany();

    await client.teamMember.deleteMany();
    await client.team.deleteMany();

    await client.personContactDetails.deleteMany();
    await client.personSkill.deleteMany();
    await client.personRole.deleteMany();
    await client.person.deleteMany();

    await client.role.deleteMany();
    await client.skill.deleteMany();

    await client.domain.deleteMany();
    await client.user.deleteMany();

    /** INSERTS **/

    await client.user.createMany({ data: [declanUser(), benUser(), natashaUser()] });

    await client.domain.create({ data: ros() });

    await client.skill.createMany({ data: [uiDevSkill(), apiDevSkill(), devOpsSkill()] });

    await client.role.createMany({ data: [softwareDevRole(), teamLeadRole()] });

    await client.person.createMany({ data: [declanPerson(), benPerson(), natashaPerson()] });

    await client.personSkill.createMany({ data: personSkills() });

    await client.personRole.createMany({ data: personRoles() });

    await client.personContactDetails.createMany({ data: personContactDetails() });

    await client.team.createMany({ data: [teamOrion(), teamKeplar()] });

    await client.teamMember.createMany({ data: teamMembers() });

    await client.project.createMany({ data: deedSearchProject() });
    await client.projectLink.createMany({ data: projectLinks() });
    await client.projectOwnership.createMany({ data: projectOwnership() });

    await client.documentation.createMany({ data: documentation() });
    await client.documentationDocument.createMany({ data: documentationDocuments() });
    await client.documentationFile.createMany({ data: documentationFiles() });

    await client.onboardingGuide.createMany({ data: onboarding() });
    await client.onboardingGuideStep.createMany({ data: onboardingSteps() });

    await client.workArea.createMany({ data: workAreas() });
    await client.workAreaPerson.createMany({ data: workAreaPeople() });
    await client.workItemStatus.createMany({ data: workItemStatuses() });
    await client.workItem.createMany({ data: workItems() });
    process.exit(0);
})();
