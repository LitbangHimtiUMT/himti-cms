import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import { useSubAcaraById } from "@features/_global/hooks/useSubAcara";
import { formatTime } from "@features/_global/lib/FormatTime";
import { Typography } from "@material-tailwind/react";
import React, { Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const DetailSubAcaraContent: React.FC = () => {
  const { data: subAcaraById, isLoading } = useSubAcaraById();
  const { acaraId } = useParams();

  const navigate = useNavigate();

  const image = subAcaraById?.data?.image;
  const showImage = typeof image === "string" && image.startsWith("http");

  return (
    <PageLayout
      title="Detail Sub Acara"
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
      {!isLoading && !subAcaraById?.data && (
        <EmptyData title="Sub Acara" action={false} />
      )}
      {!isLoading && subAcaraById?.data && (
        <div className="flex flex-col w-full justify-center items-center">
          {showImage && (
            <img
              src={image as string}
              alt={subAcaraById?.data?.name as string}
              className="h-full w-full object-cover max-w-xs rounded-2xl mb-5"
            />
          )}
          <div className="w-full">
            <Typography variant="h4" className="mb-2 text-center">
              {subAcaraById?.data?.name}
            </Typography>
            <Typography className="text-center text-gray-500 mb-4">
              Time: {formatTime(subAcaraById?.data?.startTime as Date)} -{" "}
              {formatTime(subAcaraById?.data?.endTime as Date)}
            </Typography>
            <Typography variant="h5" className="mb-2">
              Description :
            </Typography>
            <Typography>
              {subAcaraById?.data?.description
                ?.split("\n")
                .map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    <br />
                  </Fragment>
                ))}
            </Typography>
            <div className="flex justify-center mt-6">
              <Link
                to={`/admin/acara/${acaraId}/sub-acara/update/${subAcaraById?.data?.id}`}
              >
                <Typography
                  as="button"
                  className="text-sm font-semibold text-amber-600"
                >
                  Edit Sub Acara
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default DetailSubAcaraContent;
