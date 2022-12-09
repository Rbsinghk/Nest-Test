import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import * as joi from 'joi';
import * as jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/register")
  async register(@Body() record) {
    const schema = joi.object({
      firstName: joi.string().min(3).optional().label("firstName"),
      email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: joi.string().min(6).max(20).required().label("password"),
      lastName: joi.string().min(3).optional().label("lastName"),
    })
    const { error } = schema.validate(record)
    if (error) {
      return { message: error.message, isSuccess: false }
    } else {
      const { firstName, lastName, email, password } = record
      await this.appService.addUser({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10)
      })
      return {
        message: "Register SuccessFully"
      }
    }
  }

  @Post("/login")
  async login(@Body() record) {
    const { email, password } = record
    const userMail = await this.appService.login({
      email
    })
    if (userMail) {
      const isMatch = await bcrypt.compare(password, userMail.password);
      if (isMatch) {
        const data = await this.appService.login({ _id: userMail._id })
        const token = jwt.sign({ data }, 'secret');
        return {
          message: "Login SuccessFully",
          token
        }
      } else {
        return {
          message: "Invalid Username or Password"
        }
      }
    } else {
      return {
        message: "Invalid Username or Password"
      }
    }
  }
}
