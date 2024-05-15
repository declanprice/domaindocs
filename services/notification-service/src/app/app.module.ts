import { Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpdatesController } from './updates.controller';
import { Kafka } from 'kafkajs';

@Module({
    imports: [],
    controllers: [AppController, UpdatesController],
    providers: [AppService],
})
export class AppModule implements OnModuleInit {
    async onModuleInit() {
        const kafka = new Kafka({
            clientId: 'notification-service',
            brokers: ['localhost:9092'],
        });

        const admin = kafka.admin();

        // get list of topics
        const topics = await admin.listTopics();

        console.log('topics', topics);
    }
}
