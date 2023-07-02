import React, {useState} from "react"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import "./Estilos/login.css"
//Importas css

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate= useNavigate()

    const comprobarCambiosEmail = (event) => {
        setEmail(event.target.value)
    }

    const comprobarCambiosPassword = (event) => {
        setPassword(event.target.value)
    }

    const guardarDatos = async (e) => {
        e.preventDefault();
        const formEmail=email
        try {
            const url1='http://localhost:9000/api/password/'+formEmail+'#'
            const response1 = await axios.get(url1)
            if(response1.data!=null){
                const infouser= Object.values(response1.data)
                const encryptedPassword= infouser[0].contrasena
                const url2='http://localhost:9000/api/desencrypt'
                const response2= await axios.post(url2, {
                    encryptedPass: encryptedPassword,
                    password: password,
                })
                if(response2.data.valido){
                    alert("Inicio de sesion exitoso")
                    localStorage.setItem("data", formEmail)
                    navigate("/menuuser")
                }
                setEmail('');
                setPassword('');
            }
          } catch (error) {
            alert("Correo o contraseña invalidos, intente de nuevo.")
            setEmail('');
            setPassword('');
            console.error('Error al enviar la solicitud:', error);
          }
        
    };

    return(
        <body>
            <main>
                <div>
                    <Link to="/loginadmin">Ingresar como administrador</Link>
                </div>
                <div className="contenedor_todo">
                    <div className="dataUser">
                        <form onSubmit={guardarDatos}>
                            <h2>Iniciar Sesión</h2>
                            <input  id="email" type="email" placeholder="Correo" onChange={comprobarCambiosEmail}
                                required value={email} name="email"></input><br></br>
                            <input id="password" type="password" placeholder="Contraseña" onChange={comprobarCambiosPassword}
                                required value={password} name="password"></input><br></br>
                            <button type="submit">Ingresar</button>
                        </form>
                    </div>
                </div>
            </main>
        </body>
    );
}
