import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Pagination } from "../Pagination";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {}

interface IPageLayoutProps extends PropsWithChildren {
  children?: React.ReactNode;
  title?: string;
  showPagination?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  action?: {
    buttonProps?: ButtonProps;
    buttonTitle?: string;
    show?: boolean;
  };
}

export const PageLayout: React.FC<IPageLayoutProps> = ({
  children,
  pagination = { currentPage: 1, totalPages: 1, onPageChange: () => {} },
  showPagination,
  title,
  action,
}) => {
  return (
    <div>
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          {title && (
            <Typography variant="h6" color="white">
              {title}
            </Typography>
          )}
          {action?.show && (
            <Button {...action?.buttonProps} color="blue" variant="gradient">
              {action?.buttonTitle}
            </Button>
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
