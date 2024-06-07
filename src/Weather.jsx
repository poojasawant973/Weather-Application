import React, { useEffect, useState } from 'react';

function Weather() {
    const [city, setCity] = useState("Pune");
    const [finalData, setFinalData] = useState({});
    const [weatherIcon, setWeatherIcon] = useState("bi-cloud-sun");

    async function getWeatherData() {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8941d699d7e1756a2e1328dc136d1ad8`;
            const resp = await fetch(url);
            const result = await resp.json(); 

            if (!result || !result.main || !result.weather || !result.weather[0]) {
                console.error('Invalid or incomplete API response:', result);
                return;
            }

            const { temp, feels_like, pressure, humidity } = result.main;
            const { name } = result;
            const { speed } = result.wind;
            const { main, description } = result.weather[0];
            const { country } = result.sys;

            if (main === 'Clouds') {
                setWeatherIcon("bi-clouds");
            } else if (main === 'Haze') {
                setWeatherIcon("bi-cloud-haze2");
            } else {
                setWeatherIcon("bi-cloud-sun");
            }

            setFinalData({
                temp,
                feels_like,
                humidity,
                pressure,
                name,
                speed,
                main,
                description,
                country,
            });

            setCity(""); 
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    console.log(finalData);

    useEffect(() => {
        getWeatherData();
    }, []);
    

    return (
        <div className='container text-center'>
            <div className='row'>
                <div className='col-md-6 mx-auto'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='city...'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button onClick={getWeatherData} className='btn btn-primary' id='searchbtn'>
                        Search
                    </button>
                    <div className='row'>
                        <div className='container text-center'>
                            <h1>
                                <i id='wicon' className={`bi ${weatherIcon}`}></i>
                            </h1>
                            <h3>{finalData.description}</h3> {/* Display weather description */}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h2> {finalData.temp} &deg;</h2>
                            <p>Feels like - {finalData.feels_like} </p>
                        </div>
                        <div className='col-md-7'>
                            <h4> {new Date().toLocaleTimeString()} </h4>
                            <h4>
                                {finalData.name} <small> {finalData.country} </small>
                            </h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <h4> Speed </h4>
                            <h5> {finalData.speed} </h5>
                        </div>
                        <div className='col-md-3'>
                            <h4> Pressure </h4>
                            <h5>{finalData.pressure}</h5>
                        </div>
                        <div className='col-md-3'>
                            <h4> Humidity </h4>
                            <h5> {finalData.humidity} </h5>
                        </div>
                        <div className='col-md-3'>
                            <h4> Atmosphere </h4>
                            <h5>{finalData.main}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
