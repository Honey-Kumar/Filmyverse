import React from "react";
import Header from "./Header";
import Cards from "./cards";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <>
      <Header />
      <h2 className="text-4xl ml-3 mb-3 max-sm:text-2xl pt-2 font-bold text-blue-500">My Movies</h2>
      <Cards />
      <Footer />
    </>
  );
};

export default Homepage;
