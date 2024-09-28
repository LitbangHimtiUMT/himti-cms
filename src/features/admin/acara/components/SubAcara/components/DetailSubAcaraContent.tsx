import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import {
  useAbsensi,
  useSubAcaraById,
} from "@features/_global/hooks/useSubAcara";
import { formatDate } from "@features/_global/lib/FormatTime";
import { Chip, Typography } from "@material-tailwind/react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { TableItem } from "./Table/TableItem";

const DetailSubAcaraContent: React.FC = () => {
  const { data: subAcaraById, isLoading } = useSubAcaraById();
  const { data: absensi, isLoading: isLoadingAbsensi } = useAbsensi();

  const navigate = useNavigate();

  // const { image, name, description, startTime, endTime, isOpenAbsen } = subAcaraById.data;
  if (!isLoading && !absensi && !subAcaraById?.data) {
    navigate(-1);
    alert("Sub Acara not found");
  }

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
      {isLoading && isLoadingAbsensi && (
        <table className="w-full justify-center items-center">
          <tbody>
            <SimpleLoadingTable />
          </tbody>
        </table>
      )}
      {!isLoading && subAcaraById?.data && (
        <>
          <div className="flex flex-col w-full justify-center items-center">
            {/* <img
              src={subAcaraById?.data?.image as string}
              alt={subAcaraById?.data?.name as string}
              className="h-full w-full object-cover max-w-xs rounded-2xl mb-5"
            /> */}
            <div className="w-full">
              <Typography variant="h4" className="mb-2 text-center">
                {subAcaraById?.data?.name}
              </Typography>
              <Typography className="text-center text-gray-500 mb-1">
                Time: {formatDate(subAcaraById?.data?.startTime as Date)} -{" "}
                {formatDate(subAcaraById?.data?.endTime as Date)}
              </Typography>
              <div className="flex justify-center mb-4 items-center gap-1">
                <Typography className={`text-center`}>Status Absen:</Typography>
                <Chip
                  as="span"
                  variant="gradient"
                  // color={subAcaraById?.data?.isOpenAbsen ? "green" : "red"}
                  // value={subAcaraById?.data?.isOpenAbsen ? "Open" : "Close"}
                  className="px-2 text-[11px] font-medium w-fit inline-block"
                />
              </div>
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
              <Typography variant="h6" className="mb-2 mt-5">
                Data Absensi :
              </Typography>
              <Table>
                <TableHead field={["Image", "Name", "NIM", "Action"]} />
                <TableBody>
                  {!absensi?.data?.length ? (
                    <tr>
                      <td colSpan={6}>
                        <EmptyData title="Absensi" action />
                      </td>
                    </tr>
                  ) : (
                    absensi?.data?.map((item, index) => (
                      <TableItem
                        key={index}
                        show={index !== (absensi?.data?.length as number) - 1}
                        {...item}
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default DetailSubAcaraContent;
