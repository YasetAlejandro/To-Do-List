const router= require("express");
const routes= router.Router();
const connection= require("../database/db");


routes.get("/", (req, res) => {
    res.render("index"); // aquí tu vista principal con registro y login
});


routes.post("/", (req,res)=>{
    const name= req.body.name;
    const email= req.body.email;
    const pswd= req.body.pswd;

    connection.query('INSERT INTO users (name, email, pswd) VALUES (?, ?, ?)', [name,email, pswd ], (error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            //AQUI GUARDO EL ULTIMO ID QUE SE COLOCO PARA EL SESSION
            const userId = results.insertId;
            req.session.loggedin = true;
            req.session.name = name;
            req.session.user = userId;

            res.redirect("/index")
        }
    })
})



routes.post("/login", (req, res)=>{
    const email = req.body.email;
    const pass= req.body.pass; 

    if(email && pass){
        connection.query("SELECT * FROM users WHERE email=? AND pswd=?", [email, pass], (error, results)=>{
            if(error){
                console.log(error);
            }
            
            if(results.length>0){
                req.session.loggedin=true;
                req.session.name = results[0].name;
                req.session.user = results[0].id;
                res.redirect("/index");
            }else{
                res.render("login",{
                    alert: "wrong_pass",
                    alertTitle: "Error",
                    alertMessage: "Email o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    time: false,
                    ruta: "login"
                })
            }

        })
    }
})



module.exports=routes;