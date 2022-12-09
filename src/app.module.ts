import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model'

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/demoProject"), MongooseModule.forFeature([{ name: "userinfo", schema: UserSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
