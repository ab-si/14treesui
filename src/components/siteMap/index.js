import React, { Component } from 'react';
import {Map, Polygon, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '50%'
};
const triangleCoords = [
    {lat: 18.92388548178382, lng: 73.77198156977873},
    {lat: 18.92394548251714, lng: 73.772254066293},
    {lat: 18.92456612907523, lng: 73.77250940896293},
    {lat: 18.92451636243068, lng: 73.77310734998903},
    {lat: 18.92410103480095, lng: 73.77351102467631},
    {lat: 18.92438629234444, lng: 73.77423369992533},
    {lat: 18.92570084213888, lng: 73.77352011507531},
    {lat: 18.92600029548707, lng: 73.77345136906712},
    {lat: 18.92609001880532, lng: 73.77465867426133},
    {lat: 18.92921738105332, lng: 73.77494262525147},
    {lat: 18.92983007114656, lng: 73.77419310992801},
    {lat: 18.92938220171607, lng: 73.77355060621593},
    {lat: 18.92648810034929, lng: 73.77088393666078},
    {lat: 18.92642050830927, lng: 73.77176739452904},
    {lat: 18.92388548178382, lng: 73.77198156977873}
];
const coords = { lat: 18.92600070324609, lng: 73.7733361321322 };
class SiteMap extends Component {
    
    render() {
      return (
        <Map google={this.props.google}
            initialCenter={coords}
            defaultOptions={{}}
            style={{width: '100%', height: '100%', position: 'relative'}}
            className={'map'}
            zoom={17}>
            <Polygon
                paths={triangleCoords}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor="#0000FF"
                fillOpacity={0.35} />
        </Map>
      );
    }
  }
  
SiteMap = GoogleApiWrapper({
    apiKey: 'AIzaSyBUz3z2_uM7TXu2k4BAetY9HJ8vahAYFLQ'
})(SiteMap);

export default SiteMap;