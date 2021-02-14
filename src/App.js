
import { Card, CardContent, Tab } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import LineGraph from './components/LineGraph';
import Map from './components/Map';
import Stats from './components/Stats';
import Table from './components/Table'
import { sortedData } from './sortedData';
import 'leaflet/dist/leaflet.css'
function App() {

  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState('worldwide');
  const[countryInfo,setCountryInfo]=useState([]);
  const [tableData,setTableData]=useState([]);
  const [checked,setChecked]=useState(false);
  const [mapCenter,setMapCenter]=useState({
    lat:34.80746,lng:-40.4796
  })
  const[mapZoom,setZoom]=useState(3)

  const toggleChecked=(toogleChecked)=>{
      setChecked(prev=>!prev)
  }

useEffect(()=>{
  const color=checked===false?"#ede6e6":"#292929";
document.body.style.backgroundColor=color
},[checked])

useEffect(()=>{
 fetch("https://disease.sh/v3/covid-19/all")
 .then(response=>response.json())
 .then(data=>setCountryInfo(data))

},[])


  useEffect(() => {
      const getCountries=async()=>{
          await fetch("https://disease.sh/v3/covid-19/countries")
          .then(response=>response.json())
          .then(data=>{
              const countries=data.map(country=>(
              {
                  name:country.country,
                  value:country.countryInfo.iso2
              }
              ))
              const sortData=sortedData(data);
              setTableData(sortData)
              setCountries(countries);
          })
      }
getCountries();
  }, [])

  
 
 const onCountryChange =async (event)=>{
  event.preventDefault();
  const countryCode=event.target.value
  
  const url=countryCode==='worldwide'?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`;
  await fetch(url).then(response=>response.json())
  .then(data=>{
    setCountry(countryCode);
   setCountryInfo(data)
   setMapCenter({lat:data.countryInfo.lat,lng:data.countryInfo.long})
   setZoom(4)
    })
   }

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
    <Header country={country} countries={countries} onCountryChange={(event)=>onCountryChange(event)} 
    checked={checked} toggleChecked={toggleChecked}/>
    </div>
    <div className="app__stats">
    <Stats title='Coronavirus Cases' count={countryInfo.todayCases} totalCount={countryInfo.cases}/>
    <Stats title='Coronavirus Cases' count={countryInfo.todayRecovered} totalCount={countryInfo.recovered}/>
    <Stats title='Coronavirus Cases' count={countryInfo.todayDeaths} totalCount={countryInfo.deaths}/>
    </div>
    <Map center={mapCenter} zoom={mapZoom}/>
    </div>
    <Card className="app__right">
      <CardContent>
        <h3>Live Cases By Countries</h3>
        <Table countries={tableData}/>
        <h3>WorldWide Cases</h3>
        <LineGraph/>
      </CardContent>
  </Card>
   </div>
  );
}

export default App;
