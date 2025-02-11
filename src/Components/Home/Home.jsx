
import { useContext } from 'react';
import Banner from './Banner';
import WhyChoseUs from './WhyChoseUs';
import { AuthContext } from '../AuthProvider';
import Cars from './cars';
import Extra from './Extra';
import SpecialOffers from './SpecialOffers';
import Challenging from './Challenging';
import CarMaintenanceTips from './Challenging';
import ReviewSection from './ReviewSection';




const Home = () => {
    const {datas,dataloading}=useContext(AuthContext)
    console.log(dataloading)
    if(dataloading){
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    return (
        <div className='md:pt-16'>
            <Banner></Banner>
            <WhyChoseUs></WhyChoseUs>
            <Cars cars={datas}></Cars>
            <Extra></Extra>
            <SpecialOffers></SpecialOffers>
            <CarMaintenanceTips></CarMaintenanceTips>
            <ReviewSection></ReviewSection>

        </div>
    );
};

export default Home;