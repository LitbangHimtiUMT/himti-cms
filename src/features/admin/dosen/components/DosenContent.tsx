import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import { useDosen } from "../hooks/useDosen";
import { TableItem } from "./Table/TableItem";

export const DosenContent = () => {
  const { data: dosens, isLoading } = useDosen();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const onPageChange = (page: number) =>
    setSearchParams({ ...queryParams, page: page.toString() });
  const pagination = {
    currentPage: dosens?.meta?.page || 1,
    totalPages: dosens?.meta?.totalPages || 1,
    onPageChange,
  };
  return (
    <PageLayout
      title="Dosen"
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
          field={["Name", "NIDN", "Email", "Lesson", "Status", "Action"]}
        />
        <TableBody>
          {isLoading ? (
            <SimpleLoadingTable ColSpan={5} />
          ) : (
            <>
              {dosens?.data?.map((item, key) => (
                <TableItem
                  key={key}
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
