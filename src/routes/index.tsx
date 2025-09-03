import { createBrowserRouter } from "react-router-dom";

import RedirectPage from "@/pages/RedirectPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import RecoverPasswordPage from "@/pages/RecoverPasswordPage";
import RecoverCodePage from "@/pages/RecoverCodePage";
import RedefinePasswordPage from "@/pages/RedefinePasswordPage";

import PrivateRoute from "@/pages/PrivateRoute";
import MainLayout from "@/pages/MainLayout";

import DashboardPage from "@/pages/DashboardPage";
import PaymentsPage from "@/pages/PaymentsPage";
import EmployeesPage from "@/pages/EmployeesPage";
import EmployeeRegisterPage from "@/pages/EmployeesRegisterPage";
import LogsPage from "@/pages/LogsPage";
import AuditLogs from "@/pages/AuditLogs";
import UserInfos from "@/pages/UserInfos";
import AddLabel from "@/pages/AddLabel";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/recover-password",
    element: <RecoverPasswordPage />,
  },
  {
    path: "/recover-code",
    element: <RecoverCodePage />,
  },
  {
    path: "/redefine-password",
    element: <RedefinePasswordPage />,
  },
  {
    path: "/app",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "user-infos",
            element: <UserInfos />,
          },
          {
            path: "add-label",
            element: <AddLabel />,
          },
          {
            path: "payments",
            element: <PaymentsPage />,
          },
          {
            path: "employees",
            element: <EmployeesPage />,
          },
          {
            path: "employee-register",
            element: <EmployeeRegisterPage />,
          },
          {
            path: "logs",
            element: <LogsPage />,
          },
          {
            path: "audit-log",
            element: <AuditLogs />,
          },
        ],
      },
    ],
  },
]);
