import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class UpdatesController {
    @EventPattern('postgres.public.user')
    onUpdate(@Payload() message: any): any {
        console.log('update received', message);
    }
}
