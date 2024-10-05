import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import { useAngkatan, useAngkatanCreation } from "../hooks/useAngkatan";
import { TableItem } from "./Table/TableItem";

export const AngkatanContent = () => {
  const { data: angkatans, isLoading } = useAngkatan();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const onPageChange = (page: number) =>
    setSearchParams({ ...queryParams, page: page.toString() });

  const mutation = useAngkatanCreation();
  const filtering = angkatans?.data?.filter(i => i.year !== 'all')

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const pagination = {
    currentPage: angkatans?.meta?.page || 1,
    totalPages: angkatans?.meta?.totalPages || 1,
    onPageChange,
  };
  return (
    <PageLayout
      title="Angkatan"
      action={{
        show: true,
        buttonTitle: "Create Angkatan",
        link: { to: "/admin/angkatan/create" },
      }}
      showPagination={
        !!(
          angkatans?.data?.length &&
          !isLoading &&
          (angkatans.meta?.totalData as number) >
            (angkatans?.meta?.perPage as number)
        )
      }
      pagination={pagination}
      searchField
      searchPlaceholder="Search Angkatan"
    >
      <Table>
        <TableHead field={["Year", "Status", "Action"]} />
        <TableBody>
          {isLoading ? (
            <SimpleLoadingTable ColSpan={5} />
          ) : (
            <>
              {filtering?.map((item, key) => (
                <TableItem
                  key={key}
                  handleDelete={handleDelete}
                  {...item}
                  show={key !== (angkatans?.data?.length as number) - 1}
                />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </PageLayout>
  );
};
