import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import { useDosen, useDosenCreation } from "../hooks/useDosen";
import { TableItem } from "./Table/TableItem";

export const DosenContent = () => {
  const { data: dosens, isLoading } = useDosen();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const onPageChange = (page: number) =>
    setSearchParams({ ...queryParams, page: page.toString() });

  const mutation = useDosenCreation();

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const pagination = {
    currentPage: dosens?.meta?.page || 1,
    totalPages: dosens?.meta?.totalPages || 1,
    onPageChange,
  };
  return (
    <PageLayout
      title="Dosen"
      action={{
        show: true,
        buttonTitle: "Create Dosen",
        link: { to: "/admin/dosen/create" },
      }}
      showPagination={
        !!(
          dosens?.data?.length &&
          !isLoading &&
          (dosens.meta?.totalData as number) > (dosens?.meta?.perPage as number)
        )
      }
      pagination={pagination}
      searchField
      searchPlaceholder="Search Dosen"
    >
      <Table>
        <TableHead
          field={["NIDN", "Name", "Number Phone", "Email", "Lesson", "Action"]}
        />
        <TableBody>
          {isLoading ? (
            <SimpleLoadingTable ColSpan={5} />
          ) : (
            <>
              {dosens?.data?.map((item, key) => (
                <TableItem
                  key={key}
                  handleDelete={handleDelete}
                  {...item}
                  show={key !== (dosens?.data?.length as number) - 1}
                />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </PageLayout>
  );
};
