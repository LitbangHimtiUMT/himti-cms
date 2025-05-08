import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useAcara, useAcaraCreation } from "@features/_global/hooks/useAcara";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { TableItem } from "./Table/TableItem";

export const AcaraContent: React.FC = () => {
  const { data: acara, isLoading } = useAcara();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const mutation = useAcaraCreation();

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const pagination = {
    currentPage: acara?.meta?.page || 1,
    totalPages: acara?.meta?.totalPages || 1,
    onPageChange,
  };
  return (
    <>
      <PageLayout
        action={{
          show: true,
          buttonTitle: "Create Acara",
          link: { to: "/admin/acara/create" },
        }}
        title="Acara"
        showPagination={
          !!(
            acara?.data?.length &&
            !isLoading &&
            (acara.meta?.totalData as number) > (acara?.meta?.perPage as number)
          )
        }
        searchField
        searchPlaceholder="Search Acara"
        pagination={pagination}
      >
        <Table>
          <TableHead field={["Image", "Name", "Time", "Event Type" ,"Status", "Action"]} />
          <TableBody>
            {isLoading || mutation.isPending ? (
              <SimpleLoadingTable ColSpan={6} />
            ) : !acara?.data?.length ? (
              <tr>
                <td colSpan={6}>
                  <EmptyData title="Acara" action />
                </td>
              </tr>
            ) : (
              acara?.data.map((item, index) => (
                <TableItem
                  linkDetail={`/admin/acara/${item.id}`}
                  linkUpdate={`/admin/acara/edit/${item.id}`}
                  key={index}
                  show={index !== (acara?.data?.length as number) - 1}
                  {...item}
                  isOpenAbsen={item.isOpen}
                  // id={item.id}
                  // title="Acara"
                  // endTime={item.endTime}
                  // startTime={item.startTime}
                  // image={item.image}
                  // isOpenAbsen={item.isOpen}
                  // name={item.name}
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
