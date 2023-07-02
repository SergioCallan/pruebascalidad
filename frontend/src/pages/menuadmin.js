import React, {useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

export default function MenuAdmin(){
    const navigate= useNavigate()
    useEffect(()=>{
        const adminEmail= localStorage.getItem("admin")
        if(adminEmail==null){
            navigate('/loginadmin')
        }
    })

    const Salir=()=>{
        localStorage.clear()
        alert("Cerrando sesion")
        navigate("/menuadmin")
    }
    return(
        <body>
            <main>
                <html>
                    <button onClick={Salir}>Salir</button>
                    <div className="contenedor_todo">
                        <h1>Bienvenido a FlyEasy, administrador</h1>
                        <h3>¿Qué realizará hoy?</h3>
                        <div className="vuelos">
                                <h3>Para registrar un vuelo y que los usuarios puedan reservar, haga clic aquí</h3>
                                <Link to="/registrovuelos">Registrar Vuelos</Link>
                        </div>
                        <div className="reservas">
                                <h3> Si desea eliminar un vuelo reservado, haga click aquí</h3>
                            <Link to="/eliminarvuelo">Eliminar Vuelo</Link>
                        </div>
                        <div className="estadisticas">
                            <h3>Para observar información relevante como ganancias por vuelo y reservas realizadas, haga clic aquí</h3>
                            <Link to="/estadisticas">Mostrar Estadisticas</Link>
                        </div>
                    </div>
                </html>
            </main>
        </body>
    )
}
