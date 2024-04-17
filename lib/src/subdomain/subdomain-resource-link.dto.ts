export class SubdomainResourceLinkDto {
  constructor(
    public linkId: string,
    public title: string,
    public subTitle: string,
    public href: string,
    public iconUri?: string,
  ) {}
}
