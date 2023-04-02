import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  date_birth: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column()
  mobile_pho: number;

  @Column()
  email: string;
}
