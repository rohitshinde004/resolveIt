import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/homePage/homePage";
import { Dasboard } from "../pages/dashboard/dashboard";
import { ComplaintPage } from "../pages/complaint/complaintPage";
import { ComplaintForm } from "../pages/complaint/complaintForm/complaintForm";
import { SignUp } from "../pages/signUp/signUp";
import { LoginPage } from "../pages/loginPage/loginPage";
export const AppRoutes = (
  <Routes>
    <Route path="/home" element={<HomePage />}>
      <Route path="/home/dashboard" element={<Dasboard />} />
      <Route path="/home/complaint" element={<ComplaintPage />} />
      <Route path="/home/file-complaint" element={<ComplaintForm />} />
    </Route>
    <Route path="/signUp" element={<SignUp />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);
