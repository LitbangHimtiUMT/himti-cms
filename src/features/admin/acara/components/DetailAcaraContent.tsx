import { PageLayout } from "@features/_global/components/PageLayout";
import { useAcaraById } from "@features/_global/hooks/useAcara";
import { formatDate } from "@features/_global/lib/FormatTime";
import { Chip } from "@material-tailwind/react";
import {
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DetailAcaraContent: React.FC = () => {
  const { data: acaraById } = useAcaraById();

  const navigate = useNavigate();

  if (!acaraById) {
    return <div>Loading...</div>;
  }

  // const { image, name, description, startTime, endTime, isOpenAbsen } = acaraById.data;

  return (
    <PageLayout
      title="Detail Acara"
      action={{ show: true, link: { to: "/admin/acara" }, buttonTitle: "Back" }}
    >
      <div className="flex flex-col w-full justify-center items-center">
        <img
          src={acaraById?.data?.image as string}
          alt={acaraById?.data?.name as string}
          className="h-full w-full object-cover max-w-md rounded-2xl"
        />
        <div className="w-full">
          <Typography variant="h5" className="mb-2 text-center">
            {acaraById?.data?.name}
          </Typography>
          <Typography className="text-center text-gray-500 mb-4">
            Time: {formatDate(acaraById?.data?.startTime as Date)} -{" "}
            {formatDate(acaraById?.data?.endTime as Date)}
          </Typography>
          <Typography className={`text-center mb-4`}>
            Status Absen:
            <Chip
              variant="gradient"
              color={acaraById?.data?.isOpenAbsen ? "green" : "red"}
              value={acaraById?.data?.isOpenAbsen ? "Open" : "Close"}
              className="py-0.5 px-2 text-[11px] font-medium w-fit inline-block"
            />
          </Typography>
          <Typography>
            {acaraById?.data?.description?.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </div>
      </div>
    </PageLayout>
  );
};

export default DetailAcaraContent;
