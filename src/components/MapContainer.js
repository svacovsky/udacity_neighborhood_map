import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import FoursquareInfoDisplay from './FoursquareInfoDisplay.js'
import * as FoursquareAPI from '../FoursquareAPI.js'

export class MapContainer extends React.Component {
  state={
    markers:[]
  }

  componentWillMount(){
    console.log("MapContainer Will Mount");
    this.updateStateFromProps(this.props);
  }

  componentDidMount(){
    console.log("MapContainer Did Mount");
  }

  componentWillReceiveProps(nextProps){
    console.log("MapContainer will receive props");
    this.updateStateFromProps(nextProps);
  }

  componentDidCatch(err, info) {
    console.log("Errored!");
    this.setState({ hasError: true });
  }

  updateStateFromProps = (props) => {
    const activeMarkers = props.markers.filter(m => m.selected);
    const activeMarker = (activeMarkers.length === 1 ? activeMarkers[0] : {});
    if(!(Object.keys(activeMarker).length === 0 && activeMarker.constructor === Object)){
      FoursquareAPI.get(activeMarker.venue_id).then((data) => {
        if(data.meta.code === '200'){
          this.setState({
            activeMarker: activeMarker,
            showingInfoWindow: true,
            markers: props.markers,
            marker_info_name: data.response.venue.name,
            marker_info_address: data.response.venue.location.address
          })
        }else{
          this.setState({
            activeMarker: activeMarker,
            showingInfoWindow: true,
            markers: props.markers,
            marker_info_name: 'Error',
            marker_info_address: 'Unable to connect to FoursquareAPI'
          })
        }
      })
    }else{
      this.setState({
        markers:props.markers,
        marker_info_name: '',
        marker_info_address: '',
        activeMarker:{},
        showingInfoWindow: false
      });
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.props.onMarkerClick(props,marker,e);
  }

  onMapClick = () => {
    this.props.onMapClick();
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        markers: this.state.markers,
        marker_info_name: '',
        marker_info_address: ''
      })
    }
  }

  onMapReady = (a,s,d,f) =>{
    console.log("Map Ready");
    console.log(a);
    console.log(s);
    console.log(d);
    console.log(f);
  }

  render() {
    console.log("Rendering Map Container");
    if(this.state.hasError){
      return (<p>Google maps failed to load...</p>);
    }
    return (
        <Map aria-label="Map" className="col-lg-10 col-12 map-container" google={this.props.google}
          initialCenter={{lat:27.270223, lng:-80.319797}}
          zoom={12}
          onReady={this.onMapReady}
          onClick={this.onMapClick}
          >
          {this.state.markers.map((marker, index) => {
            return (<Marker key={index} onClick={this.onMarkerClick}
                            name={marker.name} title={marker.name} venue_id={marker.venue_id}
                            position={marker.pos} selected={marker.selected} icon={marker.icon} />)
          })}

          <InfoWindow
            position={this.state.activeMarker.pos}
            pixelOffset={{width:0, height:-30}}
            visible={this.state.showingInfoWindow}>
            <FoursquareInfoDisplay name={this.state.marker_info_name} address={this.state.marker_info_address} />
          </InfoWindow>

        </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCk4Efg24JJ1gJmBecBu_ATgz_R-5HEBfo'
})(MapContainer)
