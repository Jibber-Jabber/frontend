import React from "react";
import "./Home.scss";
import RightSection from "./RightSection/RightSection";
import LeftSection from "./LeftSection/LeftSection";
import MiddleSection from "./MiddleSection/MiddleSection";

const Home = () => {
  return (
    <div className="home-container">
      <LeftSection />
      <MiddleSection />
      <RightSection />
    </div>
  );
};

export default Home;
