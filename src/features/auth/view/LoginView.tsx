import React from "react";
import Login from "../components/Login";
import AuthLayout from "../containers/AuthLayout";

const LoginView: React.FC = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginView;
