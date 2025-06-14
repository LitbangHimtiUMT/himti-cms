import { useCallback, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdOutlineSearch } from "react-icons/md";
import { Input } from "../Input/InputV2";
import { createPortal, flushSync } from "react-dom";

interface ListItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface IDropdownProps {
  list: ListItem[];
  placeholder?: string;
  defaultValue?: ListItem;
  searchInput?: boolean;
  onSearch?: (e: string) => void;
  onChange?: (e: ListItem) => void;
  reset?: boolean;
  withPortal?: boolean;
}

const initValue: ListItem = {
  label: "",
  value: "",
  disabled: false,
};

export const DropdownV2: React.FC<IDropdownProps> = ({
  list,
  placeholder,
  defaultValue,
  onChange,
  searchInput = false,
  onSearch,
  reset,
  withPortal = false,
}) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(list || []);
  const [isFocused, setIsFocused] = useState(false);
  const [selected, setSelected] = useState(reset ? initValue : defaultValue);

  const ref = useRef<HTMLDivElement>(null);

  const handleItemSelect = useCallback(
    (item: ListItem) => {
      if (item.disabled) return;

      flushSync(() => {
        setSelected(item);
        setShow(false);
      });

      onChange?.(item);
    },
    [onChange]
  );

  useEffect(() => {
    setData(list);
  }, [list]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false); // Tutup popup jika klik di luar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (reset) setSelected(initValue);
  }, [reset]);

  return (
    <div
      ref={ref}
      className="relative w-full bg-white"
      style={{ zIndex: isFocused ? 50 : 20 }}
    >
      <div
        onClick={() => setShow((prev) => !prev)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative border border-solid border-gray-300 w-full rounded-lg flex items-center justify-between px-4 py-2 cursor-pointer"
        style={{ zIndex: isFocused ? 50 : 10 }}
      >
        <p
          className={`text-sm font-poppins font-medium duration-200 ${
            !selected?.label && !defaultValue && placeholder ? "opacity-50" : ""
          }`}
        >
          {defaultValue?.label || selected?.label || placeholder || ""}
        </p>
        <MdKeyboardArrowDown
          className={`text-2xl text-gray-500 duration-300 ${
            show ? "rotate-180" : ""
          }`}
        />
      </div>
      {show && (
        <>
          {withPortal ? (
            <>
              {createPortal(
                <div
                  className="fixed"
                  style={{
                    zIndex: 99999, // Tingkatkan z-index ini
                    width: ref.current?.clientWidth,
                    left: ref.current?.getBoundingClientRect().left,
                    top: ref.current
                      ? ref.current.getBoundingClientRect().top +
                        ref.current.clientHeight +
                        window.scrollY
                      : undefined,
                    minWidth: ref.current?.clientWidth,
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div
                    className="absolute overflow-auto max-h-96 flex flex-col gap-1 w-full bg-white border border-solid border-gray-300 rounded-lg mt-2 px-2 pb-2 pt-2 shadow-lg"
                    style={{ zIndex: 99999 }}
                  >
                    {searchInput && (
                      <div
                        className="sticky top-0 bg-white py-2"
                        style={{ zIndex: 100000 }}
                      >
                        <Input
                          inputSize="md"
                          placeholder="Search"
                          LeftIcon={
                            <MdOutlineSearch className="text-xl text-gray-500" />
                          }
                          onChange={(e) => {
                            onSearch?.(e.target.value);
                            if (!e.target.value) {
                              setData(list);
                              return;
                            }
                            setData((prev) =>
                              prev.filter((item) =>
                                item.label
                                  .toLowerCase()
                                  .includes(e.target.value.toLowerCase())
                              )
                            );
                          }}
                        />
                      </div>
                    )}
                    {(data?.length
                      ? data
                      : [
                          {
                            label: "Not Found",
                            value: "Not Found",
                            disabled: true,
                          },
                        ]
                    )?.map((item, index) => (
                      <div
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          if (item.disabled) return;

                          // Gunakan requestAnimationFrame untuk timing yang lebih baik
                          requestAnimationFrame(() => {
                            setSelected(item);
                            setShow(false);
                            onChange?.(item);
                          });
                        }}
                        key={`${item.value}-${index}`}
                        onClick={() => handleItemSelect(item)}
                        className={`w-full rounded-lg flex items-center px-4 py-3 ${
                          !item.disabled
                            ? "hover:bg-gray-100 cursor-pointer"
                            : ""
                        }`}
                      >
                        <p
                          className={`text-sm font-poppins ${
                            item.disabled ? "text-gray-500" : ""
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>,
                document.body
              )}
            </>
          ) : (
            <div
              className="fixed"
              style={{
                zIndex: 99999, // Tingkatkan z-index ini
                width: ref.current?.clientWidth,
                left: ref.current?.getBoundingClientRect().left,
                top: ref.current
                  ? ref.current.getBoundingClientRect().top +
                    ref.current.clientHeight +
                    window.scrollY
                  : undefined,
                minWidth: ref.current?.clientWidth,
              }}
            >
              <div
                className="absolute overflow-auto max-h-96 flex flex-col gap-1 w-full bg-white border border-solid border-gray-300 rounded-lg mt-2 px-2 pb-2 pt-2 shadow-lg"
                style={{ zIndex: 99999 }}
              >
                {searchInput && (
                  <div
                    className="sticky top-0 bg-white py-2"
                    style={{ zIndex: 100000 }}
                  >
                    <Input
                      inputSize="md"
                      placeholder="Search"
                      LeftIcon={
                        <MdOutlineSearch className="text-xl text-gray-500" />
                      }
                      onChange={(e) => {
                        onSearch?.(e.target.value);
                        if (!e.target.value) {
                          setData(list);
                          return;
                        }
                        setData((prev) =>
                          prev.filter((item) =>
                            item.label
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase())
                          )
                        );
                      }}
                    />
                  </div>
                )}
                {(data?.length
                  ? data
                  : [{ label: "Not Found", value: "Not Found", disabled: true }]
                )?.map((item, index) => (
                  <div
                    key={`${item.value}-${index}`}
                    onClick={() => {
                      if (item.disabled) return;
                      setShow((prev) => !prev);
                      setSelected(item);
                      onChange?.(item);
                    }}
                    className={`w-full rounded-lg flex items-center px-4 py-3 ${
                      !item.disabled ? "hover:bg-gray-100 cursor-pointer" : ""
                    }`}
                  >
                    <p
                      className={`text-sm font-poppins ${
                        item.disabled ? "text-gray-500" : ""
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
