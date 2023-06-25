import React from "react"
import {Link} from "react-router-dom"
import "../pages/Estilos/userHeader.css"

const UserHeader=()=>{
    const Salir=()=>{
        alert("Cerrando sesion")
        localStorage.removeItem('data')
    }
    return(
        <div className="header-contenedor">
            <ul>
                <li>FlyEasy</li>
                <li>Nosotros</li>
                <li><Link onClick={Salir}>Salir</Link></li>
            </ul>
        </div>
    )
}

export default UserHeader