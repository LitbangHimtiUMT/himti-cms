import { AuthLoginBodyModel } from "@core/model/auth";
import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useAuthLogin } from "../hooks/useAuth";
import InputGroup from "@features/_global/components/Input/InputGroup";

const initialValue = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [authBody, setAuthBody] = useState<AuthLoginBodyModel>({ ...initialValue });
  const [errors, setErrors] = useState<Partial<AuthLoginBodyModel>>({});
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useAuthLogin();

  const validate = () => {
    const newErrors: Partial<AuthLoginBodyModel> = {};
    if (!authBody.email.trim()) newErrors.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(authBody.email)) newErrors.email = "Valid email required.";
    
    if (!authBody.password.trim()) newErrors.password = "Please enter your password.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof AuthLoginBodyModel, value: string) => {
    setAuthBody((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync(authBody);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        
        {/* Form Title Heading */}
        <div className="space-y-1 text-center md:text-left">
          <Typography variant="h4" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Sign in to your account
          </Typography>
          <Typography className="text-xs font-normal text-slate-500">
            Use your HIMTI credentials to access the panel.
          </Typography>
        </div>

        {/* Input Fields Wrapper */}
        <div className="space-y-3.5 pt-1">
          <InputGroup
            label="Email address"
            type="email"
            value={authBody.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            autoComplete="email"
            className="rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:border-blue-600"
          />

          <div className="relative">
            <InputGroup
              label="Password"
              type={showPassword ? "text" : "password"}
              value={authBody.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password}
              autoComplete="current-password"
              className="rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:border-blue-600"
            />
            
            {/* Optimized Toggle Password for Mobile Thumb */}
            <div className="flex justify-end mt-1.5">
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="px-1 py-0.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-800 active:text-blue-600"
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>
          </div>
        </div>

        {/* Form Button Action */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          className="mt-2 rounded-xl h-11 sm:h-12 flex items-center justify-center normal-case text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#4C76A3] to-[#203D5D] shadow-sm shadow-[#466c8e]/20 active:scale-[0.98] transition-transform"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing in...
            </span>
          ) : (
            "Log In"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Login;