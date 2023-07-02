import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import UserHeader from "../components/userHeader"
import axios from "axios"

export default function Historial(){
    const navigate= useNavigate()
    useEffect(()=>{
        const userEmail= localStorage.getItem("data")
        if(userEmail==null){
            localStorage.clear()
            navigate('/mainpage')
        }
    })
    const reserva={
        email: localStorage.getItem("data"),
        aerolinea: localStorage.getItem("aerolineaReserva"),
        origen: localStorage.getItem("origenReserva"),
        destino: localStorage.getItem("destinoReserva"),
        precio: localStorage.getItem("precioReserva")
    }
    const id= localStorage.getItem("idReserva")
    const CancelarReserva= async()=>{
        const url= "http://localhost:9000/api/cancelar/"+id+"#"
        const response= await axios.delete(url)
        console.log(response)
        localStorage.removeItem("idReserva")
        localStorage.removeItem("aerolineaReserva")
        localStorage.removeItem("origenReserva")
        localStorage.removeItem("destinoReserva")
        localStorage.removeItem("precioReserva")
        alert("Se ha cancelado la reserva")
        navigate("/menuuser")
    }

    const Atras=()=>{
        navigate("/reservas")
    }

    return(
        <main>
            <html>
                <UserHeader/>
                <button onClick={Atras}>Atras</button>
                <h3>Datos de la reserva seleccionada</h3>
                <div className="DatosdelaReserva">
                    <h3>Aerolinea: {reserva.aerolinea}</h3>
                    <h3>Lugar de partida: {reserva.origen}</h3>
                    <h3>Destino: {reserva.destino}</h3>
                    <h3>Precio: {reserva.precio}</h3>
                </div>
                <h3>Si desea cancelar la operación, click aquí</h3>
                <button id="Cancelar" onClick={CancelarReserva}>Cancelar</button>
            </html>
        </main>
    )
}