import EmptyData from "@features/_global/EmptyData";
import { useAcara } from "@features/_global/hooks/useAcara";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export const authorsTableData = [
  {
    img: "/img/team-2.jpeg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: ["Manager", "Organization"],
    online: true,
    date: "23/04/18",
  },
  {
    img: "/img/team-1.jpeg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: ["Programator", "Developer"],
    online: false,
    date: "11/01/19",
  },
  {
    img: "/img/team-4.jpeg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: ["Executive", "Projects"],
    online: true,
    date: "19/09/17",
  },
  {
    img: "/img/team-3.jpeg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: ["Programator", "Developer"],
    online: true,
    date: "24/12/08",
  },
  {
    img: "/img/bruce-mars.jpeg",
    name: "Bruce Mars",
    email: "bruce@creative-tim.com",
    job: ["Manager", "Executive"],
    online: false,
    date: "04/10/21",
  },
  {
    img: "/img/team-2.jpeg",
    name: "Alexander",
    email: "alexander@creative-tim.com",
    job: ["Programator", "Developer"],
    online: false,
    date: "14/09/20",
  },
];

const Thead = ["Nama", "Mulai Acara", "Selesai Acara", "Gambar", "Status", ""];

const ListAcara: React.FC = () => {
  const { data: acara, isLoading } = useAcara();
  // const mutation = useAcaraCreation();

  // const [searchParams, setSearchParams] = useSearchParams();
  // const queryParams = convertQueryParamsToObject(searchParams.toString());
  // const handleChangePage = (page: number) => {
  //   setSearchParams({ ...queryParams, page: String(page) });
  // };

  // const handleDelete = async (id: string) => {
  //   await mutation.mutateAsync({
  //     type: "delete",
  //     id,
  //   });
  // };
  return (
    <>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            List Acara
          </Typography>
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
                acara?.data?.map((item) => <p>{item.name}</p>)
              )}
              {/* {authorsTableData.map(
                ({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={img}
                            alt={name}
                            size="sm"
                            variant="rounded"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {job[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )} */}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
};

export default ListAcara;
