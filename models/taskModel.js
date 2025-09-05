const router= require("express");
const routes= router.Router();
const connection= require("../database/db");

// SE MUESTRAN TODAS LAS TASKS DEL USUARIO
routes.get("/tasks", (req,res)=>{
    const userId= req.session.user;
    const filterId = req.query.id; // ID del filtro
    connection.query("SELECT * FROM tasks WHERE user_id=?", [userId], (error, results)=>{
        if(error){
            console.log(error);
            return res.status(500).send("Error al obtener las tareas");
        }

        let filteredTasks = results;
        if(filterId){
            filteredTasks = results.filter(task => task.id == filterId);
        }

        res.render("tasks", {tasks:results});
    })

    
})



// CUANDO SE MARCA LA CASILLA QUEDA COMO COMPLETADO Y SE ACTUALIZA EN LA BD
routes.post("/tasks/:id", (req,res)=>{
    const taskId= req.params.id;
    const {situation}= req.body;

    connection.query("UPDATE tasks SET situation=? WHERE id=?", [situation, taskId], (error, results)=>{
        if(error){
            console.log(error);
            return res.status(500).json({ message: "Error al actualizar tarea" });
        }
        //res.status(200).json({message:"Tarea Actualizada"});
    })
})



// AQUI SE CREA UNA NUEVA TASK DESDE LA MISMA VENTANA
routes.post("/createTask", (req,res)=>{
    const title= req.body.title;
    const description= req.body.description; 
    const priority= req.body.priority;
    const end_date= req.body.end_date;
    const userId= req.session.user

    if(!userId) return res.send("No hay sesión iniciada");

    connection.query("INSERT INTO tasks (title, description, priority, end_date, user_id) VALUES (?,?,?,?,?)", [title, description, priority, end_date, userId], (error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            res.redirect("/tasks")
        }
    })
})



// ESTE ENDPOINT PERMITE DIRIGIRTE A UNA VENTANA DONDE PUEDAS EDITAR LA NOTICIA SELECCIONADA
routes.get("/tasks/edit/:id", (req, res) => {
    const taskId = req.params.id;
    const userId = req.session.user;

    if (!userId) return res.send("Debes iniciar sesión");

    connection.query(
        "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
        [taskId, userId],
        (error, results) => {
            if (error) return res.send("Error en la base de datos");
            if (!results || results.length === 0) return res.send("Tarea no encontrada");

            const task = results[0];
            res.render("editTask", { task });
        }
    );
});



// SE ACTUALIZAN LOS DATOS Y TE REDIRIGE A DONDE ESTAN TUS TASKS
routes.post("/tasks/update/:id", (req,res)=>{
    const taskId = req.params.id;
    const { title, description, priority, end_date } = req.body;

    connection.query("UPDATE tasks SET title = ?, description = ?, priority = ?, end_date = ? WHERE id = ?", [title, description, priority, end_date, taskId], (error, results)=>{
        if(error){
            console.log(error);
        }
        res.redirect("/tasks");
    })
})


// SE ELIMINAN LAS TASK DESDE LA VISTA PRINCIPAL 
routes.post("/tasks/delete/:id", (req,res)=>{
    const taskId= req.params.id;

    connection.query("DELETE FROM tasks WHERE id=?", [taskId], (error, results)=>{
        if(error){
            console.log(error);
        }
        res.redirect("/tasks")
    })
})


module.exports= routes;