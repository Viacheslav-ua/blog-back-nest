import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-mysql'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: Number(config.get<number>('TYPEORM_PORT')),
        entities: [__dirname + 'dist/**/*.entity{.ts, .js}'],
        dropSchema: false,
        synchronize: true,
        migrationsRun: false,
        autoLoadEntities: true,
        logging: true,
        migrations: ['dist/**/db/migrations/*{.ts,.js}'],
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
