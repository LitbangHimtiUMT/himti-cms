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
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TableItem } from "./Table/TableItem";
import { DrawerHistories } from "../../../histories/components/DrawerHistories";
import { HistoryModuleEnum } from "../../../../core/model/histories";

type EventFilter = "all" | "active" | "archive";

export const AcaraContent: React.FC = () => {
  const [filter, setFilter] = useState<EventFilter>("active");
  const { data: acara, isLoading } = useAcara({
    ...(filter === "all"
      ? { withDeleted: "true" }
      : filter === "active"
      ? undefined
      : {
          onlyDeleted: "true",
        }),
  });
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

  const changeFilterEvent = (filter: EventFilter) => {
    setFilter(filter);
    onPageChange(1);
  };

  const pagination = {
    currentPage: acara?.meta?.page || 1,
    totalPages: acara?.meta?.totalPages || 1,
    onPageChange,
  };

  const [show, setShow] = useState(false);
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
        histories
        searchField
        searchPlaceholder="Search Acara"
        onClickHistories={() => setShow(prev => !prev)}
        pagination={pagination}
      >
        <div className="flex items-center gap-5">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => changeFilterEvent("all")}
          >
            <input
              type="radio"
              name="radio-1"
              className="radio w-5 h-5"
              checked={filter === "all"}
            />
            <p>All</p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => changeFilterEvent("active")}
          >
            <input
              type="radio"
              name="radio-1"
              className="radio w-5 h-5"
              checked={filter === "active"}
            />
            <p>Active</p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => changeFilterEvent("archive")}
          >
            <input
              type="radio"
              name="radio-1"
              className="radio w-5 h-5"
              checked={filter === "archive"}
            />
            <p>Archive</p>
          </div>
        </div>
        <Table>
          <TableHead
            field={["Image", "Name", "Time", "Event Type", "Status", "Action"]}
          />
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
                  handleDelete={handleDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </PageLayout>
      <DrawerHistories
        module={HistoryModuleEnum.EVENT}
        onHide={() => setShow(prev => !prev)}
        show={show}
      />
    </>
  );
};
