import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    type: 'text',
  })
  title: string

  @Column({
    nullable: false,
    type: 'text',
  })
  developer: string

  @Column({
    nullable: false,
    type: 'float',
  })
  year: number

  @Column({
    nullable: false,
    type: 'float',
  })
  price: number
}
