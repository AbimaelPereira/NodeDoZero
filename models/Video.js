import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Video = sequelize.define('Video', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'videos',
    timestamps: false, // se não usar timestamps (createdAt, updatedAt)
});

export default Video;
