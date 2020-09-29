import React,{useState} from 'react';

import {fetchWeather} from './Api/fetchWeather';
import './App.css';

function App() {
    const [query,setQuery] = useState('');
    const [weather,setWeather] = useState({});
    const [error,setError] = useState({})
    const search = async(e) =>{
        if(e.key == 'Enter'){
            try{
                const data = await fetchWeather(query);
            //console.log(data);
                setWeather(data);
                setQuery('');
                setError(null);
            }catch(err){
                //console.log(err);
                if(err.response){
                    //console.log(err.response.data.message,err.response.data.cod)
                    setError(err.response.data);
                    setQuery('');
                    setWeather(null)
                }
            }
            
        }
        
    }
    let showCity;
    if(weather?.main && !(error?.message)){ 
        showCity =  <div className='city'>
            <h2 className='city-name'>
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
            </h2>
            <div className='city-temp'>
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
            </div>
            <div className='info'>
                <img className='city-icon' 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt={weather.weather[0].description}
                />
                <p>{weather.weather[0].description}</p>
            </div>
        </div>
    } else if(error.message &&!(weather?.main) ){showCity = 
        <div className='city'>
            <h2 className='city-name'>{error.message}</h2>
            <div className='city-temp'>Error code: {error.cod}</div>
        </div>
    } else {
        showCity= null
    } 
    return (
        <div className='main-container'>
            <input
                type='text'
                className='search'
                placeholder='Search Temp...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            {showCity}
        </div>
    )
}

export default App
