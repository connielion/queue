import React, { Component } from 'react';
import '../css/LandingPage.css';
import CategoryContainer from './CategoryContainer.jsx';
import VenueContainer from './VenueContainer.jsx';
import LoginPage from '../components/LoginPage.jsx';
import SignUpPage from '../components/SignUpPage.jsx';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class MainContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // stateful components used for search bar and results
      location: '',
      searchInput: '',
      searchResults: [],

      // components used for map display
      latitude: '',
      longitude: '',

      // components related to selecting specific venue
      venueId: '',
      venueName: '',
      venueUrl: '',
      venueImage: '',
      venueLocation: '',
      venuePhone: '',
      venueLatitude: '',
      venueLongitude: '',
      waitTime: 0,
      venueWaitTimeList: [],
      vanuePriceRange: '',

      // components for infinite scrolling functionality
      current: 25,
      total: 50,

      // components for conditional rendering of containers
      loginPage: false,
      signupPage: false,
      homePage: true,
      categoryPage: false,
      venuePage: false,

    }

    this.loginButton = this.loginButton.bind(this);
    this.signupButton = this.signupButton.bind(this);

    this.setLocation = this.setLocation.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);
    this.search = this.search.bind(this);

    this.selectVenue = this.selectVenue.bind(this);
    this.setWaitTime = this.setWaitTime.bind(this);
    this.addWaitTime = this.addWaitTime.bind(this);
    this.updateWaitList = this.updateWaitList.bind(this);
  }

  // functions used for login and signup
  loginButton() {
    this.setState({
      loginPage: true,
      signupPage: false,
      homePage: false,
      categoryPage: false,
      venuePage: false,
    })
  }
  signupButton() {
    this.setState({
      loginPage: false,
      signupPage: true,
      homePage: false,
      categoryPage: false,
      venuePage: false,
    })
  }

  // functions used for search bar
  setLocation(event) {
    this.setState({ location: event.target.value });
  }

  setSearchInput(event) {
    this.setState({ searchInput: event.target.value });
    // console.log(this.state.searchResults)
  }

  search() {
    // console.log('THIS STATE LOCATION : ', this.state.location);
    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchInput: this.state.searchInput, location: this.state.location })
    })
      .then(response => response.json())
      .then(data => {
        const parsedData = JSON.parse(data);
        console.log('PARSEDDATA: ', parsedData);
        // console.log('introspecting the data: ', parsedData.businesses[0])

        // Coordinates used for map rendered in Category Container (List Page)
        const firstBusinessLatitude = parsedData.businesses[0].coordinates.latitude;
        const firstBusinessLongitude = parsedData.businesses[0].coordinates.longitude;



        // some businesses dont have pric range data, so iterate thru the whole thing to add key-value property
        // for unknow price with "price:?"
        // instead of cocktail icon, I will implement price range icon as marker!
        for (let i = 0; i < parsedData.businesses.length ; i++) {
          if (!parsedData.businesses[i].price) {
            parsedData.businesses[i].price = '?'
          }
        }


        // for google map icon
        for (let i = 0; i < parsedData.businesses.length ; i++) {
          if (parsedData.businesses[i].price === '?') {
            parsedData.businesses[i].icon = 'https://media.giphy.com/media/IzpTRrFaYcrSse7NLo/giphy.gif'
          } else if (parsedData.businesses[i].price === '$') {
            parsedData.businesses[i].icon = 'https://media.giphy.com/media/UtVcZEfoe26VDo70o9/giphy.gif'
          } else if (parsedData.businesses[i].price === '$$') {
            parsedData.businesses[i].icon = 'https://media.giphy.com/media/XaLM8yEodK5gi3Wurh/giphy.gif'
          } else if (parsedData.businesses[i].price === '$$$') {
            parsedData.businesses[i].icon = 'https://media.giphy.com/media/cnzaSEhQWl6jbV0XTe/giphy.gif'
          } else {
            parsedData.businesses[i].icon = 'https://media.giphy.com/media/mG8SvyUQNcd182U39m/giphy.gif'
          } 
        }

        console.log('parseddata after modification', parsedData)


        const listOfBusinesses = [];
        // console.log(parsedData.businesses.length)
        if (this.state.current <= 50) {
          for (let i = 0; i < this.state.current; i += 1) {
            
            listOfBusinesses.push({
              id: parsedData.businesses[i].id,
              name: parsedData.businesses[i].name,
              image: parsedData.businesses[i].image_url,
              location: parsedData.businesses[i].location,
              category: parsedData.businesses[i].categories[0].title,
              latitude: parsedData.businesses[i].coordinates.latitude,
              longitude: parsedData.businesses[i].coordinates.longitude,
              phone: parsedData.businesses[i].phone,
              price: parsedData.businesses[i].price,
              icon: parsedData.businesses[i].icon
            })
          }
          console.log('LIST BUSINESSES -> ', listOfBusinesses)

          // console.log('lsitofbusiness is', listOfBusinesses)

          // this.setState({ latitude: firstBusinessLatitude.toString(), longitude: firstBusinessLongitude.toString() })

          this.setState(state => {
            return {
              latitude: firstBusinessLatitude.toString(),
              longitude: firstBusinessLongitude.toString(),
              searchResults: listOfBusinesses,
              current: state.current + 5,

            }
          })
        }
      })
    this.setState({
      loginPage: false,
      signupPage: false,
      homePage: false,
      categoryPage: true,
      venuePage: false,
    })

  }

  // functions used for to select a specific venue on the category page to display on the venue page
  selectVenue(id, name, url, image, location, phone, latitude, longitude) {
    const venueId = id;
    const venueName = name;
    const venueUrl = url;
    const venueImage = image;
    const venueLocation = location;
    const venuePhone = phone;
    const venueLatitude = latitude;
    const venueLongitude = longitude;

    this.setState({
      loginPage: false,
      signupPage: false,
      homePage: false,
      categoryPage: false,
      venuePage: true,
      venueId,
      venueName,
      venueUrl,
      venueImage,
      venueLocation,
      venuePhone,
      venueLatitude,
      venueLongitude
    })
  }
  setWaitTime(event) {
    this.setState({ waitTime: event.target.value })
  }

  timeFormatter(data, waitTimes) {
    for (let i = 0; i <= data.length; i++) {
      if (data[i]) {
        let time = data[i]["timestamp"].split(/[- : T .]/);
        let timestamp = new Date(Date.UTC(time[0], time[1] - 1, time[2], time[3], time[4], time[5]))
        console.log(timestamp);
        waitTimes.push(<div key={i}>{data[i]["wait_time"]} minutes - last updated {`${timestamp}`}</div>)
      }
    }
  }

  addWaitTime() {
    // create body from the things we've saved in state through the setwaittime and selectvenue func
    const body = {
      waitTime: this.state.waitTime,
      venueId: this.state.venueId,
      venueName: this.state.venueName,
    }

    // console.log(body);
    fetch('/dbRouter/addWaitTime', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(data => {
        fetch(`/dbRouter/getWaitTimes/${this.state.venueId}`, {
          method: 'GET'
        })
          .then(res => {
            console.log("2nd fetch: ", res.clone().json());
            return res.clone().json()
            //this.setState({venueWaitTimeList: data});
          })
          .then(list => {
            console.log("List: ", list);
            const updatedWaitTimes = []
            this.timeFormatter(list, updatedWaitTimes)
            console.log("Wait times: ", updatedWaitTimes);
            this.setState({ venueWaitTimeList: updatedWaitTimes })
          })
          .catch(err => next(err));
        //this.setState({venueWaitTimeList: data})
      })
      .catch((err) => {
        console.log(`${err}: addWaitTime function error when adding wait time`)
      })
  }

  updateWaitList() {
    // fetch request to display wait times
    const venueId = this.state.venueId;

    fetch(`/dbRouter/getWaitTimes/${venueId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const waitTimes = [];
        this.timeFormatter(data, waitTimes);
        // for (let i = 0; i <= data.length; i++) {
        //   if (data[i]) {
        //     let time = data[i]["timestamp"].split(/[- : T .]/);
        //     let timestamp = new Date(Date.UTC(time[0], time[1]-1, time[2], time[3], time[4], time[5]))
        //     console.log(timestamp);
        //     waitTimes.push(<div key={i}>{data[i]["wait_time"]} minutes - last updated {`${timestamp}`}</div>)
        //   }
        this.setState({
          venueWaitTimeList: waitTimes
        })
      })
      .catch((err) => {
        console.log(`${err}: getWaitTime func err when getting wait time`)
      })
  }

  render() {
    // conditional rendering for the login page
    // let login = null;
    // if (this.state.loginPage) {
    //   login =
    //     <LoginPage
    //       signupButton={this.signupButton}
    //     />
    // }

    // conditional rendering for the signup page
    // let signup = null;
    // if (this.state.signupPage) {
    //   signup =
    //     <SignUpPage
    //       loginButton={this.loginButton}
    //     />
    // }

    // conditional rendering for the homepage; default true (shows first)
    let home = null;
    if (this.state.homePage) {
      document.body.style.background = "url('https://images.pexels.com/photos/1604200/pexels-photo-1604200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
      home =
        <Container className="main-bg">
          <Row>
            <Col>
              <div id="home-content">
                {/* // uncomment to work on login and signup functionalities
        <button onClick={this.loginButton}>Login</button> */}
                <div id="logo">
                  <img id="logo-pic" src="https://image.flaticon.com/icons/png/512/876/876569.png" />
                  <p>GraphQueue</p>
                </div>
                <section id="home-page-search-bar">
                  <input type="input" id="searchInput" placeholder="Business or Category" onChange={this.setSearchInput} required />
                  <input type="input" id="location" placeholder="Location" onChange={this.setLocation} required />
                  <input type="button" id="searchButton" onClick={this.search} />
                </section>
              </div>
            </Col>
          </Row>
        </Container>

    }

    // conditional rendering for the category page
    let category = null;
    if (this.state.categoryPage) {
      document.body.style.background = "url('')";
      category =
        <CategoryContainer
          // props for search bar
          setSearchInput={this.setSearchInput}
          setLocation={this.setLocation}
          search={this.search}

          searchInput={this.state.searchInput}
          location={this.state.location}
          searchResults={this.state.searchResults}
          phone = {this.state.venuePhone}

          selectVenue={this.selectVenue}
          waitTimes={this.state.waitTimes}

          latitude={this.state.latitude}
          longitude={this.state.longitude}

          homePage={this.state.homePage}
          categoryPage={this.state.categoryPage}
          venuePage={this.state.venuePage}
          current={this.state.current}
        />
    }

    // conditional rendering for the venue page
    let venue = null;
    if (this.state.venuePage) {
      venue =
        <VenueContainer
          // props for search bar
          setSearchInput={this.setSearchInput}
          setLocation={this.setLocation}
          search={this.search}

          searchInput={this.state.searchInput}
          location={this.state.location}
          searchResults={this.state.searchResults}
          latitude={this.state.latitude}
          longitude={this.state.longitude}

          // props for venue selection
          venueId={this.state.venueId}
          venueName={this.state.venueName}
          venueUrl={this.state.venueUrl}
          venueImage={this.state.venueImage}
          venueLocation={this.state.venueLocation}
          venuePhone={this.state.venuePhone}
          venueWaitTimeList={this.state.venueWaitTimeList}
          venueLatitude={this.state.venueLatitude}
          venueLongitude={this.state.venueLongitude}
          setWaitTime={this.setWaitTime}
          addWaitTime={this.addWaitTime}
          updateWaitList={this.updateWaitList}
        />
    }

    return (
      <div>
        {/* {login}
        {signup} */}
        {home}
        {category}
        {venue}
      </div>
    )
  }
}

export default MainContainer;
