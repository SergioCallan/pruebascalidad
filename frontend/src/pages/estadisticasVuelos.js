import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function EstadisticasVuelos(){
    const[aerolineaBusqueda, setAerolineaBusqueda]= useState('')
    const [listavuelos, setListavuelos]=useState('')
    const navigate= useNavigate()
    useEffect(()=>{
        const adminEmail= localStorage.getItem("admin")
        if(adminEmail==null){
            navigate('/loginadmin')
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
    const vuelos= Object.values(listavuelos)
    const comprobarCambiosAerolinea = (event) => {
        setAerolineaBusqueda(event.target.value)
    }

    const stats= async (e) =>{
        e.preventDefault();
        try{
            const url1= "http://localhost:9000/api/aerolinea/"+aerolineaBusqueda+"#"
            const response1= await axios.get(url1)
            const aeros= Object.values(response1.data)
            const cantVuelos= aeros.length
            if(cantVuelos>0){
                const url2= "http://localhost:9000/api/reservas/"+aerolineaBusqueda+"#"
                const response2= await axios.get(url2)
                const reservas= Object.values(response2.data)
                console.log(response2.data)
                let i=0
                let ganancias=0
                while(reservas[i]!=null){
                    ganancias+=reservas[i].precio
                    i++
                }
                localStorage.setItem("aerolinea", aerolineaBusqueda)
                localStorage.setItem("cantidadVuelos", cantVuelos)
                localStorage.setItem("cantidadReservas", i)
                localStorage.setItem("ganancias", ganancias)
                navigate("/mostrarestadisticas")
            }
            else{
                alert("No existen vuelos con esa aerolinea en el registro")
            }
        }catch(error){
            console.log("Respuesta del servidor: "+error)
        }
        
        setAerolineaBusqueda('')
    }

    const Atras=()=>{
        navigate("/menuadmin")
    }

    return (
        <main>
            <html>
                <button onClick={Atras}>Retornar</button>
                <h1>Lista de aerolineas que actualmente se encuentran registradas en FlyEasy</h1>
                <div className="mostrarAerolineas">
                    <table id="listaAerolineas">
                        <thead>
                            <tr>
                                <th>Aerolínea</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Precio de la reserva</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vuelos.map((datos)=>(
                                    <tr key={datos}>
                                        <td>{datos.aerolinea}</td>
                                        <td>{datos.origen}</td>
                                        <td>{datos.destino}</td>
                                        <td>{datos.precio}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Elija la aerolinea en la que esta interesado</h3>
                    <input type="text" name="aerolinea" placeholder="Nombre de la aerolinea" onChange={comprobarCambiosAerolinea} required value={aerolineaBusqueda}></input><br></br><br></br>
                    <button id="btnReserve" onClick={stats}>Calcular ingresos</button>
                </div>
            </html>
        </main>
    )
}