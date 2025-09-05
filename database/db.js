const mysql= require("mysql");


const connection= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

//SE HACE LA CONEXION 
connection.connect((error=>{
    if(error){
        console.log("Error de coneccion: "+ error);
        return;
    }
    console.log("BD CONECTADA.....")
}))

module.exports=connection;