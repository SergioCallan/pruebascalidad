import React, {useEffect} from "react"
import UserHeader from "../components/userHeader"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function ReservaVuelos(){
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
    const ReservarVuelo= async()=>{
        try{
            const url= 'http://localhost:9000/api/reserveflight'
            const response = await axios.post(url, reserva);
            console.log(response)
            alert("Reserva realizada con exito.")
            localStorage.removeItem("aerolineaReserva")
            localStorage.removeItem("origenReserva")
            localStorage.removeItem("destinoReserva")
            localStorage.removeItem("precioReserva")
            navigate("/menuuser")
        }catch(error){
            alert("Error al realizar la reserva.")
            console.log(error)
        }
    }
    const CancelarReserva= async()=>{
        localStorage.removeItem("aerolineaReserva")
        localStorage.removeItem("origenReserva")
        localStorage.removeItem("destinoReserva")
        localStorage.removeItem("precioReserva")
        alert("Se ha cancelado la reserva")
        navigate("/menuuser")
    }

    return(
        <main>
            <html>
                <UserHeader/>
                <h3>Reserva incluida en el carrito</h3>
                <h3>Confirme los datos antes de concretar la reserva: </h3>
                <div className="DatosdelaReserva">
                    <h3>{reserva.aerolinea}</h3>
                    <h3>{reserva.origen}</h3>
                    <h3>{reserva.destino}</h3>
                    <h3>{reserva.precio}</h3>
                </div>
                <h3>En caso de tener todo en orden, confirmar la compra</h3>
                <button id="Reservar" onClick={ReservarVuelo}>Reservar</button>
                <h3>Si desea cancelar la operación, click aquí</h3>
                <button id="Cancelar" onClick={CancelarReserva}>Cancelar</button>
            </html>
        </main>
    )
}