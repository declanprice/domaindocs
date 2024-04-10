import { DomainService } from './domain.service';
import { Controller, Get } from '@nestjs/common';

@Controller('domains')
export class DomainController {
  constructor(readonly domainService: DomainService) {}

  @Get('domains')
  async getDomains() {
    return [];
    // return this.domainService.getUserDomains(userId);
  }

  // @Mutation((returns) => DomainModel)
  // async createDomain(@Args('data') input: UserInput) {
  //   return this.userService.createUser(input);
  // }
}
