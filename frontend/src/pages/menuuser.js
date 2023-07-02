import React, {useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import UserHeader from "../components/userHeader"
import "./Estilos/menuuser.css"

export default function MenuUser(){
    const navigate= useNavigate()
    useEffect(()=>{
        const userEmail= localStorage.getItem("data")
        if(userEmail==null){
            navigate('/mainpage')
        }
    })

    return(
        <body>
            <main>
                <html>
                    <UserHeader/>
                    <div className="contenedor_todo">
                        <h1>Bienvenido a FlyEasy, web para la reserva de vuelos</h1>
                        <h2>¿En qué podemos ayudarte hoy?</h2>
                        <div className="vuelos">
                                <h3>Haz click aquí para observar todos los vuelos disponibles para ti</h3>
                                <Link to="/mostrarvuelos"> Mostrar Vuelos</Link>
                        </div>
                        <div className="reservas">
                                <h3> Si quieres observar, confirmar o modificar tus reservas, haz click aquí</h3>
                            <Link to="/reservas">Ver historial de reservas</Link>
                        </div>
                        <div className="opciones">
                                <h3> Para actualizar datos de la cuenta o eliminarla, haz click aqui</h3>
                            <Link to="/opciones">Opciones de la cuenta</Link>
                        </div>
                    </div>
                </html>
            </main>
        </body>
    )
}