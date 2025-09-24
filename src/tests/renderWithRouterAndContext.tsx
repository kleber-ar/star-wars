import React, { type ReactNode } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { PlanetsProvider } from "../context/PlanetsContext";

export default function renderWithRouterAndContext(component: ReactNode) {
  const user = userEvent.setup();
  const utils = render(
    <BrowserRouter>
      <PlanetsProvider>{component}</PlanetsProvider>
    </BrowserRouter>,
  );
  return { ...utils, user };
}
