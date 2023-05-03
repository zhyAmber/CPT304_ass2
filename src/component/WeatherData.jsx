import React, { Component } from 'react';
import axios from 'axios';

class WeatherData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      holidayDate:'',
    };
  }

  componentDidMount() {
    const {selectedHoliday,selectedCountry } = this.props;
    let selectedCountrycode=0;
    if (selectedCountry==='uk'){
      selectedCountrycode = "GB" ;
    }
    // Get the date for the selected holiday
    axios.get(`https://date.nager.at/api/v2/publicholidays/${new Date().getFullYear()}/${selectedCountrycode}`)
    //new Date().getFullYear()获取当前年份
      .then(response => {
        const holiday = response.data.find(h => h.name === selectedHoliday);
        if (holiday) {
          this.setState({ holidayDate: holiday.date });
          console.log(holiday.date)
        }
      })
      .catch(error => {
        console.log(error);
      });
    
  }

  componentDidUpdate(prevProps,prevState) {
    const { selectedRegion, selectedCountry,selectedHoliday } = this.props;
    const { holidayDate } = this.state;
    const apiKey = '86c1e0de7083f734f5693d18c7185b2a';

    // Fetch weather data for the selected holiday and region

    //if里的条件防止url不断连续不停访问
    if (selectedRegion !== prevProps.selectedRegion || selectedCountry !== prevProps.selectedCountry || selectedHoliday !== prevProps.selectedHoliday|| (holidayDate && holidayDate !== prevState.holidayDate)) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedRegion},${selectedCountry}&APPID=${apiKey}&dt=${holidayDate}`)
        .then(response => {
          this.setState({ weatherData: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (selectedHoliday !== prevProps.selectedHoliday) {
      let selectedCountrycode=0;
      if (selectedCountry==='uk'){
        selectedCountrycode = "GB" ;
      }
      axios.get(`https://date.nager.at/api/v2/publicholidays/${new Date().getFullYear()}/${selectedCountrycode}`)
      .then(response => {
        const holiday = response.data.find(h => h.name === selectedHoliday);
        if (holiday) {
          this.setState({ holidayDate: holiday.date });
          console.log(holiday.date)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  }
  
  render() {
        const { weatherData, holidayDate } = this.state;
        const { selectedHoliday, selectedRegion, selectedCountry } = this.props;
    
        return (
          <div>
            <h3>{selectedHoliday} Weather in {selectedRegion}, {selectedCountry}:</h3>
            {holidayDate ? (
              Object.keys(weatherData).length > 0 ? (
                <div>
                  <p>Date: {new Date(holidayDate).toLocaleDateString()}</p>
                  <p>Weather: {weatherData.weather[0].main}</p>
                  <p>Temperature: {weatherData.main.temp}</p>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                  <p>Wind Speed: {weatherData.wind.speed}km/h</p>
                </div>
              ) : <p>Loading weather data...</p>
            ) : <p>Loading holiday data...</p>}
          </div>
        );
      }
    }
    
    export default WeatherData;

