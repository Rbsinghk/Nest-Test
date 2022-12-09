import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type userDcument = userM & Document;
@Schema()
export class userM {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(userM);
