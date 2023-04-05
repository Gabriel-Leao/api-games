import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, type: 'text' })
  name: string

  @Column({ nullable: false, type: 'text' })
  email: string

  @Column({ nullable: false, type: 'text' })
  password: string
}
