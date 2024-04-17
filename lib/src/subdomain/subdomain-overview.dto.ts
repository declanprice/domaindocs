import { SubdomainSummaryDto } from './subdomain-summary.dto';
import { SubdomainResourceLinkDto } from './subdomain-resource-link.dto';
import { SubdomainContactDto } from './subdomain-contact.dto';

export class SubdomainOverviewDto {
  constructor(
    public name: string,
    public summary: SubdomainSummaryDto,
    public resourceLinks: SubdomainResourceLinkDto[],
    public contacts: SubdomainContactDto[],
  ) {}
}
