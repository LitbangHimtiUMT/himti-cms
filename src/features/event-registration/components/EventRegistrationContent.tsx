import { PageLayout } from "@features/_global/components/PageLayout";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import { MasterTable } from "../../_global/components/Table/Master";
import { Poppins } from "../../_global/components/Text";
import { formatTime } from "../../_global/lib/FormatTime";
import { useEventRegistration } from "../hooks/useEventRegistration";

export const EventRegistrationContent = () => {
  const { data: eventRegistrations, isFetching } = useEventRegistration();
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

  return (
    <>
      <PageLayout
        action={{
          show: true,
          buttonTitle: "Create Registration",
          link: { to: "/admin/event-registration/create" },
        }}
        title="Event Registration"
        showPagination={
          !!(
            eventRegistrations?.data?.length &&
            !isFetching &&
            (eventRegistrations.meta?.totalData as number) >
              (eventRegistrations?.meta?.perPage as number)
          )
        }
        searchField
        searchPlaceholder="Search Registration..."
        pagination={pagination}
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
              return: (data) => <Poppins>{data.class}</Poppins>,
            },
            {
              return: (data) => <Poppins>{data.material}</Poppins>,
            },
            {
              return: (data) => <Poppins>{formatTime(data.createdAt)}</Poppins>,
            },
          ]}
          data={eventRegistrations?.data || []}
          isLoading={isFetching}
          title={["Image", "Name", "Class", "Material", "Submit Time"]}
        />
      </PageLayout>
    </>
  );
};
