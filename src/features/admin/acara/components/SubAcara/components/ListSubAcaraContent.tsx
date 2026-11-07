import { PageLayout } from "@features/_global/components/PageLayout";
import { MasterTable } from "@features/_global/components/Table/Master";
import {
  useSubAcaraCreation,
  useSubAcaraList,
} from "@features/_global/hooks/useSubAcara";
import { formatTime } from "@features/_global/lib/FormatTime";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ListSubAcaraContentProps {
  acaraId: string;
}

const ListSubAcaraContent: React.FC<ListSubAcaraContentProps> = ({
  acaraId,
}) => {
  const { data: subAcara, isLoading } = useSubAcaraList(acaraId);
  const mutation = useSubAcaraCreation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  return (
    <PageLayout
      title="Sub Acara"
      action={{
        show: true,
        buttonTitle: "Create Sub Acara",
        link: { to: `/admin/acara/${acaraId}/sub-acara/create` },
      }}
    >
      <MasterTable
        data={subAcara?.data}
        title={["Name", "Time"]}
        columnTable={[
          {
            return: (item) => (
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
              >
                {item.name}
              </Typography>
            ),
          },
          {
            return: (item) => (
              <Typography variant="small" color="blue-gray">
                {formatTime(item.startTime)} - {formatTime(item.endTime)}
              </Typography>
            ),
          },
        ]}
        isLoading={isLoading}
        withAction
        action={{
          onDetail: (item) =>
            navigate(`/admin/acara/${acaraId}/sub-acara/${item.id}`),
          onUpdate: (item) =>
            navigate(`/admin/acara/${acaraId}/sub-acara/update/${item.id}`),
          onDelete: (item) => handleDelete(item.id),
        }}
      />
    </PageLayout>
  );
};

export default ListSubAcaraContent;
