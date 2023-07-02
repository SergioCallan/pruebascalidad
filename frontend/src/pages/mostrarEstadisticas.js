import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function MostrarEstadisticas(){
    const navigate= useNavigate()

    useEffect(()=>{
        const adminEmail= localStorage.getItem("admin")
        if(adminEmail==null){
            navigate('/loginadmin')
        }
    })

    const vuelo={
        aerolinea: localStorage.getItem("aerolinea"),
        cantidad: localStorage.getItem("cantidadVuelos"),
        reservas: localStorage.getItem("cantidadReservas"),
        ganancias: localStorage.getItem("ganancias")
    }

    const Atras=()=>{
        localStorage.removeItem("aerolinea")
        localStorage.removeItem("cantidadVuelos")
        localStorage.removeItem("cantidadReservas")
        localStorage.removeItem("ganancias")
        navigate("/estadisticas")
    }

    return(
        <main>
            <html>
                <button onClick={Atras}>Retornar</button>
                <div className="Info">
                    <h2>Datos actuales de la aerolinea {vuelo.aerolinea}</h2>
                    <h3>Cantidad de vuelos disponibles de la aerolinea: {vuelo.cantidad}</h3>
                    <h3>Cantidad de reservas totales de la aerolinea: {vuelo.reservas}</h3>
                    <h3>Ganancias actuales de la aerolinea: {vuelo.ganancias}</h3>
                </div>
            </html>
        </main>
    )
}