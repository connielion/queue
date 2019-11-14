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

  updateWaitList() {
    // fetch request to display wait times
    const body = {
      venueId: this.props.venueId
    }
    fetch('/dbRouter/getWaitTimes', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        const waitTimes = [];
        for (let i = 0; i <= data.length; i++) {
          if (data[i]) {
            let time = data[i]["timestamp"].split(/[- : T .]/);
            let timestamp = new Date(Date.UTC(time[0], time[1] - 1, time[2], time[3], time[4], time[5]))
            console.log(timestamp);
            waitTimes.push(<div key={i}>{data[i]["waittime"]} minutes - last updated {`${timestamp}`}</div>)
          }
        }
        this.setState({
          waitTimeList: waitTimes
        })
      })
      .catch((err) => {
        console.log(`${err}: getWaitTime func err when getting wait time`)
      })
  }


  componentDidUpdate() {
    this.updateWaitList();
  }

  componentDidMount() {
    this.updateWaitList();
  }


  render() {
    return (
      <div>
        {/* // allows input of only numbers with max length 3; tel stands for telephone number; used for mobile */}
        <div className="waitTime-inputs">
          <InputGroup className="mb-3">
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
          <Button onClick={this.props.addWaitTime} variant="primary">Add Wait Time</Button>
        </div>
        {/* render wait times pulled from sql database */}
        <div>
          Most Recent Wait Times
              {this.state.waitTimeList}
        </div>
      </div>
    );
  }
}

export default WaitTimesDisplay;