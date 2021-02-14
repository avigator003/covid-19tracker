import React, { useEffect, useState } from 'react'

function LineGraph() {

    const [data,setData]=useState({});

    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
        })
    },[])


    return (
        <div className="graph">
            I m a Graph
        </div>
    )
}

export default LineGraph 
