const express=require("express")
const routes= express.Router()
const bcrypt= require("bcrypt")

//Encriptados
routes.post("/encrypt", async (req, res)=>{
    try{
        const salt= bcrypt.genSaltSync(10)
        const password= req.body.contrasena
        const hashPassword= await bcrypt.hash(password, salt)
        res.send(hashPassword)
    }catch(error){
        console.log("Error al encriptar la contraseña: ")
        console.log(error)
    }
})
routes.post('/desencrypt', (req, res)=>{
    const {encryptedPass, password}= req.body
    bcrypt.compare(password, encryptedPass, (err, results)=>{
        if (err) {
            console.error(err);
            return res.status(500).send('Error al desencriptar la contraseña');
          }
      
          if (results) {
            res.json({valido: true});
          } else {
            return res.status(401).send('Contraseña incorrecta');
          }
    })
})
//Para los usuarios

routes.get("/email/:email", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM users WHERE email=?',[req.params.email], (err, results)=>{
            if(err) return res.send(err)
            if(results.length>0){
                res.send(results)
            }
            else{
                res.send(null)
            }
        })
    })
})

routes.get("/admemail/:email", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM users WHERE email=?',[req.params.email], (err, results)=>{
            if(err) return res.send(err)
            if(results.length>0){
                res.json({encontrado:true})
            }
            else{
                res.json({encontrado:false})
            }
        })
    })
})

routes.get("/password/:email", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM users WHERE email=?',[req.params.email], (err, results)=>{
            if(err) return res.send(err)
            if(results.length>0){
                res.send(results)
            }
            else{
                res.send(null)
            }
        })
    })
})

routes.post("/registeruser", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO users set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)
            res.send("Datos de usuario guardados")
        })
    })
})

routes.delete("/delete/:email", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM users WHERE email=?', [req.params.email], (err, rows)=>{
            if(err) return res.send(err)
            res.send("Usuario eliminado")
        })
    })
})

//Para los admin

routes.get("/aerolinea/:aerolinea", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM vuelos WHERE aerolinea=?', [req.params.aerolinea], (err, rows)=>{
            if(err) return res.send(err)
            res.send(rows)
        })
    })
})

routes.get("/reservas/:aerolinea", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM reservas WHERE aerolinea=?', [req.params.aerolinea], (err, rows)=>{
            if(err) return res.send(err)
            res.send(rows)
        })
    })
})

//Para los vuelos
routes.post("/registerflights", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO vuelos set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)
            res.send("Vuelo registrado")
        })
    })
})

routes.get("/showflights", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM vuelos', [req.body], (err, results)=>{
            if(err) return res.send(err)
            res.send(results)
        })
    })
})


routes.delete("/deleteflight/:id", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM vuelos WHERE id=?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.send("Vuelo eliminado")
        })
    })
})

//Para las reservas

routes.post("/reserveflight", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO reservas set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)
            res.send("Reserva realizada")
        })
    })
})

routes.get("/reservasuser/:email", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM reservas WHERE email= ?', [req.params.email], (err, rows)=>{
            if(err) return res.send(err)
            res.send(rows)
        })
    })
})

routes.delete("/cancelar/:id", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM reservas WHERE id= ?', [req.params.id], (err, results)=>{
            if(err) return res.send(err)
            res.send("Reserva cancelada")
        })
    })
})

routes.delete("/borrarreservas/:email", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM reservas WHERE email= ?', [req.params.email], (err, results)=>{
            if(err) return res.send(err)
            res.send("Reserva cancelada")
        })
    })
})

routes.put("/:id", (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE vuelos SET ? WHERE id=?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.send("Vuelo actualizado")
        })
    })
})

module.exports=routes
