import "./App.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import React, { Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./shared/Navigation/RootLayout";
import { signupAction } from "./shared/component/OtpSignupForm";
import { loginAction } from "./shared/component/OtpLoginForm";
import { tokenLoader, checkAuthLoader } from "./middleware/getToken";
import { logoutAction } from "./middleware/logout";
import Error from "./shared/component/Error";
import LoadingComponent from "./shared/component/LoadingComponent";
import EditHoteles from "./component/EditHoteles";
import { loader as hotelRoomsLoader } from "./component/HotelRooms";
import MetaPixel from "./shared/component/MetaPixel";

const OtpSignupForm = React.lazy(() =>
  import("./shared/component/OtpSignupForm")
);
const OtpLoginForm = React.lazy(() =>
  import("./shared/component/OtpLoginForm")
);
const AddHoteles = React.lazy(() => import("./component/AddHotel"));
const HotelsList = React.lazy(() => import("./component/HotelsList"));
const HotelRooms = React.lazy(() => import("./component/HotelRooms"));
const BookedHotel = React.lazy(() => import("./component/BookedHotel"));
const GetAllBooking = React.lazy(() =>
  import("./component/Admin/ManageBooking")
);

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <Error />,
    loader: tokenLoader,
    id: "root",

    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <HotelsList />
          </Suspense>
        ),
        loader: () =>
          import("./component/HotelsList").then((module) => module.loader()),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <OtpSignupForm />
          </Suspense>
        ),
        action: signupAction,
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <OtpLoginForm />
          </Suspense>
        ),
        action: loginAction,
      },
      {
        path: "hoteles",

        children: [
          {
            path: "add",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <AddHoteles />
              </Suspense>
            ),
          },
          {
            path: ":id",
            loader: checkAuthLoader,

            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<LoadingComponent />}>
                    <HotelRooms />
                  </Suspense>
                ),
                loader: hotelRoomsLoader,
              },
              {
                path: "edit",
                element: (
                  <Suspense fallback={<LoadingComponent />}>
                    <EditHoteles />
                  </Suspense>
                ),
                loader: hotelRoomsLoader,
              },
            ],
          },
        ],
      },
      {
        path: "booked/:id",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <BookedHotel />
          </Suspense>
        ),
        loader: () =>
          import("./component/BookedHotel").then((module) => module.loader()),
      },
      { path: "logout", action: logoutAction },
      {
        path: "admin",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <GetAllBooking />
          </Suspense>
        ),
        loader: () =>
          import("./component/Admin/ManageBooking").then((module) =>
            module.loader()
          ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <MetaPixel />
      <RouterProvider router={router} />
    </>
  );
}

reportWebVitals();
export default App;
