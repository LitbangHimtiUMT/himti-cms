import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { TableItem } from "./Table/TableItem";
import { useStruktural, useStrukturalCreation } from "../hooks/useStruktural";

export const StrukturalContent: React.FC = () => {
  const { data: struktural, isLoading } = useStruktural();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const mutation = useStrukturalCreation();

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const pagination = {
    currentPage: struktural?.meta?.page || 1,
    totalPages: struktural?.meta?.totalPages || 1,
    onPageChange,
  };
  return (
    <>
      <PageLayout
        action={{
          show: true,
          buttonTitle: "Create Struktural",
          link: { to: "/admin/struktural/create" },
        }}
        title="Struktural"
        showPagination={
          !!(
            struktural?.data?.length &&
            !isLoading &&
            (struktural.meta?.totalData as number) >
              (struktural?.meta?.perPage as number)
          )
        }
        pagination={pagination}
      >
        <Table>
          <TableHead field={["Image", "Name", "NIM", "Jabatan", "Action"]} />
          <TableBody>
            {isLoading || mutation.isPending ? (
              <SimpleLoadingTable ColSpan={6} />
            ) : !struktural?.data?.length ? (
              <tr>
                <td colSpan={6}>
                  <EmptyData title="Struktural" action />
                </td>
              </tr>
            ) : (
              struktural?.data.map((item, index) => (
                <TableItem
                  key={index}
                  {...item}
                  show={index !== (struktural?.data?.length as number) - 1}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </PageLayout>
    </>
  );
};
