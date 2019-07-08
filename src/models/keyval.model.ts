import { Table, Column, Model, Sequelize } from 'sequelize-typescript';

@Table
export class KeyValModel extends Model<KeyValModel> {

    @Column({
        type: Sequelize.STRING,
        primaryKey: true
    })
    id?: string;

    @Column({
        type: Sequelize.JSON
    })
    value?: string;
}
