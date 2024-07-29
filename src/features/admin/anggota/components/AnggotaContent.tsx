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
import { useAnggota } from "../hooks/useAnggota";
import { TableItem } from "./Table/TableItem";

export const AnggotaContent: React.FC = () => {
  const { data: anggotas, isLoading } = useAnggota();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const onPageChange = (page: number) =>
    setSearchParams({ ...queryParams, page: page.toString() });

  const pagination = {
    currentPage: anggotas?.meta?.page || 1,
    totalPages: anggotas?.meta?.totalPages || 1,
    onPageChange,
  };
  return (
    <PageLayout
      title="Anggota"
      action={{
        show: true,
        buttonTitle: "Create Anggota",
      }}
      showPagination={
        !!(
          anggotas?.data?.length &&
          !isLoading &&
          (anggotas.meta?.totalData as number) >
            (anggotas?.meta?.perPage as number)
        )
      }
      pagination={pagination}
    >
      <Table>
        <TableHead
          field={["Name", "NIM", "Angkatan", "Email", "Role", "Action"]}
        />

        <TableBody>
          {isLoading ? (
            <SimpleLoadingTable ColSpan={6} />
          ) : (
            <>
              {anggotas?.data?.map(
                ({ angkatan, email, id, isActive, name, nim }, key) => (
                  <TableItem
                    key={key}
                    id={id}
                    angkatan={angkatan}
                    email={email}
                    isActive={isActive}
                    name={name}
                    nim={nim}
                    show={key !== (anggotas?.data?.length as number) - 1}
                  />
                )
              )}
            </>
          )}
        </TableBody>
      </Table>
    </PageLayout>
  );
};
