import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PetList from "./pages/PetList.jsx";
import PetsProvider from "./context/PetsContext";
import PetDetail from "./pages/PetDetail.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/pets" />,
  },
  {
    path: "/pets",
    element: (
      <>
        <App />
        <PetList />
      </>
    ),
  },
  {
    path: "/pets/:id",
    element: (
      <>
        <App />
        <PetDetail />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PetsProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PetsProvider>
  </React.StrictMode>
);
