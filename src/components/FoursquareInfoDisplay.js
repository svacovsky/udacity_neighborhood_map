import React from 'react';

export class FoursquareInfoDisplay extends React.Component {

  state = {
    name:'',
    address:''
  }

  componentWillMount(){
    console.log("Four Square will mount");
    this.setState({
      name: this.props.name,
      address: this.props.address
    });
  }

  componentWillReceiveProps(nextProps){
    console.log("Four Square info props received");
    this.setState({
      name: this.nextProps.name,
      address: this.nextProps.address
    })
  }

  render() {
    console.log("Rendering InfoDisplay");
    return (
      <div>
        <p>{this.state.name}</p>
        <p>{this.state.address}</p>
      </div>
    )
  }
}

export default FoursquareInfoDisplay
