import React, {useEffect, useState} from "react"
import axios from "axios"

export default function EstadisticasVuelos(){
    const[aerolineaBusqueda, setAerolineaBusqueda]= useState('')
    const [listavuelos, setListavuelos]=useState('')
    const [vueloA, setvueloA]=useState('')
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
    const comprobarCambiosAerolinea = (event) => {
        setAerolineaBusqueda(event.target.value)
    }
    const vuelos= Object.values(listavuelos)

    const stats= async (e) =>{
        e.preventDefault();
        const index= vuelos.findIndex(i=>i.aerolinea==aerolineaBusqueda)
        const aerolineaA= vuelos[index].aerolinea
        let ganancias=0;
        try{
            const url= 'http://localhost:9000/api/calculate/'+aerolineaA+'#'
            const {response} = await axios.get(url);
            setvueloA(response)
            const precios= Object.values(vueloA)
            precios.forEach(function(a){ganancias+=a})
            alert(ganancias)
        }catch(error){
            console.error('Error al enviar la solicitud:', error);
        }
    }
    
    return (
        <main>
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
        </main>
    )
}