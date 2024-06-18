import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 256 })
  password: string;

  @Column('varchar', { unique: true, length: 256 })
  email: string;

  @Column('varchar', { unique: true, length: 256 })
  normalizedEmail: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
