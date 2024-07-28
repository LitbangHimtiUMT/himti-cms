import EmptyData from "@features/_global/EmptyData";
import { useAcara, useAcaraCreation } from "@features/_global/hooks/useAcara";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import ItemAcara from "./ItemAcara";

const Thead = ["Image", "Name", "Time", "Status", "Action"];

const ListAcara: React.FC = () => {
  const { data: acara, isLoading } = useAcara();
  const mutation = useAcaraCreation();

  // const [searchParams, setSearchParams] = useSearchParams();
  // const queryParams = convertQueryParamsToObject(searchParams.toString());
  // const handleChangePage = (page: number) => {
  //   setSearchParams({ ...queryParams, page: String(page) });
  // };

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };
  return (
    <>
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            List Acara
          </Typography>
          <Button color="blue" variant="gradient">
            Tambah Acara
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {Thead.map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <>
                  <tr>
                    <td colSpan={6}>
                      <div className="flex w-full h-48 justify-center items-center text-black">
                        Loading...
                      </div>
                    </td>
                  </tr>
                </>
              ) : !acara?.data?.length ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyData title="Acara" action />
                  </td>
                </tr>
              ) : (
                // acara?.data?.map((item) => <p>{item.name}</p>)
                acara?.data.map(
                  ({ name, startTime, endTime, isOpen, image, id }, index) => {
                    const className = `py-3 px-5 ${
                      index === (acara?.data?.length as number) - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <ItemAcara
                        key={index}
                        className={className}
                        name={name as string}
                        startTime={startTime as Date}
                        endTime={endTime as Date}
                        isOpen={isOpen as boolean}
                        image={image as string}
                        handleDelete={handleDelete}
                        id={id as string}
                      />
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
};

export default ListAcara;
