import React, { CSSProperties, useState } from 'react';
import PropTypes, { InferProps } from "prop-types";

import { Container, Grid, Header, Message, Segment, Tab, Button, Icon, Sidebar, Input } from 'semantic-ui-react';


export default function Location ({name, vaccination, possible_weather, mean_temperature}: InferProps<typeof Location.propTypes>) {

    return (
        <Segment>
            <h2>{name}</h2>
            <p>Possible weather on this date: {possible_weather}</p>
            <p>Temperature in this area last year: {mean_temperature}</p>
            <p>Percentage of vaccined people: {vaccination}%</p>
        </Segment>
    );
}
 
Location.propTypes = {
    name: PropTypes.string.isRequired,
    vaccination: PropTypes.number.isRequired,
    possible_weather: PropTypes.string.isRequired,
    mean_temperature: PropTypes.number.isRequired
}