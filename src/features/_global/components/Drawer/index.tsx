import React, { PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";
import { BiChevronLeft } from "react-icons/bi";
import { Poppins } from "../Text";

interface DrawerProps extends PropsWithChildren {
  show: boolean;
  onHide: () => void;
  close?: {
    icon?: ReactNode;
    onClick?: () => void;
    title?: string;
  };
}

export const Drawer: React.FC<DrawerProps> = ({
  onHide,
  show,
  children,
  close,
}) => {
  return (
    <>
      {createPortal(
        <div
          className={`fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0, 0, 0, 0.61)] backdrop:filter backdrop-blur-sm z-40 flex items-center justify-end w-screen cursor-pointer duration-300 ${
            show ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => {
            onHide();
          }}
        >
          <div
            className={`bg-white h-[95vh] w-96 rounded-xl transition-transform duration-300 transform shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-default ${
              show ? "-translate-x-3" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={() => (close?.onClick ? close.onClick() : onHide())}
            >
              <div className="ml-2 my-4 p-2 w-max h-max">
                {close?.icon ? close?.icon : <BiChevronLeft size={28} />}
              </div>
              <Poppins className="text-md text-lg">{close?.title || "Back"}</Poppins>
            </div>
            {children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
