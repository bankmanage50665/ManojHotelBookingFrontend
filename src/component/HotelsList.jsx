import {
  Link,
  json,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import { FaRupeeSign, FaPhoneAlt, FaEye } from "react-icons/fa";
import { getUserId } from "../middleware/getToken";

export default function HotelsList() {
  const data = useLoaderData();
  const hoteles = data && data.hoteles;
  const userId = getUserId();
  const token = useRouteLoaderData("root");

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 md:p-8 lg:p-12">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hoteles?.map((hotel) => (
            <motion.li
              key={hotel.id}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
            >
              {/* Image Container */}
              <div className="relative">
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={true}
                  autoPlay
                  infiniteLoop
                  className="w-full"
                >
                  {hotel.images.map((img, index) => (
                    <div key={index} className="relative">
                      {/* Mobile Image Container */}
                      <div className="block sm:hidden">
                        <div className="relative pt-[60%]">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                            alt={hotel.name}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Tablet Image Container */}
                      <div className="hidden sm:block md:hidden">
                        <div className="relative pt-[70%]">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                            alt={hotel.name}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Desktop Image Container */}
                      <div className="hidden md:block">
                        <div className="relative pt-[75%]">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                            alt={hotel.name}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>

              {/* Content Container */}
              <div className="relative z-10 p-6">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 tracking-wide">
                    {hotel.name}
                  </h3>

                  <div className="bg-gray-700 rounded-xl shadow-inner p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 font-semibold text-lg sm:text-xl flex items-center">
                        <FaRupeeSign className="mr-1" />
                        {hotel.price}
                      </span>
                      <span className="text-sm font-light text-gray-300">
                        per night
                      </span>
                    </div>
                    <p className="text-sm sm:text-md text-gray-300 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>

                  {/* Buttons Container */}
                  <div className="space-y-3 pt-2">
                    <motion.button
                      onClick={() => handleCall(hotel.phone)}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPhoneAlt className="mr-2" />
                      Book via Call
                    </motion.button>

                    <Link to={`/hoteles/${hotel.id}`} className="block w-full">
                      <motion.div
                        className="w-full bg-gray-600 text-yellow-400 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaEye className="mr-2" />
                        View Details
                      </motion.div>
                    </Link>

                    {token && hotel.creator === userId && (
                      <Link
                        to={`/hoteles/${hotel.id}/edit`}
                        className="block w-full"
                      >
                        <motion.div
                          className="w-full bg-gray-600 text-yellow-400 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaEye className="mr-2" />
                          Edit Hotel
                        </motion.div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function loader() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/hoteles/hotelesList`
    );
    const resData = await response.json();

    if (!response.ok) {
      throw json(
        { message: "We couldn't find valid response " },
        { status: 500 }
      );
    }
    const creator = resData.hoteles.map((hotel) => hotel.creator);

    localStorage.setItem("creator", creator[0]);

    return resData;
  } catch (err) {
    throw new Error("Field to fetch list of hoteles.");
  }
}
