import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from './config.types';
import { MeetupModule } from './meetup/meetup.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<DatabaseConfig>,
      ): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('POSTGRES_HOST'),
          port: configService.getOrThrow('POSTGRES_PORT', { infer: true }),
          username: configService.getOrThrow('POSTGRES_USER'),
          password: configService.getOrThrow('POSTGRES_PASSWORD'),
          autoLoadEntities: true,
          synchronize: false,
          retryAttempts: 10,
          retryDelay: 1000,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    MeetupModule,
    TagModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
