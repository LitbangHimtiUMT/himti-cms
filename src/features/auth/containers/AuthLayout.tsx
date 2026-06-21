import { Typography } from "@material-tailwind/react";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import HIMTI from "@core/assets/Logo/HIMTI.png";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  if (auth?.data) {
    return <Navigate to={"/admin/acara"} replace />;
  }

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-slate-50 font-sans antialiased text-slate-800 selection:bg-blue-500/10">
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[50%] rounded-full bg-yellow-200/30 blur-[120px] md:-top-[30%]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[50%] rounded-full bg-blue-200/20 blur-[120px] md:-bottom-[30%]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Main Bento Container */}
        <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:rounded-3xl">
          <div className="grid min-h-[540px] md:min-h-[620px] md:grid-cols-[1.1fr_1fr] lg:grid-cols-[1.3fr_1fr]">
            
            {/* LEFT SIDE: Desktop Showcase (Hidden on Mobile) */}
            <div className="relative hidden flex-col justify-between border-r border-slate-100 bg-gradient-to-b from-slate-50/80 to-slate-100/40 p-10 lg:p-12 md:flex">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                  <img src={HIMTI} alt="HIMTI Logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <Typography variant="h5" className="text-lg font-bold tracking-wide text-slate-900">
                    HIMTI CMS
                  </Typography>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-blue-600">
                    Central Management
                  </p>
                </div>
              </div>

              <div className="my-auto max-w-sm py-6">
                <Typography variant="h2" className="bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-3xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-3xl">
                  Empowering the Core of Tech Community.
                </Typography>
                <Typography className="mt-3 text-sm leading-relaxed text-slate-500">
                  A modern admin ecosystem built to streamline events, handle memberships, and manage workflows with precision.
                </Typography>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[{ t: "Secure Access", d: "Encrypted" }, { t: "Fluid UI", d: "Instant" }, { t: "Centralized", d: "Unified" }].map((item, i) => (
                  <div key={i} className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3 text-center">
                    <p className="text-[11px] font-semibold text-slate-800">{item.t}</p>
                    <p className="text-[10px] text-slate-400">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: Auth Panel (Fluid padding for mobile) */}
            <div className="flex flex-col justify-between bg-white/50 p-5 sm:p-10 md:p-8 lg:p-12">
              
              {/* BRAND HEADER FOR MOBILE (Clean & Centered) */}
              <div className="mb-6 flex flex-col items-center justify-center gap-2 text-center md:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm shadow-slate-200/60">
                  <img src={HIMTI} alt="HIMTI Logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <Typography variant="h6" className="text-base font-bold tracking-wide text-slate-900">
                    HIMTI CMS
                  </Typography>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-blue-600">
                    Central Management
                  </p>
                </div>
              </div>

              {/* Form Content Anchor */}
              <div className="my-auto w-full mx-auto max-w-sm">
                {children}
              </div>

              {/* Footer Copyright */}
              <div className="mt-6 text-center md:text-left">
                <p className="text-[10px] tracking-wide text-slate-400">
                  &copy; {new Date().getFullYear()} HIMTI. All rights reserved.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;