import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { TerminalView } from "./terminal/TerminalView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Hero },
      { path: "projects", Component: Projects },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "terminal", Component: TerminalView },
    ],
  },
]);
