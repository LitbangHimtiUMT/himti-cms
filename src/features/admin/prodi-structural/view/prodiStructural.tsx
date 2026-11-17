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
import { Typography, Chip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useProdiStructural, useProdiStructuralCreation } from "../hooks/useProdiStructural";
import { isProdiStructuralSigner } from "../model/prodiStructural";

const ProdiStructuralView: React.FC = () => {
  const { data: prodiData, isLoading } = useProdiStructural();
  const mutation = useProdiStructuralCreation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this prodi structural member?");
    if (!confirm) return;
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const list = prodiData?.data || [];

  return (
    <>
      <AdminNavbar layout="Prodi Structural" page="List Prodi Structural" showBackButton={false} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
          action={{
            show: true,
            buttonTitle: "Create Prodi Structural",
            link: { to: "/admin/prodi-structural/create" },
          }}
          title="Prodi Structural"
        >
          <Table>
            <TableHead field={["Image", "Name", "Role", "Bio", "Sequence", "Action"]} />
            <TableBody>
              {isLoading || mutation.isPending ? (
                <SimpleLoadingTable ColSpan={6} />
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyData title="Prodi Structural" action />
                  </td>
                </tr>
              ) : (
                list.map((item, index) => (
                  <tr key={item.id} className={index !== list.length - 1 ? "border-b border-blue-gray-50" : ""}>
                    <td className="py-3 px-5">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-[100px] h-[100px] object-cover rounded-md shadow"
                        />
                      ) : (
                        <div className="w-[100px] h-[100px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-5">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {item.name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex flex-col gap-1">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.role}
                        </Typography>
                        {isProdiStructuralSigner(item.role) && !item.signatureImage && (
                          <Chip
                            variant="gradient"
                            color="red"
                            value="TTD belum diupload"
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-xs text-blue-gray-600 max-w-xs truncate">
                        {item.bio || "-"}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item.sequence}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <Link to={`/admin/prodi-structural/edit/${item.id}`}>
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

export default ProdiStructuralView;
