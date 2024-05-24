import React, { useEffect } from "react";
import '../styles/Loader.css';

const Loader = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/home';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default Loader;
