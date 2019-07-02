import { Table, Column, Model, Sequelize } from 'sequelize-typescript';

@Table({
    modelName: 'member'
})
export class MemberModel extends Model<MemberModel> {

    @Column({
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id?: number;

    @Column({
        type: Sequelize.CHAR(32),
        unique: true,
    })
    email?: string;

    @Column({
        type: Sequelize.CHAR(24),
    })
    name?: string;

    @Column({
        type: Sequelize.CHAR(48),
    })
    password?: string;
}
