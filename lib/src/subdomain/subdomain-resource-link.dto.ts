export class SubdomainResourceLinkDto {
  constructor(
    private linkId: string,
    private title: string,
    private subTitle: string,
    private href: string,
    private iconUri?: string,
  ) {}
}
