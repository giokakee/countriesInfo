import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import axios from 'axios'




const App = () => {
  const [country, setCountry]= useState('')
  const [name, setName] = useState([])
  const [flag, setFlag] = useState('')
  const [capital, setCapital] = useState('')
  const [population, setPopulation] = useState('')
  const [languages, setLanguages]= useState([])
  const [bool, setBool] = useState(4)
  const [weather, setWeather] = useState([])
  const [weatherImg, setWeatherImg] = useState('')
  const [wind, setWind]= useState('')
  const [windDirection, setWindDirection]= useState('')


window.onload = () => {
  axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(res => {
  let num = Math.floor(Math.random()* res.data.length)
  let forFilterName = res.data[num].name
  let filtered = res.data.filter((filt) => {
    return(
      filt.name === forFilterName
    )
  })
    setBool(1)
    setName(filtered.map(mp=>mp.name));
    setFlag(filtered.map(mp=>mp.flag));
    setCapital(filtered.map(mp=>mp.capital));
    setPopulation(filtered.map(mp=>mp.population));
    let langs = filtered.map(mp => mp.languages);
    setLanguages(langs[0].map(mp=> mp.name));
    axios
    .get(`https://api.weatherapi.com/v1/current.json?key=3b4b28f5adc74f5ea6895442212202&q=${filtered.map(mp=>mp.capital)}`)
    .then(res => {
      setWeather({temperature: res.data.current.temp_c})
      setWeatherImg(res.data.current.condition.icon)
      setWind(res.data.current.wind_mph)
      setWindDirection(res.data.current.wind_dir)
    })
  })
}
 





  

  let show = () => {
    axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(res => {
    let filtered = res.data.filter((filt) => {
      return(
        filt.name.toLowerCase().indexOf(country.toLowerCase()) >=0
      )
    })
    if(filtered.length > 0 && filtered.length<2) {
      setBool(1)
      setName(filtered.map(mp=>mp.name));
      setFlag(filtered.map(mp=>mp.flag));
      setCapital(filtered.map(mp=>mp.capital));
      setPopulation(filtered.map(mp=>mp.population));
      let langs = filtered.map(mp => mp.languages);
      setLanguages(langs[0].map(mp=> mp.name));
      axios
      .get(`https://api.weatherapi.com/v1/current.json?key=3b4b28f5adc74f5ea6895442212202&q=${filtered.map(mp=>mp.capital)}`)
      .then(res => {
        setWeather({temperature: res.data.current.temp_c})
        setWeatherImg(res.data.current.condition.icon)
        setWind(res.data.current.wind_mph)
        setWindDirection(res.data.current.wind_dir)
      })


      setCountry('');
    }else if(filtered.length > 1){
        setBool(2);
        setName(filtered.map(mp => mp.name));
    }else{
      setBool(0);
    }
  })
  }
let showFiltered = (e) => {
  axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(res => {
    let filtered = res.data.filter((filt) => {
      return(
        filt.name.toLowerCase() === e.target.accessKey.toLowerCase()
      )
    })
      setBool(1)
      setName(filtered.map(mp=>mp.name));
      setFlag(filtered.map(mp=>mp.flag));
      setCapital(filtered.map(mp=>mp.capital));
      setPopulation(filtered.map(mp=>mp.population));
      let langs = filtered.map(mp => mp.languages);
      setLanguages(langs[0].map(mp=> mp.name));
      axios
      .get(`https://api.weatherapi.com/v1/current.json?key=3b4b28f5adc74f5ea6895442212202&q=${filtered.map(mp=>mp.capital)}`)
      .then(res => {
        setWeather({temperature: res.data.current.temp_c})
        setWeatherImg(res.data.current.condition.icon)
        setWind(res.data.current.wind_mph)
        setWindDirection(res.data.current.wind_dir)
      })

      setCountry('');
      setBool(3)
  })
}

 

let countryChange = (event) => {
  setCountry(event.target.value);
}



  return(
    <div id='div'>
      <div id='inputDiv'>
         <p>find countries</p>
           <input className='input' placeholder='enter the country name' value = {country} onChange={countryChange} ></input>
          <button className='btn btn-primary' onClick={show}>search</button>
      </div>    
 <div className='countriesDiv'>   
 {
bool == 1?
    <div className='bool1Div1'>
        <div className='elem1'>
             <img id='img' src={flag}/>
          </div>

           <div className='elem2'>
              <p className='header' id='name'>{name}</p>
                 <p><strong>Capital</strong>: {capital}</p>
                 <p><strong>Population</strong>: {population}</p>
           </div>

           <div className='elem3'>
                    <p className='header'>Spoken Languages</p>
               <ul>
                   {languages.map((mp,index) => {
                      return(
                      <li key={index}><strong>{mp}</strong></li>
                     )
                    })}
               </ul>
          </div>
         
            <div className='elem4'>
                 <p className='header'>Weather in {capital}</p>
                  <p><strong>temperature</strong>: {weather.temperature} Celsius</p>
                <img src={weatherImg} />
            <p><strong>Wind</strong>: {wind}mph <strong>Direction</strong>: {windDirection}</p>
         </div>
    </div> 
    
 :bool == 2?
       <div className='bool2Div'>
          <ul>
            <h1>list of countries</h1>
                 {name.map((mp, index) => {
                    return(
                      <div id='filteredDiv'>
                         <div id='filteredLiDiv'>
                            <li  key={index}>{mp}</li>
                          </div>
                         <div id='filteredButtonDiv'>
                            <button id='filteredButton' className='btn btn-info' accessKey={mp} key={index}   onClick={showFiltered}>show</button>
                         </div>
                      </div>
                    )
                   })}
           </ul>
       </div>
  :bool==3? 
  <div className='bool1Div'>
              <div className='elem1'>
                   <img id='img' src={flag}/>
                </div>

                 <div className='elem2'>
                     <p className='header' id='name'>{name}</p>
                      <p><strong>Capital</strong>: {capital}</p>
                    <p><strong>Population</strong>: {population}</p>
                  </div>

          <div className='elem3'>
              <p className='header'>Spoken Languages</p>
                <ul>
                  {languages.map((mp,index) => {
                     return(
                     <li key={index}><strong>{mp}</strong></li>
                    )
                   })}
              </ul>
           </div>
   
        <div className='elem4'>
           <p className='header'>Weather in {capital}</p>
            <p><strong>temperature</strong>: {weather.temperature} Celsius</p>
            <img src={weatherImg} />
          <p><strong>Wind</strong>: {wind}mph <strong>Direction</strong>: {windDirection}</p>
       </div>
</div> 

  :bool==4? 
  <div className='bool1Div'>
  <div className='elem1'>
       <img id='img' src={flag}/>
    </div>

     <div className='elem2'>
         <p className='header' id='name'>{name}</p>
          <p><strong>Capital</strong>: {capital}</p>
        <p><strong>Population</strong>: {population}</p>
      </div>

                 <div className='elem3'>
                   <p className='header'>Spoken Languages</p>
                     <ul>
                       {languages.map((mp,index) => {
                          return(
                          <li key={index}><strong>{mp}</strong></li>
                         )
                        })}
                   </ul>
                 </div>

                      <div className='elem4'>
                          <p className='header'>Weather in {capital}</p>
                           <p><strong>temperature</strong>: {weather.temperature} Celsius</p>
                        <img src={weatherImg} />
                       <p><strong>Wind</strong>: {wind}mph </p> <br />
                     <p><strong>Direction</strong>: {windDirection}</p>
                     </div>
                     
                 </div> 
     
  : console.log('araferi ar gamova aqedan.')}
 </div>
    </div>
  )
}

export default App;