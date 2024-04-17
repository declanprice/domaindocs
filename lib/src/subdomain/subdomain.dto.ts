export class SubdomainDto {
  constructor(
    public subdomainId: string,
    public domainId: string,
    public name: string,
    public description: string,
  ) {}
}
