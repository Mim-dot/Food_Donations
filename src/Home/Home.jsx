import React from 'react';
import FeaturedDonations from './FeaturedDonations';
import Banner from './Banner';
import CharityRequests from './CharityRequests';


const Home = () => {
   
    return (
        <div>
          <Banner/>
          <FeaturedDonations/> 
          <CharityRequests/> 
        </div>
    );
};

export default Home;