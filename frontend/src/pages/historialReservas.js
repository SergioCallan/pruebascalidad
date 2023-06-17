import React, {useEffect, useState} from "react"
import axios from "axios"

export default function HistorialReservas(){
    const [idReserva, setIDReserva]= useState(null)
    const [listaReservas, setListaReservas]= useState('')
    const getReservas= async()=>{
        const url='http://localhost:9000/api/showreservas/'
        const {data}= await axios.get(url)
        setListaReservas(data)
    }
    useEffect(()=>{
        getVuelos().catch((error)=>{
            console.log(error)
        })  
    })
    const reservas=Object.values(listaReservas)
    const historyReserve= async(e)=>{
        e.preventDefault();
        try{
            const useremail= localStorage.getItem('data')
            const index= reservas.findIndex(i=>i.email==useremail)
            const email= reservas[index].email
            const aerolinea= reservas[index].aerolinea
            const origen= reservas[index].origen
            const destino= reservas[index].destino
            const fechavuelo= reservas[index].fechavuelo
            const horasalida= reservas[index].horasalida
        } catch(error){
            console.error('Error al enviar la solicitud:', error);
        }
    }

    return(
        <main>
            <h1>Bienvenido a su historial de reservas</h1>
            <h3>Para ver los detalles específicos, escriba el id de su reserva</h3>
            <div className="historial">
                <table id="listahistorial">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha del vuelo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((datos)=>(
                            <tr key={datos}>
                                <th>{datos.origen}</th>
                                <th>{datos.destino}</th>
                                <th>{datos.fechavuelo}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <input type="text" name="id" placeholder="ID de la reserva a observar" onChange={comprobarCambiosID} required value={idReserva}></input><br></br><br></br>
                <button id="btnHistory" onClick={...}>Ver historial completo</button>
            </div>
        </main>
    )
}