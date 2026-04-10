import React from "react";
import Hero from "../home/Hero";
import Brands from "../home/Brands";
import Features from "../home/Features";
import ShopByCategories from "../home/ShopByCategories";
import OurProduct from "../OurProduct";
import Banner from "../home/Banner";
import Card from "../Card";
import Testimonials from "../home/Testimonial";
import Newsletter from "../home/Newsletter";

const Home = () => {
  return (
    <div className="bg-gray-50 bg-opacity-50 flex flex-col">
      <Hero />
      <Brands />
      
      <ShopByCategories />
      
      {/* Featured Products */}
      <div className="py-8">
        <OurProduct />
      </div>

      <Features />

      <Banner />
      <Card />
      
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
