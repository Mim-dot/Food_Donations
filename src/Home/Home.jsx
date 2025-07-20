import React from 'react';
import FeaturedDonations from './FeaturedDonations';
import Banner from './Banner';
import CharityRequests from './CharityRequests';
import VolunteerOpportunities from './VolunteerOpportunities';
import FoodSafetyGuidelines from './FoodSafetyGuidelines';
import CommunityStories from './CommunityStories';


const Home = () => {
   
    return (
        <div>
          <Banner/>
          <FeaturedDonations/> 
          <CharityRequests/> 
          <VolunteerOpportunities/>
          <CommunityStories/>
          <FoodSafetyGuidelines/>
        </div>
    );
};

export default Home;