import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header /> 
      <div className='relative max-w-screen-2xl h-auto my-0 mx-auto'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export { Layout };
