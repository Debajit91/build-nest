import React from 'react';
import Banner from '../Components/Banner';
import AboutBuilding from '../Components/AboutBuilding';
import CouponShowcase from '../Components/CouponShowcase';
import Location from '../Components/Location';
import Amenities from '../Components/New Sections/Amenities';
import NeighborhoodCommute from '../Components/New Sections/NeighborhoodCommute';
import Testimonials from '../Components/New Sections/Testimonials';
import HowItWorks from '../Components/New Sections/HowItWorks';
import NewFeature from '../Components/New Sections/NewFeature';
import MoveInGuideSection from '../Components/New Sections/MoveInGuideSection';
import FAQSection from '../Components/New Sections/FAQSection';
import BuildingHighlights from '../Components/New Sections/BuildingHighlights';

const Home = () => {
    return (
        <div>
            <Banner/>
            <AboutBuilding/>
            <NewFeature/>
            <CouponShowcase/>
            <Location/>
            <HowItWorks/>
            <Amenities/>
            <BuildingHighlights/>
            <NeighborhoodCommute/>
            <Testimonials/>
            <FAQSection/>
            <MoveInGuideSection/>
        </div>
    );
};

export default Home;