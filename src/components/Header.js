import { FormControl, FormControlLabel, FormGroup, MenuItem, Select, Switch } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Header.css'

function Header({country,countries,onCountryChange,toggleChecked,checked}) {
 

    return (
        <div className="header">
            <h1 className="title"> Covid 19 Tracker
            <FormGroup>
    <FormControlLabel
    control={<Switch size="small" checked={checked} color="primary" onChange={toggleChecked} />}
    label="Dark Mode"/>
  </FormGroup>
            </h1>
            <FormControl>
                <Select variant="outlined" value={country} onChange={onCountryChange}>
                   <MenuItem value="worldwide">Worldwide</MenuItem>
                    {
                        countries.map(country=>(
                       <MenuItem value={country.value}>{country.name}</MenuItem>
                        ))
                    }
              </Select>
            </FormControl>
        </div>
    )
}

export default Header;