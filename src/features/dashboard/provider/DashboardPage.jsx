// src/features/dashboard/pages/DashboardPage.jsx
import { DashboardProvider } from "../context/DashboardContext";
import DashboardUI from "../pages/DashboardUi"

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardUI />
    </DashboardProvider>
  );
}
