const express = require("express");
const routes = express.Router();
const connection = require("../database/db");

// FUNCION GET QUE ME PERMITE SELECCIONAR TODOS LOS TASK DEL USUARIO QUE INICIO SESION
routes.get("/tasks", (req, res) => {
    const userId = req.session.user;
    const filterId = req.query.id; // ID del filtro
    let sql = "SELECT * FROM tasks WHERE user_id=?";
    const params = [userId];
    if (filterId) {
        sql += " AND id=?";
        params.push(filterId);
    }

    // ACA SE MANDA CUANDO INICIA SECION UN JSON CON  TODAS LAS TASKS DISPONIBLES Y SU INFORMACION
    connection.query(sql, params, (error, results) => {
        if (error) return res.status(500).json({ success: false, message: "Error al obtener tareas" });
        if (results.length === 0) return res.status(404).json({ success: false, message: "No se encontraron tareas" });
        res.status(200).json({ success: true, tasks: results });
    });
});



// ESTE ES UN FILTRO QUE PERMITE AL USUARIO INGRESAR EL ID Y FILTRAR
routes.get("/tasks/:id", (req, res) => {
    const userId = req.session.user;
    const taskId = req.params.id;

    connection.query(
        "SELECT * FROM tasks WHERE id=? AND user_id=?",
        [taskId, userId],
        (error, results) => {
            if (error) return res.status(500).json({ success: false, message: "Error al obtener tarea" });
            if (results.length === 0) return res.status(404).json({ success: false, message: "Tarea no encontrada" });
            res.status(200).json({ success: true, task: results[0] });
        }
    );
});



// METODO POST QUE PERMITE AL USUARIO UNA VEZ INICIO SESION QUE PUEDA CREAR UNA NOTICIA Y POR DEFECTO QUE SE LE ASIGNE EL USERID A LA TASK
routes.post("/tasks", (req, res) => {
    const { title, description, priority, end_date } = req.body;
    const userId = req.session.user;

    // VALIDAR QUE SE INGRESEN TODOS LOS DATOS, TITULO, PRIORIDAD Y UNA FECHA VALIDA
    if (!title || title.trim() === "") return res.status(400).json({ success: false, message: "El título es obligatorio" });
    if (! [1,2,3].includes(parseInt(priority))) return res.status(400).json({ success: false, message: "Prioridad inválida" });
    if (end_date && isNaN(new Date(end_date).getTime())) return res.status(400).json({ success: false, message: "Fecha inválida" });

    connection.query(
        //QUERY QUE PERMITE DESDE EL EJS (aunque ahora no esta funcional visualmente) MANDAR A LA BD LA INFORMACION DEL BODY
        "INSERT INTO tasks (title, description, priority, end_date, user_id) VALUES (?,?,?,?,?)",
        [title, description, priority, end_date || null, userId],
        (error, results) => {
            if (error) return res.status(500).json({ success: false, message: "Error al crear tarea" });
            const newTask = { id: results.insertId, title, description, priority, end_date, user_id: userId };
            res.status(201).json({ success: true, message: "Tarea creada correctamente", task: newTask });
        }
    );
});



// LA FUNCION PERMITE ACTUALIZAR LAS TASK QUE YA FUERON CREADAS 
routes.post("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const userId = req.session.user;
    const { title, description, priority, end_date, situation } = req.body;

    // VALIDACIONES DEL TITULO, FECHA DE FINALIZACION DE TASK, PRIORIDAD ASIGNADA EN INT 1,2,3 DEPENDE DE COMPLEJIDAD
    if (title && title.trim() === "") return res.status(400).json({ success: false, message: "Título inválido" });
    if (priority && ! [1,2,3].includes(parseInt(priority))) return res.status(400).json({ success: false, message: "Prioridad inválida" });
    if (end_date && isNaN(new Date(end_date).getTime())) return res.status(400).json({ success: false, message: "Fecha inválida" });

    connection.query(
        "UPDATE tasks SET title=COALESCE(?, title), description=COALESCE(?, description), priority=COALESCE(?, priority), end_date=COALESCE(?, end_date), situation=COALESCE(?, situation) WHERE id=? AND user_id=?",
        [title, description, priority, end_date, situation, taskId, userId],
        (error, results) => {
            if (error) return res.status(500).json({ success: false, message: "Error al actualizar tarea" });
            if (results.affectedRows === 0) return res.status(404).json({ success: false, message: "Tarea no encontrada" });
            res.status(200).json({ success: true, message: "Tarea actualizada correctamente" });
        }
    );
});



// fUNCION PARA ELIMINAR LAS TASK
routes.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const userId = req.session.user;

    connection.query(
        "DELETE FROM tasks WHERE id=? AND user_id=?",
        [taskId, userId],
        (error, results) => {
            if (error) return res.status(500).json({ success: false, message: "Error al eliminar tarea" });
            if (results.affectedRows === 0) return res.status(404).json({ success: false, message: "Tarea no encontrada" });
            res.status(200).json({ success: true, message: "Tarea eliminada correctamente" });
        }
    );
});

module.exports = routes;
