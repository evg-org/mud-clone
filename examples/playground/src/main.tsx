import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MudClonePlayground } from "./Playground";

import "./standalone.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MudClonePlayground />
  </StrictMode>,
);
