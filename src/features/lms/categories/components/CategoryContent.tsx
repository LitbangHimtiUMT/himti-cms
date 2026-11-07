import { useState } from "react";
import { Button } from "../../../_global/components/Button";
import { SimpleLoadingTable } from "../../../_global/components/SimpleLoadingTable";
import { MasterTable } from "../../../_global/components/Table/Master";
import { Poppins } from "../../../_global/components/Text";
import { useCategories } from "../hooks/useCategories";
import { ModalEditCategory } from "./ModalEditCategory";
import { ModalDeleteCategory } from "./ModalDeleteCategory";
import { CategoriesModel } from "../../../../core/model/categories";

export const CategoryContent = () => {
  const { data: categories, isFetching, isError, refetch } = useCategories();
  const [editTarget, setEditTarget] = useState<CategoriesModel | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<CategoriesModel | undefined>();

  if (isFetching) {
    return <SimpleLoadingTable isTable={false} />;
  }

  return (
    <>
      <MasterTable
        title={["Name", "Class Count", ""]}
        data={categories?.data || []}
        isError={isError}
        onRetry={() => refetch()}
        columnTable={[
          {
            return: ({ name }) => (
              <>
                <Poppins>{name}</Poppins>
              </>
            ),
          },
          {
            return: ({ classCount }) => (
              <>
                <Poppins>{classCount}</Poppins>
              </>
            ),
          },
          {
            return: (row) => (
              <div className="w-full flex items-center justify-end">
                <div className="max-w-40 flex items-center justify-end">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="success"
                      onClick={() => setEditTarget(row)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setDeleteTarget(row)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
      <ModalEditCategory
        show={!!editTarget}
        onHide={() => setEditTarget(undefined)}
        category={editTarget}
      />
      <ModalDeleteCategory
        show={!!deleteTarget}
        onHide={() => setDeleteTarget(undefined)}
        id={deleteTarget?.id}
        name={deleteTarget?.name}
      />
    </>
  );
};
