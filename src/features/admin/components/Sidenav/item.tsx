import { ItemMenuAdmin } from "@features/_global/types/MenuTypes";
import React from "react";
import { NavLink } from "react-router-dom";

interface ExtendedItemMenuProps extends ItemMenuAdmin {
  onClick?: () => void;
}

const ItemSidenav: React.FC<ExtendedItemMenuProps> = ({ name, to, icon, onClick }) => {
  return (
    <li>
      <NavLink to={to} onClick={onClick}>
        {({ isActive }) => (
          <div
            className={`
              flex items-center gap-3 px-3.5 py-2.5 rounded-xl
              transition-all duration-200 group relative overflow-hidden text-xs
              ${
                isActive
                  ? "bg-gradient-to-r from-[#4C76A3] to-[#203D5D] text-white shadow-md shadow-[#203D5D]/20 font-semibold"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
              }
            `}
          >
            {/* Left Micro-Glow Indicator */}
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-400 rounded-r-full" />
            )}

            {/* Icon Alignment */}
            <div className={`
              text-base transition-transform duration-200 shrink-0
              ${isActive ? "text-white scale-105" : "text-slate-400 group-hover:text-slate-200 group-hover:scale-105"}
            `}>
              {icon}
            </div>

            {/* Clean Typography */}
            <span className="truncate tracking-wide">
              {name}
            </span>
          </div>
        )}
      </NavLink>
    </li>
  );
};

export default ItemSidenav;