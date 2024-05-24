import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Rectangle from './RoofOptions/Rectangle';
import Triangle from './RoofOptions/Triangle';
import DoubleRectangle from './RoofOptions/DoubleRectangle';

const RoofSelection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h2 className="text-3xl font-extrabold mb-24 text-gray-200">
        {loading ? <Skeleton width={300} height={30} /> : 'Selecciona el tipo de techo'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center cursor-pointer">
          {loading ? (
            <Skeleton width={100} height={100} />
          ) : (
            <a href="/rectangle">
              <Rectangle />
            </a>
          )}
          <p className="mt-2 font-semibold text-xl text-gray-200">{loading ? <Skeleton width={150} /> : 'Rectángulo normal'}</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          {loading ? (
            <Skeleton width={100} height={100} />
          ) : (
            <a href="/home#">
              <Triangle />
            </a>
          )}
          <p className="mt-2 font-semibold text-xl text-gray-200">{loading ? <Skeleton width={150} /> : 'Triángulo isósceles'}</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          {loading ? (
            <Skeleton width={100} height={100} />
          ) : (
            <a href="/home#">
              <DoubleRectangle />
            </a>
          )}
          <p className="mt-2 font-semibold text-xl text-gray-200">{loading ? <Skeleton width={200} /> : 'Dos rectángulos superpuestos'}</p>
        </div>
      </div>
    </div>
  );
};

export default RoofSelection;
