import { convertQueryParamsToObject } from "@features/_global/helper";
import { Typography } from "@material-tailwind/react";
import { ButtonHTMLAttributes, PropsWithChildren, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "../Pagination";
import { FiPlus, FiSearch, FiClock, FiX, FiArrowLeft } from "react-icons/fi";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {}

interface IPageLayoutProps extends PropsWithChildren {
  children?: React.ReactNode;
  title?: string;
  showPagination?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  action?: {
    buttonProps?: ButtonProps;
    buttonTitle?: string;
    show?: boolean;
    link?: {
      to?: string;
    };
    colorButton?: string;
  };
  headBackground?: string;
  searchField?: boolean;
  histories?: boolean;
  onClickHistories?: VoidFunction;
  searchPlaceholder?: string;
}

export const PageLayout: React.FC<IPageLayoutProps> = ({
  children,
  pagination = { currentPage: 1, totalPages: 1, onPageChange: () => {} },
  showPagination,
  title,
  action,
  searchField = false,
  searchPlaceholder = "Search...",
  histories,
  onClickHistories,
}) => {
  const renderAction = () => {
    if (!action?.show) return null;

    // Tombol header tadinya selalu sama persis: putih + ikon "+",
    // apa pun judulnya. Akibatnya "Cancel" di halaman Create/Update
    // kelihatan identik dengan "Create ..." di halaman list, padahal
    // 27 halaman Create/Update sudah mengoper colorButton: "red"
    // untuk Cancel — prop itu selama ini tidak pernah dibaca di sini.
    const isCancel =
      action?.buttonTitle === "Cancel" || action?.colorButton === "red";
    const isBack = action?.buttonTitle === "Back";
    const Icon = isCancel ? FiX : isBack ? FiArrowLeft : FiPlus;
    const buttonClassName = isCancel
      ? `px-5 py-2.5 bg-red-500 text-white rounded-lg font-semibold
         hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5
         transition-all duration-200 flex items-center gap-2
         focus:outline-none focus:ring-4 focus:ring-red-300/50
         border border-red-400 shadow-soft`
      : `px-5 py-2.5 bg-white text-primary-700 rounded-lg font-semibold
         hover:bg-white/95 hover:shadow-lg hover:-translate-y-0.5
         transition-all duration-200 flex items-center gap-2
         focus:outline-none focus:ring-4 focus:ring-white/30
         border border-white/20 shadow-soft`;

    const button = (
      <button {...action?.buttonProps} className={buttonClassName}>
        <Icon className="w-4 h-4 stroke-[3]" />
        {action?.buttonTitle}
      </button>
    );

    if (action.link) {
      return <Link to={action.link.to as string}>{button}</Link>;
    }

    return button;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const handeSearchChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setSearchParams({ ...queryParams, search: e.target.value });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchField, searchParams]
    );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
        {/* Header - Matching Sidebar Gradient */}
        <div className="bg-gradient-sidebar p-6 relative overflow-hidden">
          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            {title && (
              <div>
                <Typography
                  variant="h5"
                  className="text-white font-bold drop-shadow-sm"
                >
                  {title}
                </Typography>
              </div>
            )}
            <div className="flex items-center gap-3">{renderAction()}</div>
          </div>
        </div>

        {/* Search & Filters */}
        {(searchField || histories) && (
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-3">
              {searchField && (
                <div className="flex-1 min-w-[240px] max-w-md relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    onChange={handeSearchChange}
                    placeholder={searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg
                             focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                             transition-all duration-200 outline-none
                             text-sm font-poppins text-gray-700
                             placeholder:text-gray-400"
                  />
                </div>
              )}
              {histories && (
                <button
                  onClick={onClickHistories}
                  className="px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium
                           hover:bg-gray-50 hover:border-gray-400
                           transition-all duration-200 flex items-center gap-2
                           focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  <FiClock className="w-4 h-4" />
                  Histories
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>

      {/* Pagination */}
      {showPagination && <Pagination {...pagination} />}
    </div>
  );
};
