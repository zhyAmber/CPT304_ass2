import React, { Component } from 'react';
//import axios from 'axios';

class HotelData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const {selectedRegion,startDate,endDate } = this.props;
    const city = selectedRegion; // 将所选地区作为城市名称
    const url1 = `https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${city}`;
    

    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '1438bc8c57msh3c6b8121e7ddc2cp14b35bjsn7bee1db50a66',
		    'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
      }
    };
   
    fetch(url1,requestOptions)
      .then(response => response.json())
      .then(data => {
        const locationId = data[0].dest_id;
        const checkInDate = startDate.toISOString().slice(0, 10);//change to yyyy-mm-dd
        const checkOutDate = endDate.toISOString().slice(0, 10); 
         console.log(locationId,checkInDate,checkOutDate)
        const url2 = `https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=${checkInDate}&departure_date=${checkOutDate}&guest_qty=1&dest_ids=${locationId}&room_qty=1&search_type=city&order_by=price`
        const requestOptions = {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '1438bc8c57msh3c6b8121e7ddc2cp14b35bjsn7bee1db50a66',
		        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
	} 
        };

        
        fetch(url2, requestOptions)
          .then(response => response.json())
          .then(data => {
            const hotels = data.result;
            console.log(hotels)
            this.setState({ hotels, isLoading: false });
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      }
      );
  }
  
  render() {
    const { hotels, isLoading } = this.state;
    const { startDate,endDate, selectedRegion } = this.props;

    return (
      <div>
        <h3>From {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()} Hotel Data in {selectedRegion}, Order by price:</h3>
        {isLoading ? (
          <p>Loading hotel data...</p>
        ) : (
          hotels ? (
              hotels.slice(0, 5).map(hotel => (
              <div key={hotel.hotel_id} style={{ display: 'flex', justifyContent: 'center' }}>
                <h4>Hotel name : </h4><p>{hotel.hotel_name}</p>
                <h4>&nbsp;&nbsp;&nbsp; min total price :</h4><p> {hotel.min_total_price}</p>
                <h4>&nbsp;&nbsp;&nbsp; review score : </h4><p>{hotel.review_score}</p>
                <h4>&nbsp;&nbsp;&nbsp; Hotel address : </h4><p>{hotel.address}</p>
              </div>
            ))
          ) : (
            <p>No hotels found for the selected dates.</p>
          )
        )}
      </div>
    );
  }
}

export default HotelData;
