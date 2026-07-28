import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { usePeriode, usePeriodeCreation } from "../hooks/usePeriode";

const PeriodeView: React.FC = () => {
  const { data: periodesData, isLoading } = usePeriode();
  const mutation = usePeriodeCreation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this period?");
    if (!confirm) return;
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const list = periodesData?.data || [];

  return (
    <>
      <AdminNavbar layout="Tenure Period" page="List Period" showBackButton={false} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
          action={{
            show: true,
            buttonTitle: "Create Period",
            link: { to: "/admin/periode/create" },
          }}
          title="Tenure Period Vision & Mission"
        >
          <Table>
            <TableHead field={["Logo", "Period", "Name", "Vision", "Status", "Action"]} />
            <TableBody>
              {isLoading || mutation.isPending ? (
                <SimpleLoadingTable ColSpan={6} />
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyData title="Periods" action />
                  </td>
                </tr>
              ) : (
                list.map((item, index) => (
                  <tr key={item.id} className={index !== list.length - 1 ? "border-b border-blue-gray-50" : ""}>
                    <td className="py-3 px-5">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-[80px] h-[80px] object-contain rounded-md shadow bg-gray-50 p-1"
                        />
                      ) : (
                        <div className="w-[80px] h-[80px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">
                          No Logo
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-5">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {item.period}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-xs text-blue-gray-600 max-w-xs truncate">
                        {item.vision || "-"}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          item.isActive
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <Link to={`/admin/periode/edit/${item.id}`}>
                          <Typography as="span" className="text-xs font-semibold text-yellow-900 hover:underline cursor-pointer">
                            Edit
                          </Typography>
                        </Link>
                        <Typography
                          as="button"
                          className="text-xs font-semibold text-red-600 hover:text-red-800 hover:underline transition-colors"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Typography>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </TableBody>
          </Table>
        </PageLayout>
      </div>
    </>
  );
};

export default PeriodeView;
