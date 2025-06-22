import React from "react";
import News from "./News";
import Banner from "./Banner";
import Card from "./Card";
import Hero from "./Hero";
import OurProduct from "./OurProduct";
const Home = () => {
  return (
    <div>
      <Hero />
     <Banner/>
     <Card/>
     <OurProduct/>
    </div>
  );
};

export default Home;