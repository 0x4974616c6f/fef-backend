import { User } from '@prisma/client';

export class UserEntity implements User {
  password: string;
  id: number;
  email: string;
  name: string;
  admin: boolean;
  createdAt: Date;
}
