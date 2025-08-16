import React from "react";
import FeaturedDonations from "./FeaturedDonations";
import Banner from "./Banner";
import CharityRequests from "./CharityRequests";
import VolunteerOpportunities from "./VolunteerOpportunities";
import FoodSafetyGuidelines from "./FoodSafetyGuidelines";
import CommunityStories from "./CommunityStories";
import { HowItWorks } from "./HowItWorks";
import { UpcomingEvents } from "./UpcomingEvents";

const Home = () => {
  return (
    <div className="nav">
      <Banner />
      <FeaturedDonations />
      <CharityRequests />
      <VolunteerOpportunities />
      <CommunityStories />
      <UpcomingEvents />
      <HowItWorks />
      <FoodSafetyGuidelines />
    </div>
  );
};

export default Home;
