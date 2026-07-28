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
import { usePotentialUserKeys, usePotentialUserKeyCreation } from "../hooks/usePotentialUserKeys";

const PotentialUserKeysView: React.FC = () => {
  const { data: keysData, isLoading } = usePotentialUserKeys();
  const mutation = usePotentialUserKeyCreation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this potential user key?");
    if (!confirm) return;
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const list = keysData?.data || [];

  return (
    <>
      <AdminNavbar layout="Potential Keys" page="List Potential Keys" showBackButton={false} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
          action={{
            show: true,
            buttonTitle: "Create Key",
            link: { to: "/admin/potential-user-keys/create" },
          }}
          title="Potential User Keys"
        >
          <Table>
            <TableHead field={["Key", "Max Usage", "Usage Count", "Allowed Generations", "Expired At", "Action"]} />
            <TableBody>
              {isLoading || mutation.isPending ? (
                <SimpleLoadingTable ColSpan={6} />
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyData title="Potential User Keys" action />
                  </td>
                </tr>
              ) : (
                list.map((item, index) => (
                  <tr key={item.id} className={index !== list.length - 1 ? "border-b border-blue-gray-50" : ""}>
                    <td className="py-3 px-5">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {item.key}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.maxUsage}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.usageCount}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex flex-wrap gap-1">
                        {item.allowedGen?.map((gen) => (
                          <span key={gen} className="px-2 py-0.5 text-[10px] bg-blue-50 text-blue-600 rounded font-medium">
                            {gen}
                          </span>
                        )) || "-"}
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.expiredAt ? new Date(item.expiredAt).toLocaleString() : "-"}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography
                        as="button"
                        className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Typography>
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

export default PotentialUserKeysView;
