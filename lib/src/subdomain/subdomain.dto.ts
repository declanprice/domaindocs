export class SubdomainDto {
  constructor(
    private subdomainId: string,
    private domainId: string,
    private name: string,
    private description: string,
  ) {}
}
