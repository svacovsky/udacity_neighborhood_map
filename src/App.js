import React, { Component } from 'react';
import MapContainer from './components/MapContainer.js';
import List from './components/List.js';
import './App.css';
import './css/custom.css';

class App extends Component {
  state={
    markers:[
      {
        name: 'Port St. Lucie Botanical Gardens',
        pos: {lat:27.270223,lng:-80.319797},
        venue_id:'4d581f3ed1a08cfab2ef0bba',
        selected: false,
        icon: {url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
      },
      {
        name: 'Jensen Beach Park',
        pos: {lat:27.264127,lng:-80.196050},
        venue_id:'504ce29de4b0273937e778cb',
        selected: false,
        icon: {url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
      },
      {
        name: 'Bathtub Reef Beach',
        pos: {lat:27.193156,lng:-80.160691},
        venue_id:'4c6701b9e75ac928464df9da',
        selected: false,
        icon: {url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
      },
      {
        name: 'Tom Hooper Family Park',
        pos: {lat:27.272682,lng:-80.318376},
        venue_id:'4f46871fe4b03de98956b6f7',
        selected: false,
        icon: {url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
      },
      {
        name: 'Lyngate Park',
        pos: {lat:27.286382,lng:-80.309017},
        venue_id:'4bd77085885595218f9287a7',
        selected: false,
        icon: {url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
      }
    ],
    filter:''
  }


  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onListElementClick = this.onListElementClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    console.log("onMarkerClick");
    this.setState({
      markers: this.state.markers.map((m) => {
        if(marker.venue_id === m.venue_id){
          m.selected = true;
          m.icon = {url:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'};
        }else{
          m.selected = false;
          m.icon = {url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'};
        }
        return m;
      }),
      filter:''
    });
  }

  onMapClick = () => {
    console.log("onMapClick");
    this.setState({
      markers: this.state.markers.map((m) => {
        m.selected = false;
        m.icon = {url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'};
        return m;
      }),
      filter:''
    });
  }
  onFilterChange = (e) => {
    console.log("onFilterChange")
    this.setState({
      markers: this.state.markers.map((m) => {
        m.selected = false;
        m.icon = {url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'};
        return m;
      }),
      filter: e.target.value
    });
  }

  onListElementClick = (id) => {
    this.setState({
      markers: this.state.markers.map((m) => {
        if(id === m.venue_id){
          m.selected = true;
          m.icon = {url:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'};
        }else{
          m.selected = false;
          m.icon = {url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'};
        }
        return m;
      }),
      filter:this.state.filter
    });
  }

  render() {
    console.log("Rendering App");
    return (
      <div className="App container-fluid">
        <div className="row equal">
          <List markers={this.state.markers.filter((marker) => (marker.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0))}
            onFilterChange={this.onFilterChange} onListElementClick={this.onListElementClick}/>
          <MapContainer className="col-sm" markers={this.state.markers.filter((marker) => (marker.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0))}
            onMarkerClick={this.onMarkerClick} onMapClick={this.onMapClick}/>
        </div>
      </div>
    );
  }
}

export default App;
