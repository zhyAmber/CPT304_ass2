import React, { Component } from 'react';
import WeatherData from './WeatherData';
import RentalData from './RentalData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const OptionList= [
  { holiday: ["New Year's Day","Saint Patrick's Day","Easter Monday","Spring Bank Holiday","Christmas Day"], region: ['london','Manchester','Liverpool','Edinburgh'],country:'uk' },
  { holiday: ["New Year's Day","Martin Luther King, Jr. Day","Washington's Birthday","Good Friday","launchYear"], region: ['New York','Los Angeles','chicago'],country:"us"},
]

class HolidayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHoliday: '',
      selectedRegion: '',
      selectedCountry:'',
      //selectedCountrycode:'',
      holiday:[],
      region:[],
      country:'',
      startDate: null,
      endDate: null,
    };
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleHolidayChange = this.handleHolidayChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }


  handleCountryChange = (event) => {
    const countryName = event.target.value;
    this.setState({ selectedCountry: countryName });
    const country = OptionList.find(c => c.country === countryName);
    if (country) {
      this.setState({ holiday: country.holiday });
      this.setState({ region: country.region });
      //this.setState({ selectedCountrycode: country.countrycode });
    } else {
      this.setState({ holiday: [] });
      this.setState({ region: [] });
    }
    // this.setState({ selectedCountry: event.target.value });
  };


  handleRegionChange = (event) => {
    this.setState({ selectedRegion: event.target.value });
  };


  handleHolidayChange = (event) => {
    this.setState({ selectedHoliday: event.target.value });
  };


  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };
  
  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };
  

  render() {
    const { holiday,region, selectedHoliday, selectedRegion ,selectedCountry,startDate,endDate} = this.state;

    return (
      <div>
        <h2>Assessment 2</h2>
        <form>
        <label>
            Country:
            <select value={selectedCountry} onChange={this.handleCountryChange}>
              <option value="">Select a Country</option>
              {OptionList.map(item => (
                <option key={item.country} value={item.country}>
                  {item.country}
                </option>
              ))}
            </select>
          </label>

          {holiday.length > 0 ? (
                <label>
                  Holiday:
                  <select value={selectedHoliday} onChange={this.handleHolidayChange}>
                    <option value="">View and Select a holiday</option>
                    {holiday.map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <h5>You can view {selectedCountry} holidays in Holiday Dropdown List and please select a holiday to view weather data</h5>
                </label>          
                ): (
                  <h5>Please select a country to view its holidays.</h5>
                )}

          {region.length > 0 ? (
          <label>
            Region:
            <select value={selectedRegion} onChange={this.handleRegionChange}>
              <option value="">Select a region</option>
              {region.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <h4>Please select a region to view its weather data and rental data.</h4>
          </label>
          ): null
        }   

    {selectedCountry && selectedRegion &&(
          <div>
          <label>
          Please select a Check in Date to view hotel data:
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
          </label> 
          <label>
          Please select a Check out Date to view hotel data:
          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
        </label> </div>
    )}

        </form>
        {selectedCountry && selectedHoliday&& selectedRegion && (
          <div>
            <WeatherData selectedHoliday={selectedHoliday} selectedRegion={selectedRegion} selectedCountry={selectedCountry}/>
          </div>
        )}
        {selectedCountry && selectedRegion && startDate && endDate &&(
          <div>
        <RentalData startDate={startDate} endDate={endDate} selectedRegion={selectedRegion} /> 
       </div> 
       )}
      </div>
      
    );
  }
}

export default HolidayList;


