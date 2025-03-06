import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/homePage/homePage";
import { Dasboard } from "../pages/dashboard/dashboard";
import { ComplaintPage } from "../pages/complaint/complaintPage";
import { ComplaintForm } from "../pages/complaint/complaintForm/complaintForm";
export const AppRoutes = (
  <Routes>
    <Route path="/" element={<HomePage />}>
      <Route path="/dashboard" element={<Dasboard />} />
      <Route path="/complaint" element={<ComplaintPage />} />
      <Route path="/file-complaint" element={<ComplaintForm />} />
    </Route>
  </Routes>
);
