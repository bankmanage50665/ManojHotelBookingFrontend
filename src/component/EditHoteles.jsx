import {
  Form,
  useNavigate,
  useParams,
  useLoaderData,
  useRouteLoaderData,
  json,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaTrash } from "react-icons/fa";

import ImageUpload from "../shared/component/ImageUpload";
import LoadingComponent from "../shared/component/LoadingComponent";

export default function EditHoteles() {
  const [files, setFiles] = useState();
  const [deleteing, setIsDeleteing] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();
  const sp = useParams();
  const hotelId = sp.id;
  const hotel = useLoaderData().hotel;
  const token = useRouteLoaderData("root");

  useEffect(() => {
    if (token === null || !token) {
      navigate("/login");
    }
  }, [token]);

  function handleGetImg(img) {
    setFiles(img);
  }

  async function handleUpdateHotel(e) {
    setIsSubmiting(true);
    e.preventDefault();
    const formData = new FormData();
    const formElement = e.target.elements;
    const hotelData = {
      name: formElement.name.value,
      address: formElement.address.value,
      price: formElement.price.value,
      images: formElement.images.value,
      phone: formElement.phone.value,
      type: formElement.type.value,
      status: formElement.status.value,
    };

    formData.append("name", hotelData.name);
    formData.append("address", hotelData.address);
    formData.append("price", hotelData.price);
    formData.append("phone", hotelData.phone);
    formData.append("type", hotelData.type);
    formData.append("status", hotelData.status);
    Array.from(files.map((img) => formData.append("images", img)));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/hoteles/${hotelId}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message);
      }
    } catch (err) {
      setIsSubmiting(false);
      throw json(
        { message: "Field to edit hotel details, Please try agin later." },
        { status: 401 }
      );
    }
    navigate(`/hoteles/${hotelId}`);
    setIsSubmiting(false);
  }

  async function deleteHotel(id) {
    setIsDeleteing(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/hoteles/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message);
      }
    } catch (err) {
      setIsDeleteing(false);
      throw json(
        { message: "Field to delete hotel details, Please try agin later." },
        { status: 401 }
      );
    }
    setIsDeleteing(false);
    navigate("/");
  }

  return (
    <>
      {hotel ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
            Edit Hotel
          </h2>
          <motion.form
            onSubmit={handleUpdateHotel}
            className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-400 font-medium mb-2"
              >
                Hotel Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={hotel && hotel.name}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-gray-400 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                defaultValue={hotel && hotel.address}
                name="address"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="price"
                className="block text-gray-400 font-medium mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={hotel && hotel.price}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              />
            </div>
            <div className="mb-6">
              <ImageUpload getAllFiles={handleGetImg} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-gray-400 font-medium mb-2"
              >
                Phone no
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                defaultValue={hotel && hotel.phone}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="type"
                className="block text-gray-400 font-medium mb-2"
              >
                Select Type
              </label>
              <select
                id="type"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              >
                <option value="hotel">Hotel</option>
                <option value="gest">Guest house</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="status"
                className="block text-gray-400 font-medium mb-2"
              >
                Select status
              </label>
              <select
                id="status"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              >
                <option value="unbook">Unbooked</option>
                <option value="book">Booked</option>
              </select>
            </div>

            <motion.button
              disabled={isSubmiting}
              type="submit"
              className="w-full py-3 bg-black text-yellow-200 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmiting ? (
                <LoadingComponent />
              ) : (
                <>
                  <FaUpload className="mr-2" />
                  Update Hotel
                </>
              )}
            </motion.button>
          </motion.form>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              disabled={deleteing}
              onClick={() => deleteHotel(hotel.id)}
              type="submit"
              className="w-full py-3 bg-black text-yellow-200 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {deleteing ? (
                <LoadingComponent />
              ) : (
                <>
                  <FaTrash className="mr-2" />
                  Delete Hotel
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center text-2xl font-bold text-gray-100">
            <LoadingComponent />
          </div>
        </div>
      )}
    </>
  );
}
