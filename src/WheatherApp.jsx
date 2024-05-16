import { useState } from "react"

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_key = '9a43d4ee440cdb285cd10e7ce096bca8'
    const difKelvin = 273.15
    

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const  handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
    }

    const fetchClima = async() => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_key}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.error('Ocurrio el siguiente problema: ', error)
        }
    }





  return (
    <div className="container">
        <h1>Aplicacion de clima</h1>

        <form onSubmit={handleSubmit}>
            <input type="text" value={ciudad} onChange={handleCambioCiudad} />
            <button type="submit">BUSCAR</button>
        </form>

        

        {
            dataClima && (

                <div className="card" >
                    <div className="image">
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}  alt="..."/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{dataClima.name}</h5>
                        <p className="card-text">Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                        <p>Condicion meteorologica: {dataClima.weather[0].description}</p>
                    </div>
                    
                    
                </div>
            )
        }

    </div>
  )
}
