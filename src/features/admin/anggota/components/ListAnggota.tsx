import { Pagination } from "@features/_global/components/Pagination";
import { convertQueryParamsToObject } from "@features/_global/helper";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAnggota } from "../hooks/useAnggota";

export const ListAnggota: React.FC = () => {
  const { data: users, isLoading } = useAnggota();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const onChangePage = (page: number) =>
    setSearchParams({ ...queryParams, page: page.toString() });
  return (
    <div>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Anggota
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "NIM", "Angkatan", "Email", "Role", "Action"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex items-center justify-center w-full h-[300px]">
                      <p>Loading...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {users?.data?.map(
                    ({ name, nim, email, isActive, angkatan }, key) => {
                      const className = `py-3 px-5 ${
                        key === (users?.data?.length as number) - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={name}>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {nim}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {angkatan.year}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {email || "-"}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={isActive ? "green" : "red"}
                              value={isActive ? "Active" : "Non-Active"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>

                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              Edit
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Pagination
        currentPage={users?.meta?.page as number}
        totalPages={users?.meta?.totalPages as number}
        onPageChange={onChangePage}
      />
    </div>
  );
};
