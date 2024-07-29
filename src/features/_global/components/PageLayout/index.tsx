import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { PropsWithChildren } from "react";
import { Pagination } from "../Pagination";

interface IPageLayoutProps extends PropsWithChildren {
  children?: React.ReactNode;
  title?: string;
  showPagination?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export const PageLayout: React.FC<IPageLayoutProps> = ({
  children,
  pagination = { currentPage: 1, totalPages: 1, onPageChange: () => {} },
  showPagination,
  title,
}) => {
  return (
    <div>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          {title && (
            <Typography variant="h6" color="white">
              {title}
            </Typography>
          )}
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {children}
        </CardBody>
      </Card>
      {showPagination && <Pagination {...pagination} />}
    </div>
  );
};
