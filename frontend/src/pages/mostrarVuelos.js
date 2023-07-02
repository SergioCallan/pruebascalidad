import React, {useEffect, useState} from "react"
import axios from "axios"
import UserHeader from "../components/userHeader"
import {useNavigate} from "react-router-dom"
import "./Estilos/mostrarVuelos.css"
//Importas css
export default function MostrarVuelos(){
    const [idVuelo, setIDVuelo]= useState(null)
    const [listavuelos, setListavuelos]=useState('')
    const navigate= useNavigate()
    useEffect(()=>{
        const userEmail= localStorage.getItem("data")
        if(userEmail==null){
            navigate('/mainpage')
        }
    })

    const getVuelos= async()=>{
        const url='http://localhost:9000/api/showflights/'
        const {data}= await axios.get(url)
        setListavuelos(data)
    }
    
    useEffect(()=>{
        getVuelos().catch((error)=>{
            console.log(error)
        })  
    })
    const comprobarCambiosID = (event) => {
        setIDVuelo(event.target.value)
    }
    const vuelos= Object.values(listavuelos)
    const reserveFlight= async (e) =>{
        e.preventDefault();
        try{
            const index= vuelos.findIndex(i=>i.id==idVuelo)
            const aerolinea=vuelos[index].aerolinea
            const origen= vuelos[index].origen
            const destino= vuelos[index].destino
            const precio= vuelos[index].precio
            localStorage.setItem("aerolineaReserva", aerolinea)
            localStorage.setItem("origenReserva", origen)
            localStorage.setItem("destinoReserva", destino)
            localStorage.setItem("precioReserva", precio)
            navigate("/reservaVuelos")
        }catch(error){
            console.error('Error al enviar la solicitud:', error);
        }
    }
    const Atras=()=>{
        navigate("/menuuser")
    }
    
    return (
        <main>
            <html>
                <UserHeader/>
                <button onClick={Atras}>Atras</button>
                <h1>¿Qué vuelo elegiré hoy?</h1>
                <h3>Vuelos disponibles para su reserva</h3>
                <div className="mostrarVuelos">
                    <table id="listaVuelos">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Aerolínea</th>
                                <th>Partida</th>
                                <th>Destino</th>
                                <th>Precio</th>
                                <th>Asientos disponibles</th>
                                <th>Fecha del vuelo</th>
                                <th>Hora de salida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vuelos.map((datos)=>(
                                    <tr key={datos}>
                                        <td>{datos.id}</td>
                                        <td>{datos.aerolinea}</td>
                                        <td>{datos.origen}</td>
                                        <td>{datos.destino}</td>
                                        <td>{datos.precio}</td>
                                        <td>{datos.cantidad}</td>
                                        <td>{datos.fechavuelo}</td>
                                        <td>{datos.horasalida}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Elija el vuelo que quiera reservar</h3>
                    <input type="text" name="id" placeholder="ID del vuelo a reservar" onChange={comprobarCambiosID} required value={idVuelo}></input><br></br><br></br>
                    <button id="btnReserve" onClick={reserveFlight}>Reservar</button>
                </div>
            </html>
        </main>
    )
}