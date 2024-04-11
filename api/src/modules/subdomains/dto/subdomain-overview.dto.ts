import { SubdomainSummaryDto } from './subdomain-summary.dto';
import { SubdomainResourceLinkDto } from './subdomain-resource-link.dto';
import { SubdomainContactDto } from './subdomain-contact.dto';

export class SubdomainOverviewDto {
  constructor(
    private name: string,
    private summary: SubdomainSummaryDto,
    private resourceLinks: SubdomainResourceLinkDto[],
    private contacts: SubdomainContactDto[],
  ) {}
}
