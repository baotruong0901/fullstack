const {Sequelize}=require('sequelize')

// const sequelize=new Sequelize('sqlite:memory:')
// const sequelize=new Sequelize('postgres://user:pass@example.com:5432/dbname')


// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite'
// })

const sequelize = new Sequelize('BaoVy', 'root', null, {
    host:'localhost',
    dialect: 'mysql',
    logging:false
})

let connectDB = async ()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB