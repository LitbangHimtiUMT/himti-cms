import React from "react";
import AuthLayout from "../containers/AuthLayout";
import Login from "../components/Login";
import DatePicker from "../../_global/components/Date";

const LoginView: React.FC = () => {
  return (
    <AuthLayout>
      <Login />
      <DatePicker mode="date"
      range
      />
    </AuthLayout>
  );
};

export default LoginView;
