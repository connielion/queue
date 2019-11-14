import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
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
        <div className="waitTime-inputs fs-18">
          {/* <input type="button" onClick={this.props.addWaitTime} value="Add Wait Time"></input>	          
           */}
          <InputGroup className="mb-3 wait-time-input-group">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">Wait Time(minutes)</InputGroup.Text>
            </InputGroup.Prepend>
            {/* Wait time input */}
            <FormControl
              type="number"
              name="WaitTime"
              onChange={this.props.setWaitTime}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          {/* <input type="number" name="WaitTime" placeholder="Time in minutes" onChange={this.props.setWaitTime}></input> */}
          {/* <input type="button" onClick={this.props.addWaitTime} value="Add Wait Time"></input> */}
          <Button onClick={this.props.addWaitTime} variant="primary" >Add Wait Time</Button>
        </div>

        {/* render wait times pulled from sql database */}
        <div>
          <h3>Most Recent Wait Times</h3>
          {this.props.venueWaitTimeList}
        </div>
      </div >
    );
  }
}

export default WaitTimesDisplay;