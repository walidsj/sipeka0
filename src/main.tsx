import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "./providers";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <Providers />
  </StrictMode>
);

createRoot(elem).render(app);
