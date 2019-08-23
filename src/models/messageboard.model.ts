import { Table, Column, Model, Sequelize } from 'sequelize-typescript';

@Table({
    indexes: [
        {
            fields: ['board_id']
        },
        {
            fields: ['author_id']
        },
        {
            fields: ['board_id', 'upload_time']
        },
    ]
})
export class MessageBoardModel extends Model<MessageBoardModel> {

    @Column({
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id?: number;

    @Column({
        type: Sequelize.CHAR(32),
    })
    board_id?: string;

    @Column({
        type: Sequelize.STRING
    })
    subject?: string;

    @Column({
        type: Sequelize.INTEGER
    })
    author_id?: number;

    @Column({
        type: Sequelize.INTEGER
    })
    upload_time?: number;

    @Column({
        type: Sequelize.TEXT
    })
    content?: string;
}
