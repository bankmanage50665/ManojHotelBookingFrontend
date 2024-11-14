// BookingInfoCard.jsx
import { FaUser } from "react-icons/fa";
import HelplineNumber from "../../shared/component/HelplineNumber";

const BookingInfoCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        {/* User Info Section */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-full">
            <FaUser className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-800">
              {book.userName}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              <HelplineNumber phoneNumber={book.phoneNumber} > Call To Customer  </HelplineNumber>
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              book.status === "Confirmed"
                ? "bg-green-50 text-green-600"
                : "bg-yellow-50 text-yellow-600"
            }`}
          >
            {book.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingInfoCard;
