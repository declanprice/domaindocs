import { SubdomainSummaryDto } from './subdomain-summary.dto';
import { SubdomainResourceLinkDto } from './subdomain-resource-link.dto';
import { SubdomainContactDto } from './subdomain-contact.dto';
export declare class SubdomainOverviewDto {
    private name;
    private summary;
    private resourceLinks;
    private contacts;
    constructor(name: string, summary: SubdomainSummaryDto, resourceLinks: SubdomainResourceLinkDto[], contacts: SubdomainContactDto[]);
}
