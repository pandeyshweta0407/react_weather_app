import React, { useEffect, useState } from 'react'
import './WeatherApp.css';
import search_icon from '../Assests/search.png';
import clear_icon from '../Assests/clear.png'
import cloud_icon from '../Assests/cloud.png'
import drizzle_icon from '../Assests/drizzle.png'
import rain_icon from '../Assests/rain.png'
import snow_icon from '../Assests/snow.png'
import wind_icon from '../Assests/wind.png'
import humidity_icon from '../Assests/humidity.png'
import axios from 'axios';

const WeatherApp = () => {

    const [data , setData] = useState({
      celcius : 0,
      name : '',
      humidity : 0,
      speed : 0, 
      image: ''
    })

    const [name , setName ] = useState(''); 
    const [error , setError ] = useState(''); 

     const hanbleClick = () =>{
        if(name !==""){
          let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ed17d1439b9cae3a3b2201e6985e3970&units=metric`
          axios.get(apiurl)
          .then(res => {
            // console.log(res.data)
            let imagePath = '';
            if(res.data.weather[0].main === "Clouds"){
              imagePath= cloud_icon;
            }else if(res.data.weather[0].main === "Clear"){
              imagePath= clear_icon;
            }else if(res.data.weather[0].main === "Rain"){
              imagePath= rain_icon;
            }else if(res.data.weather[0].main === "Drizzle"){
              imagePath= drizzle_icon;
            }else if(res.data.weather[0].main === "Snow"){
              imagePath = snow_icon ;
            }   else{
              imagePath= cloud_icon;
            } 
            setData({...data, celcius: res.data.main.temp  , name : res.data.name , humidity:res.data.main.humidity , speed : res.data.wind.speed , image : imagePath  })
            setError('')
          })
          .catch( err => {
            if(err.response.status === 404){
                 setError("Invalid City Name")
            }else{
              setError('')
            }
            console.log(err)
        
        }); 
        }
     } 
   


  return (
    <div className = 'container'  >
       <div className='top-bar'>
        <input type='text' className='cityInput'  placeholder='Enter city name' onChange={e=>setName(e.target.value)}/>
        <button className="search-icon">
          <img src={search_icon} alt=""  onClick={hanbleClick} />
        </button>
       </div>

       <div className="error">
        <p>{error}</p>
       </div>

      <div className="weather-img">
         <img class="image" src={data.image} alt="" />
      </div>
      
      <div className="weather-temp">
    {Math.round(data.celcius)}°C
      </div>
      <div className="weather-location">
      {data.name}
      </div>

      <div className="data-container">
      <div className="element">
        <img class="image"  src={humidity_icon} alt="" className="icon" />
        <div className="data">
          <div className="humidity">{Math.round(data.humidity)}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>

      <div className="element">
        <img src={wind_icon} alt="" className="icon" />
        <div className="data">
          <div class="image"  className="humidity">{Math.round(data.speed)}km/h</div>
          <div className="text">Wind speed</div>
          </div>
        </div>
      </div>

      

    </div>
  )
}

export default WeatherApp
