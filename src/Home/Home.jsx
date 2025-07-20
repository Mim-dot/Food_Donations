import React from 'react';
import FeaturedDonations from './FeaturedDonations';
import Banner from './Banner';
import CharityRequests from './CharityRequests';
import VolunteerOpportunities from './VolunteerOpportunities';
import FoodSafetyGuidelines from './FoodSafetyGuidelines';


const Home = () => {
   
    return (
        <div>
          <Banner/>
          <FeaturedDonations/> 
          <CharityRequests/> 
          <VolunteerOpportunities/>
          <FoodSafetyGuidelines/>
        </div>
    );
};

export default Home;