import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './Stats.css'

function Stats({title,count,totalCount}) {
    return (
        <Card>
            <CardContent>
            <Typography color="textSecondary">{title}</Typography>
            <Typography color="textSecondary">+ {count}</Typography>
            <Typography color="textSecondary">{totalCount} total</Typography>
           </CardContent>
        </Card>
    )
}

export default Stats
