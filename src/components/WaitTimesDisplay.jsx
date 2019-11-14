import React, { Component } from 'react';

class WaitTimesDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waitTimeList: []
    }

  }

  



  componentDidMount() {
    this.props.updateWaitList();
  }

  componentDidUpdate() {

  }

  
  
  render() {
    return ( 
      <div>
        {/* // allows input of only numbers with max length 3; tel stands for telephone number; used for mobile */}
            <input type="number" name="WaitTime" placeholder="enter wait time in minutes" onChange={this.props.setWaitTime}></input>
            <input type="button" onClick={this.props.addWaitTime} value="Add Wait Time"></input>

        {/* render wait times pulled from sql database */}
            <div>
              Most Recent Wait Times
              {this.props.venueWaitTimeList}
            </div>
      </div>
     );
  }
}
 
export default WaitTimesDisplay;