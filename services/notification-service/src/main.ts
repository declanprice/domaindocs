/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const api = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            port: 4001,
        },
    });

    const kafka = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'notification-service',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'notification-service-consumer', // hero-consumer-server
            },
        },
    });

    await app.startAllMicroservices();

    await app.listen(4000);
}

bootstrap();
