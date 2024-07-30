import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
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
    link?: {
      to?: string;
    };
  };
  headBackground?: string;
}

export const PageLayout: React.FC<IPageLayoutProps> = ({
  children,
  pagination = { currentPage: 1, totalPages: 1, onPageChange: () => {} },
  showPagination,
  title,
  action,
  headBackground="gray",
}) => {
  const renderAction = () => {
    if (action?.show && action.link) {
      return (
        <Link to={action.link.to as string}>
          <Button {...action?.buttonProps} color="blue" variant="gradient">
            {action?.buttonTitle}
          </Button>
        </Link>
      );
    }

    if (action?.show) {
      return (
        <Button {...action?.buttonProps} color="blue" variant="gradient">
          {action?.buttonTitle}
        </Button>
      );
    }
    return null;
  };

  return (
    <div>
      <Card>
        <CardHeader
          variant="gradient"
          color={headBackground}
          className="mb-8 p-6 flex justify-between items-center"
        >
          {title && (
            <Typography variant="h6" color="white">
              {title}
            </Typography>
          )}
          {renderAction()}
        </CardHeader>
        <CardBody className="overflow-x-scroll px-4 pt-0 pb-2">
          {children}
        </CardBody>
      </Card>
      {showPagination && <Pagination {...pagination} />}
    </div>
  );
};
