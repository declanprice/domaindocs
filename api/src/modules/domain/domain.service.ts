import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';

@Injectable()
export class DomainService {
  constructor(readonly prisma: PrismaService) {}

  async getUserDomains(userId: string) {
    return [];
    // return this.prisma.users.findUnique({
    //   where: {
    //     userId,
    //   },
    // });
  }

  // async createUser(data: UserInput) {
  // const authUser = await this.authService.getUser(data.userId);
  //
  // return this.prisma.users.create({
  //   data: {
  //     userId: data.userId,
  //     email: authUser.emails[0],
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //   },
  // });
  // }
}
