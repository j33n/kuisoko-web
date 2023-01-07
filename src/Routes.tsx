import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Landing, Register, Login, Studio } from "./pages";
import AppLayout from "./components/Layout/Layout";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Landing />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="studio" element={<Studio />} />
    </Route>
  )
);

export default Router;
