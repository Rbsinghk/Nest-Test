import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDcument } from './user.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('userinfo') private readonly userModel: Model<userDcument>
  ) { }
  getHello(): string {
    return 'Hello World!';
  }
  addUser(record) {
    this.userModel.create(record)
  }

  login(record) {
    return this.userModel.findOne(record)
  }

}
