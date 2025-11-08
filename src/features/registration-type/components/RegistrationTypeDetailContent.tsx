import { PageLayout } from "@features/_global/components/PageLayout";
import { Poppins } from "../../_global/components/Text";
import { formatTime } from "../../_global/lib/FormatTime";
import { useRegistrationTypeById } from "../hooks/useRegistrationType";
import { MasterTable } from "../../_global/components/Table/Master";
import { Card, CardBody } from "@material-tailwind/react";
import { useEventRegistrationByRegistrationType } from "@features/event-registration/hooks/useEventRegistration";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import { RegistrationEventTypeEnum } from "@core/model/registration-type";
import { Badge } from "../../_global/components/Badges";

export const RegistrationTypeDetailContent = () => {
  const { data: registrationType } = useRegistrationTypeById();
  const { data: eventRegistrations, isFetching: isFetchingRegistrations } =
    useEventRegistrationByRegistrationType();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const pagination = {
    currentPage: eventRegistrations?.meta?.page || 1,
    totalPages: eventRegistrations?.meta?.totalPages || 1,
    onPageChange,
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
      <div className="px-6">
        {/* Registration Type Information Card */}
        <Card className="mb-6">
          <CardBody>
            <div className="mb-4">
              <Poppins className="text-2xl font-bold">
                {registrationType?.data?.name || "-"}
              </Poppins>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Poppins className="text-gray-600 text-sm">Year</Poppins>
                <Poppins className="font-semibold">
                  {registrationType?.data?.year || "-"}
                </Poppins>
              </div>
              <div>
                <Poppins className="text-gray-600 text-sm">Type</Poppins>
                <Poppins className="font-semibold">
                  {registrationType?.data?.type
                    ? getTypeLabel(registrationType.data.type)
                    : "-"}
                </Poppins>
              </div>
              <div>
                <Poppins className="text-gray-600 text-sm">Status</Poppins>
                <Badge
                  variant={
                    registrationType?.data?.isActive ? "success" : "danger"
                  }
                >
                  {registrationType?.data?.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <Poppins className="text-gray-600 text-sm">Created At</Poppins>
                <Poppins className="font-semibold">
                  {registrationType?.data?.createdAt
                    ? formatTime(registrationType.data.createdAt)
                    : "-"}
                </Poppins>
              </div>
              <div>
                <Poppins className="text-gray-600 text-sm">
                  Total Registrations
                </Poppins>
                <Poppins className="font-semibold">
                  {eventRegistrations?.meta?.totalData || 0}
                </Poppins>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Event Registrations List */}
        <PageLayout
          title="Event Registrations"
          showPagination={
            !!(
              eventRegistrations?.data?.length &&
              !isFetchingRegistrations &&
              (eventRegistrations.meta?.totalData as number) >
                (eventRegistrations?.meta?.perPage as number)
            )
          }
          pagination={pagination}
          searchField
          searchPlaceholder="Search Registration..."
          action={{ show: false }}
        >
          <MasterTable
            border
            columnTable={[
              {
                return: (data) =>
                  data.image ? (
                    <img
                      className="w-32 h-32 object-cover"
                      src={data.image}
                      alt={data.name}
                    />
                  ) : (
                    "-"
                  ),
              },
              {
                return: (data) => <Poppins>{data.name}</Poppins>,
              },
              {
                return: (data) => <Poppins>{data.nim}</Poppins>,
              },
              {
                return: (data) => <Poppins>{data.phoneNumber}</Poppins>,
              },
              {
                return: (data) => <Poppins>{data.class}</Poppins>,
              },
              {
                return: (data) => (
                  <Poppins>{`${data.registrationType.name} ${data.registrationType.year}`}</Poppins>
                ),
              },
              {
                return: (data) => (
                  <Poppins>{formatTime(data.createdAt)}</Poppins>
                ),
              },
            ]}
            data={eventRegistrations?.data || []}
            isLoading={isFetchingRegistrations}
            title={["Image", "Name", "NIM", "Phone Number", "Class", "Event", "Submit Time"]}
          />
        </PageLayout>
      </div>
    </>
  );
};
