import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import { useAcaraById } from "@features/_global/hooks/useAcara";
import { formatDate } from "@features/_global/lib/FormatTime";
import { Button, Chip } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListSubAcaraContent from "./SubAcara/components/ListSubAcaraContent";
import { subAcara } from "../model/acara";

const DetailAcaraContent: React.FC = () => {
  const { data: acaraById, isLoading } = useAcaraById();

  const navigate = useNavigate();

  // const { image, name, description, startTime, endTime, isOpenAbsen } = acaraById.data;
  if (!isLoading && !acaraById?.data) {
    navigate(-1);
    alert("Acara not found");
  }

  const [isDrawer, setIsDrawer] = useState(false);

  const handleIsDrawer = () => {
    setIsDrawer(!isDrawer);
  };

  return (
    <>
      <PageLayout
        title="Detail Acara"
        action={{
          show: true,
          buttonTitle: "Back",
          buttonProps: { onClick: () => navigate(-1) },
          colorButton: "white",
        }}
      >
        {isLoading && (
          <table className="w-full justify-center items-center">
            <tbody>
              <SimpleLoadingTable />
            </tbody>
          </table>
        )}
        {!isLoading && acaraById?.data && (
          <div className="flex flex-col w-full justify-center items-center">
            <img
              src={acaraById?.data?.image as string}
              alt={acaraById?.data?.name as string}
              className="h-full w-full object-cover max-w-xs rounded-2xl mb-5"
            />
            <div className="w-full">
              <Typography variant="h4" className="mb-2 text-center">
                {acaraById?.data?.name}
              </Typography>
              <Typography className="text-center text-gray-500 mb-1">
                Time: {formatDate(acaraById?.data?.startTime as Date)} -{" "}
                {formatDate(acaraById?.data?.endTime as Date)}
              </Typography>
              <div className="flex justify-center mb-4 items-center gap-1">
                <Typography className={`text-center`}>Status Absen:</Typography>
                <Chip
                  as="span"
                  variant="gradient"
                  color={acaraById?.data?.isOpenAbsen ? "green" : "red"}
                  value={acaraById?.data?.isOpenAbsen ? "Open" : "Close"}
                  className="px-2 text-[11px] font-medium w-fit inline-block"
                />
              </div>
              <Button className="w-full mb-4" onClick={handleIsDrawer}>Sub Acara</Button>
              <Typography variant="h5" className="mb-2">
                Description :
              </Typography>
              <Typography>
                {acaraById?.data?.description
                  ?.split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </Typography>
            </div>
          </div>
        )}
      </PageLayout>
      <ListSubAcaraContent
        name={acaraById?.data?.name as string}
        subAcara={acaraById?.data?.subAcara as subAcara[]}
        isDrawer={isDrawer}
        handleIsDrawer={handleIsDrawer}
        isLoading={isLoading}
      ></ListSubAcaraContent>
    </>
  );
};

export default DetailAcaraContent;
