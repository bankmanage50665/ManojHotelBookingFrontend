// src/utils/metaPixelEvents.js
// export const trackSearch = (searchData) => {
//   if (window.fbq) {
//     window.fbq("track", "Search", {
//       search_string: searchData.location,
//       checkin_date: searchData.checkIn,
//       checkout_date: searchData.checkOut,
//       number_of_guests: searchData.guests,
//     });
//   }
// };

export const trackViewContent = (roomData) => {
  if (window.fbq) {
    window.fbq("track", "ViewContent", {
      content_type: "hotel_room",
      content_name: roomData.name,
      content_ids: [roomData.id],
      currency: "INR",
      value: roomData.price,
    });
  }
};

export const trackInitiateCheckout = (bookingData) => {
  if (window.fbq) {
    window.fbq("track", "InitiateCheckout", {
      content_type: "hotel_room",
      content_name: bookingData.roomName,
      content_ids: [bookingData.roomId],
      currency: "INR",
      value: bookingData.totalPrice,
    });
  }
};

export const trackPurchase = (orderData) => {
  if (window.fbq) {
    window.fbq("track", "Purchase", {
      content_type: "hotel_room",
      content_name: orderData.roomName,
      content_ids: [orderData.roomId],
      currency: "INR",
      value: orderData.totalAmount,
      transaction_id: orderData.orderId,
    });
  }
};
