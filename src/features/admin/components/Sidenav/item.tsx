import { ItemMenuAdmin } from "@features/_global/types/MenuTypes";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";

const ItemSidenav: React.FC<ItemMenuAdmin> = ({ name, to, icon }) => {
  return (
    <li>
      <NavLink to={to}>
        {({ isActive }) => (
          <div
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200 group relative overflow-hidden
              ${
                isActive
                  ? "bg-white/15 text-white shadow-soft backdrop-blur-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            {/* Active Indicator */}
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
            )}

            {/* Icon */}
            <div className={`
              text-lg transition-transform duration-200
              ${isActive ? "scale-110" : "group-hover:scale-110"}
            `}>
              {icon}
            </div>

            {/* Text */}
            <Typography
              className={`
                font-medium capitalize transition-all duration-200
                ${isActive ? "text-white font-semibold" : "text-white/80 group-hover:text-white"}
              `}
            >
              {name}
            </Typography>
          </div>
        )}
      </NavLink>
    </li>
  );
};

export default ItemSidenav;
