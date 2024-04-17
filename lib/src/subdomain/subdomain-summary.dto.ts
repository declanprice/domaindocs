export class SubdomainSummaryDto {
  constructor(
    public peopleCount: number,
    public teamCount: number,
    public projectCount: number,
    public description: string,
  ) {}
}
