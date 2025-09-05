const express= require("express");
const app= express();


//USO DEL URLENCODED PARA PODER USAR METODOS POST Y GET Y LOS ARCHIVOS JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));

const dotenv= require("dotenv");
dotenv.config({path: './env/.env'})



// SE USA EL SESSION PARA EL LOGIN
const session= require("express-session");
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));




// EL DIRECTORIO PUBLIC DONDE ESTARA EL CSS (no es mucho pero para eso esta la carpeta)
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname+ "/public"));

// MOTOR DE PLANTILLA EJS PARA RENDERIZAR
app.set("view engine", "ejs");

const connection=require("./database/db");

// AQUI SE COLOCAN LOS MODELOS QUE ES DONDE ESTARA CADA METODO QUE CUMPLE UNA FUNCION

app.use(require("./models/loginModel"));
app.use(require("./models/taskModel"))



app.listen(3000, (req, res)=>{
    console.log("SERVER: PORT 3000" )
})