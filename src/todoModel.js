const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequalize')

const Todo = sequelize.define('todos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
}   
);
Todo.sync({alter:true})
module.exports = Todo
