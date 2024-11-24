import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { TaskEntity } from "./task.entity";

@Entity("user")
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid;
  @Column({ type: "varchar", nullable: true })
  username;
  @Column({ type: "varchar", nullable: false })
  email;
  @Column({ type: "varchar", nullable: false })
  password;
  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
