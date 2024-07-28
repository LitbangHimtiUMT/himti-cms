import { convertQueryParamsToObject } from "@features/_global/helper";
import { openSidenavAtom } from "@features/admin/store/sidenav";
import {
  Breadcrumbs,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useSearchParams } from "react-router-dom";

const AdminNavbar: React.FC<{
  page: string;
  layout: string;
  searchField?: boolean;
}> = ({ page, layout, searchField = false }) => {
  const [openSidenav, setOpenSidenav] = useAtom(openSidenavAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const handeSearchChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setSearchParams({ ...queryParams, search: e.target.value });
      },
      [searchField, searchParams]
    );

  return (
    <Navbar
      color="transparent"
      className={`rounded-xl transition-all px-0 py-1`}
      fullWidth
    >
      <div className="flex justify-between gap-6 flex-row items-center">
        <div className="flex items-end justify-between capitalize w-full px-5">
          <div className="flex flex-col gap-3">
            <Breadcrumbs className={`bg-transparent p-0 transition-all`}>
              <Link to={`/admin/${layout}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {layout}
                </Typography>
              </Link>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {page}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h6" color="blue-gray">
              {page}
            </Typography>
          </div>
          {searchField && (
            <div className="w-72">
              <input
                onChange={handeSearchChange}
                type="text"
                placeholder="Search Anggota"
                className="bg-transparent text-gray-800 p-1.5 w-full border border-solid border-black duration-200 outline-none rounded-md focus:outline focus:outline-gray-600"
              />
            </div>
          )}
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(!openSidenav)}
          >
            <RxHamburgerMenu className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
};

export default AdminNavbar;
