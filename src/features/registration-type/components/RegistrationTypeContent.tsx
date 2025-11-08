import { PageLayout } from "@features/_global/components/PageLayout";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MasterTable } from "../../_global/components/Table/Master";
import { Poppins } from "../../_global/components/Text";
import { formatTime } from "../../_global/lib/FormatTime";
import { useRegistrationType } from "../hooks/useRegistrationType";
import { Button } from "../../_global/components/Button";
import { RegistrationEventTypeEnum } from "@core/model/registration-type";
import { Badge } from "../../_global/components/Badges";

export const RegistrationTypeContent = () => {
  const { data: registrationTypes, isFetching } = useRegistrationType();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const navigate = useNavigate();

  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const pagination = {
    currentPage: registrationTypes?.meta?.page || 1,
    totalPages: registrationTypes?.meta?.totalPages || 1,
    onPageChange,
  };

  const handleRowClick = (id: string) => {
    navigate(`/admin/registration-type/${id}`);
  };

  const getTypeLabel = (type: RegistrationEventTypeEnum) => {
    switch (type) {
      case RegistrationEventTypeEnum.BOOTCAMP:
        return "Bootcamp";
      case RegistrationEventTypeEnum.SEMINAR:
        return "Seminar";
      case RegistrationEventTypeEnum.LEARNING_GROUP:
        return "Learning Group";
      default:
        return type;
    }
  };

  return (
    <>
      <PageLayout
        action={{
          show: true,
          buttonTitle: "Create Registration Type",
          link: { to: "/admin/registration-type/create" },
        }}
        title="Registration Type"
        showPagination={
          !!(
            registrationTypes?.data?.length &&
            !isFetching &&
            (registrationTypes.meta?.totalData as number) >
              (registrationTypes?.meta?.perPage as number)
          )
        }
        searchField
        searchPlaceholder="Search Registration Type..."
        pagination={pagination}
      >
        <MasterTable
          border
          columnTable={[
            {
              return: (data) => <Poppins>{data.name}</Poppins>,
            },
            {
              return: (data) => <Poppins>{data.year}</Poppins>,
            },
            {
              return: (data) => <Poppins>{getTypeLabel(data.type)}</Poppins>,
            },
            {
              return: (data) => (
                <Badge
                  rounded="md"
                  variant={data.isActive ? "success" : "danger"}
                >
                  {data.isActive ? "Active" : "Inactive"}
                </Badge>
              ),
            },
            {
              return: (data) => <Poppins>{formatTime(data.createdAt)}</Poppins>,
            },
            {
              return: (data) => (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleRowClick(data.id)}
                >
                  Detail
                </Button>
              ),
            },
          ]}
          data={registrationTypes?.data || []}
          isLoading={isFetching}
          title={["Name", "Year", "Type", "Status", "Created At", ""]}
        />
      </PageLayout>
    </>
  );
};
