import { Typography } from "@material-tailwind/react";
import { Button } from "../Button";
import { EmptyState } from "../Empty";
import { Loading } from "../Loading";

interface DefaultKey {
  id: number | string;
}

interface ColumnTable<T> {
  return?: (record: T) => React.ReactNode | string;
}

interface IMasterTableProps<T extends DefaultKey> {
  data?: T[];
  title: string[];
  isLoading?: boolean;
  withAction?: boolean;
  columnTable: ColumnTable<T>[];
  border?: boolean;
  action?: {
    onDelete?: (data: T) => void;
    onUpdate?: (data: T) => void;
    onDetail?: (data: T) => void;
  };
}

export const MasterTable = <T extends DefaultKey>({
  data,
  title,
  withAction,
  columnTable,
  isLoading,
  border,
  action,
}: IMasterTableProps<T>) => {
  return (
    <div
      className={`${
        border
          ? "border-[1.5px] border-solid border-[#cdcdcd] bg-[#fefefe]"
          : ""
      } overflow-auto rounded-md`}
    >
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {title?.map((item, index) => (
              <th
                key={index}
                className="border-b border-blue-gray-50 py-3 px-4 text-left"
              >
                <Typography
                  variant="small"
                  className="text-[11px] font-bold uppercase text-blue-gray-400"
                >
                  {item}
                </Typography>
              </th>
            ))}
            {withAction ? <th></th> : null}
          </tr>
        </thead>
        <tbody className="w-full">
          {data?.length ? (
            data?.map((item, index) => (
              <tr
                className={`
                  ${
                    index === (data?.length as number) - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`}
              >
                {columnTable.map((column, index) => (
                  <td key={index} className="p-4 text-left">
                    {column.return ? column.return(item) : null}
                  </td>
                ))}
                {withAction && (
                  <td className="p-4">
                    <div className="md:w-36 flex items-center justify-center gap-2">
                      <Button
                        size="md"
                        onClick={() => action?.onDetail?.(item)}
                      >
                        Detail
                      </Button>
                      <Button
                        size="md"
                        variant="success"
                        onClick={() => action?.onUpdate?.(item)}
                      >
                        Update
                      </Button>
                      <Button
                        size="md"
                        variant="danger"
                        onClick={() => action?.onDelete?.(item)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : isLoading ? (
            <td colSpan={columnTable.length + (withAction ? 1 : 0)}>
              <Loading />
            </td>
          ) : (
            <EmptyState
              colspan={columnTable.length + (withAction ? 1 : 0)}
              description={[
                "Data is not found.",
                "Create a new data to views of list.",
              ]}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};
