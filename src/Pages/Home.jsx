import React from 'react';
import Banner from '../Components/Banner';
import AboutBuilding from '../Components/AboutBuilding';
import CouponShowcase from '../Components/CouponShowcase';
import Location from '../Components/Location';

const Home = () => {
    return (
        <div>
            <Banner/>
            <AboutBuilding/>
            <CouponShowcase/>
            <Location/>
        </div>
    );
};

export default Home;