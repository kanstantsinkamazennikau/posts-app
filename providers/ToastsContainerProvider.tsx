"use client";

import { ToastContainer } from "react-toastify";

export default function ToastContainerProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable={false}
      closeOnClick
      pauseOnHover
    />
  );
}
