import React from 'react';

export class List extends React.Component {

  state = {
    markers:[]
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    console.log("List Will mount");
    this.setState({
      markers: this.props.markers
    });
  }

  componentWillReceiveProps(nextProps){
    console.log("List Will receive Props");
    console.log(nextProps);
    this.setState({
      markers: nextProps.markers
    });
  }

  onFilterChange = (e) => {
    console.log("list onFilterChange")
    this.props.onFilterChange(e);
  }

  onClick = (e) => {
    console.log("List Element Clicked");
    this.props.onListElementClick(e.currentTarget.dataset.id);
  }



  render() {
    console.log("List Rendering");
    const markerList = this.state.markers.map((marker,index) => {
      const listClassNames = "list-group-item " + (marker.selected ? "active" : "");
      return (
        <li className={listClassNames} key={index} tabindex={index+2} onClick={this.onClick} data-id={marker.venue_id}>{marker.name}</li>
      );
    });
    return (
      <div className="col-lg-2 col-12 order-last order-lg-first list-div">
        <form>
          <div className="form-row filter-padding">
            <div className="col">
              <input type="text" className="form-control filter-padding" placeholder="Filter" tabindex={1}  onChange={this.onFilterChange} />
            </div>
          </div>
        </form>
        <ul className="list-group">
          {markerList}
        </ul>
        <h1>This project utilizes Foursquare.
        </h1>
      </div>
    )
  }
}

export default List
