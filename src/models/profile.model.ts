import { Table, Column, Model, Sequelize } from 'sequelize-typescript';

@Table
export class ProfileModel extends Model<ProfileModel> {

    @Column({
        type: Sequelize.INTEGER,
        primaryKey: true,
    })
    id?: number;

    @Column({
        type: Sequelize.TEXT()
    })
    intro?: string;

    @Column({
        type: Sequelize.CHAR(32)
    })
    picture?: string;
}
