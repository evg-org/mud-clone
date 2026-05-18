import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MudClonePreview } from "./Preview";

import "./standalone.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MudClonePreview />
  </StrictMode>,
);
