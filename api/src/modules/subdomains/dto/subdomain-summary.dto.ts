export class SubdomainSummaryDto {
  constructor(
    private peopleCount: number,
    private teamCount: number,
    private projectCount: number,
    private description: string,
  ) {}
}
