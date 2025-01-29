import { Button } from "../../../_global/components/Button";
import { Loading } from "../../../_global/components/Loading";
import { MasterTable } from "../../../_global/components/Table/Master";
import { Poppins } from "../../../_global/components/Text";
import { useCategories } from "../hooks/useCategories";

export const CategoryContent = () => {
  const { data: categories, isFetching } = useCategories();

  if (isFetching) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <MasterTable
        title={["Name", "Class Count", ""]}
        data={categories?.data || []}
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
            return: () => (
              <div className="w-full flex items-center justify-end">
                <div className="max-w-40 flex items-center justify-end">
                  <div className="flex items-center gap-2">
                    <Button variant="success">Update</Button>
                    <Button variant="danger">Delete</Button>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
    </>
  );
};
