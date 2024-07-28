import { Typography } from "@material-tailwind/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; 2024, made with{" "}
          by{" "}
          <span
            className="transition-colors hover:text-blue-500 font-bold"
          >
            HIMTI_APP
          </span>{" "}
          for a better web.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
