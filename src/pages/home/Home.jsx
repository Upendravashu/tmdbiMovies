import React from 'react';
import './home.scss';
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';


const Home = () => {
    return (
        <React.Fragment>
            <div className='homePage'>
                <HeroBanner />
                <Trending />
                <Popular />
                <TopRated />

            </div>
        </React.Fragment>
    )
}

export default Home;
