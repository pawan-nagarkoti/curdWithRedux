import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModalProvider } from "./services/hook/modalContext";
import useToast from "./services/hook/useToast";
const { ToastContainerComponent } = useToast();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <App />
      <ToastContainerComponent />
    </ModalProvider>
  </StrictMode>
);
