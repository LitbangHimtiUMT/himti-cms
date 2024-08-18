import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { useSubAcaraCreation } from "@features/_global/hooks/useSubAcara";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import React from "react";
import { subAcara } from "../../../model/acara";
import { TableItem } from "../../Table/TableItem";

interface ListSubAcaraContentProps {
  name: string;
  subAcara: subAcara[];
  isDrawer: boolean;
  handleIsDrawer: () => void;
  isLoading: boolean;
  acaraId: string;
}

const ListSubAcaraContent: React.FC<ListSubAcaraContentProps> = ({
  name,
  subAcara,
  isDrawer,
  handleIsDrawer,
  isLoading,
  acaraId,
}) => {
  const mutation = useSubAcaraCreation();

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };
  return (
    <Drawer
      size={500}
      placement="bottom"
      open={isDrawer}
      onClose={handleIsDrawer}
      className="p-4 overflow-auto"
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h4" className="mb-2" color="blue-gray">
          Acara {name}
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={handleIsDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <PageLayout
        action={{
          show: true,
          buttonTitle: "Create Sub Acara",
          link: { to: `/admin/acara/${acaraId}/sub-acara/create` },
        }}
        title="Sub Acara"
      >
        <Table>
          <TableHead field={["Name", "Time", "Status", "Action"]} />
          <TableBody>
            {isLoading ? (
              <SimpleLoadingTable ColSpan={6} />
            ) : !subAcara?.length ? (
              <tr>
                <td colSpan={6}>
                  <EmptyData title="Sub Acara" action />
                </td>
              </tr>
            ) : (
              subAcara.map((item, index) => (
                <TableItem
                  link={"sub-acara"}
                  key={index}
                  show={index !== (subAcara.length as number) - 1}
                  {...item}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </PageLayout>
    </Drawer>
  );
};

export default ListSubAcaraContent;
