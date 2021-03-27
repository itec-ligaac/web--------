import React, { CSSProperties, useState } from 'react';
import './App.css';

import { Container, Grid, Header, Message, Segment, Tab, Button, Icon, Sidebar, Input } from 'semantic-ui-react';
import {
    DatesRangeInput
} from 'semantic-ui-calendar-react';

import Location from './components/Location'; 

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Map = ReactMapboxGl({
    accessToken: (process.env.REACT_APP_MAPBOX as string)
});

const App = () => {

    const getAvailableLocations = () => {
        return [
            {
                "name": "Iasi",
                "vaccination": 60,
                "possible_weather": "rain",
                "mean_temperature": 20 
            },
            {
                "name": "Bucharest",
                "vaccination": 60,
                "possible_weather": "rain",
                "mean_temperature": 20 
            },
            {
                "name": "Bucharest",
                "vaccination": 60,
                "possible_weather": "rain",
                "mean_temperature": 20 
            },
        ];
    }

    const [mapLocation, setMapLocation] = useState('');
    const [masterDataSource, setMasterDataSource] = useState(getAvailableLocations());
    const [dateRange, setDateRange] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [latLng, setLatLng] = useState({lat:45, lng:27});

    const getFilterLocations = (): Array<any> => {
        const all = masterDataSource;

        return all;
    };

    const computeMapLocation = (str: string) => {
        // const options = {
        //     url: `https://geocode.search.hereapi.com/v1/geocode?q=' + ${encodeURIComponent(str)}`,
        //     method: 'GET', 
        //     headers: {
        //         'Authorization': `Bearer ${process.env.REACT_APP_HERE}`
        //     },
        // }
        // axios(options).then(function (response: any) {
        //     console.log(response.data);
        // }).catch(function (err: any){
        //     console.log(err);
        // });
    };

    return (
        <div>
            <Header 
                as='h1' 
                style={{ fontSize: '10em' }} 
                content="Aplicatie" 
                subheader="Wow"
                textAlign="center"
            />
            <Container style={{ padding: '1em 0em' }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8} style={{ padding: '2em', height: 'calc(60vh + 2em)'}}>
                            <Segment>Add a date for your travel</Segment>
                            <DatesRangeInput value={dateRange} onChange={(ev, text) => setDateRange(text.value)}/>
                        </Grid.Column>
                        <Grid.Column width={8} style={{ padding: '2em',height: '60vh' }}>
                            <Map
                                style="mapbox://styles/mapbox/streets-v9"
                                containerStyle={{
                                    height: '100%',
                                    width: '100%'
                                }}
                            >
                                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                                </Layer>
                            </Map>
                            <div style={{padding:"1em"}}>
                                <Input 
                                    placeholder='Search...' 
                                    value={mapLocation} 
                                    onChange={(ev, text) => computeMapLocation(text.value)}
                                    style={{
                                        width:"100%"
                                    }}
                                />
                                {/* <GooglePlacesAutocomplete
                                    apiKey={process.env.REACT_APP_GOOGLE}
                                /> */}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment style={{ paddingLeft: '5em', paddingRight: '5em' }}>
                    {getFilterLocations().map((el:any) => <Location {...el} />)}
                </Segment>
            </Container>
        </div>
    );
}

export default App;
