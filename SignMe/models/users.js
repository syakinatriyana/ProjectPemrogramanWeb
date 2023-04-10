const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/dbsignme');

const User = sequelize.define('users',{
    id : {
        type : DataTypes.STRING,
        primaryKey : true
    },
    full_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    instance : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    active : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    },
    sign_img : {
        type : DataTypes.STRING,
        allowNull : false
    },
    created_at : {
        type : DataTypes.DATE
    },
    updated_at : {
        type : DataTypes.DATE
    }
},
{
    tableName : 'users',
    timestamps : true,
    createdAt : 'created_at',    
    updatedAt : 'updated_at'
})

module.exports = User