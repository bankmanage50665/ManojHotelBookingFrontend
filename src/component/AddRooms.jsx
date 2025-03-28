import { Link, Form, useNavigation } from "react-router-dom";
export default function AddRooms() {
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";

  async function handleAddHoteles(e) {
    e.preventDefault();
    const formData = new FormData();
    // const userData = Object.fromEntries(formData.entries());
    const formElement = e.target.elements;
    const hotelData = {
      name: formElement.name.value,
      address: formElement.address.value,
      price: formElement.price.value,
      image: formElement.images.value,
      near: formElement.near.value,
      phone: formElement.phone.value,
    };

    
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Add Your Rooms</h2>
        <Form onSubmit={handleAddHoteles}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Hotel Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-gray-700 font-bold mb-2"
            >
              Hotel Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

   
      
   

          <div className="mb-4">
            <label
              htmlFor="near"
              className="block text-gray-700 font-bold mb-2"
            >
              Near by
            </label>
            <input
              type="text"
              id="near"
              name="near"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            disabled={isSubmiting}
            type="submit"
            className="w-full py-2 bg-black text-yellow-200 rounded-md hover:bg-blue-700"
          >
            {isSubmiting ? "Adding room" : " Add Room"}
          </button>
        </Form>
      </div>
    </>
  );
}
