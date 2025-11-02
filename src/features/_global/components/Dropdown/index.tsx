import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  value: string;
}

interface DropdownProps {
  options: DropdownItem[];
  onChange: (e: string) => void;
  defaultValue?: {
    label: string;
    value: string;
  };
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: DropdownItem) => {
    if (!item.disabled) {
      setSelectedValue({ label: item.label, value: item.value });
      onChange(item.value);
      setIsOpen(false);
      item.onClick?.();
    }
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg
                   focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                   transition-all duration-200 outline-none
                   flex items-center justify-between gap-2
                   hover:border-gray-400
                   text-sm font-poppins text-gray-700"
      >
        <span className={selectedValue ? "text-gray-700" : "text-gray-400"}>
          {selectedValue?.label || "Select option"}
        </span>
        <FiChevronDown
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-soft-lg z-50 overflow-hidden animate-slide-down">
          <ul className="max-h-60 overflow-y-auto py-1">
            {options.map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  disabled={item.disabled}
                  className={`
                    w-full px-4 py-2.5 text-left text-sm font-poppins
                    transition-colors duration-150
                    ${
                      item.disabled
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : "text-gray-700 hover:bg-primary-50 hover:text-primary-700 cursor-pointer"
                    }
                    ${selectedValue?.value === item.value ? "bg-primary-50 text-primary-700 font-medium" : ""}
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
