import { PageLayout } from "@features/_global/components/PageLayout";
import { Poppins } from "../../_global/components/Text";
import { formatTime } from "../../_global/lib/FormatTime";
import { useRegistrationTypeById, useRegistrationTypeCreation, useRegistrationTypeToggleStatus } from "../hooks/useRegistrationType";
import { MasterTable } from "../../_global/components/Table/Master";
import { Card, CardBody, Switch } from "@material-tailwind/react";
import { useEventRegistrationByRegistrationType } from "@features/event-registration/hooks/useEventRegistration";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RegistrationEventTypeEnum } from "@core/model/registration-type";
import { Badge } from "../../_global/components/Badges";
import { Button } from "../../_global/components/Button";
import { CONFIG_APP } from "@core/configs/app";

export const RegistrationTypeDetailContent = () => {
  const { data: registrationType } = useRegistrationTypeById();
  const { data: eventRegistrations, isFetching: isFetchingRegistrations } =
    useEventRegistrationByRegistrationType();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const navigate = useNavigate();
  const mutation = useRegistrationTypeCreation();
  const toggleStatusMutation = useRegistrationTypeToggleStatus();

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

  const handleEdit = () => {
    navigate(`/admin/registration-type/update/${registrationType?.data?.id}`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this registration type?"
    );
    if (!confirm) return;

    await mutation.mutateAsync({
      type: "delete",
      data: {
        registrationTypeId: registrationType?.data?.id,
      },
    });
  };

  const handleToggleStatus = async () => {
    if (!registrationType?.data) return;

    await toggleStatusMutation.mutateAsync({
      registrationTypeId: registrationType.data.id,
      isActive: !registrationType.data.isActive,
    });
  };

  return (
    <>
      <div className="px-6">
        {/* Registration Type Information Card */}
        <Card className="mb-6">
          <CardBody>
            <div className="mb-4 flex justify-between items-center">
              <Poppins className="text-2xl font-bold">
                {registrationType?.data?.name || "-"}
              </Poppins>
              <div className="flex gap-2">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={handleEdit}
                  disabled={mutation.isPending}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDelete}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {registrationType?.data?.image && (
                <div className="col-span-1 md:col-span-2 lg:col-span-4 mb-2">
                  <Poppins className="text-gray-600 text-sm mb-1">Banner / Image</Poppins>
                  <img
                    src={registrationType.data.image}
                    alt={registrationType.data.name}
                    className="w-48 h-32 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
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
                <div className="flex items-center gap-2 mt-1">
                  <Switch
                    checked={registrationType?.data?.isActive}
                    onChange={handleToggleStatus}
                    disabled={toggleStatusMutation.isPending}
                    color="green"
                  />
                  <Badge
                    variant={
                      registrationType?.data?.isActive ? "success" : "danger"
                    }
                  >
                    {registrationType?.data?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
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
                <Poppins className="text-gray-600 text-sm">Link WA Group</Poppins>
                {registrationType?.data?.link ? (
                  <a
                    href={registrationType.data.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline font-semibold truncate block"
                  >
                    {registrationType.data.link}
                  </a>
                ) : (
                  <Poppins className="font-semibold text-gray-400">-</Poppins>
                )}
              </div>
              <div>
                <Poppins className="text-gray-600 text-sm mb-1">
                  Total Registrations
                </Poppins>
                <Poppins className="font-semibold text-lg mb-2">
                  {eventRegistrations?.meta?.totalData || 0}
                </Poppins>
                
                {/* Download Absensi Buttons */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-xs font-semibold text-gray-500">Download Absensi:</span>
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <a
                        href={`${CONFIG_APP.BASE_URL}/event-registration/registration-type/${registrationType?.data?.id}/export-absensi?category=MAHASISWA&format=docx`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 text-xs font-medium bg-emerald-600 text-white rounded-l-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
                        title="Download Absensi Mahasiswa UMT (.docx)"
                      >
                        📄 Mhs UMT (.docx)
                      </a>
                      <a
                        href={`${CONFIG_APP.BASE_URL}/event-registration/registration-type/${registrationType?.data?.id}/export-absensi?category=MAHASISWA&format=pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 text-xs font-medium bg-rose-600 text-white rounded-r-lg hover:bg-rose-700 transition-colors flex items-center gap-1 border-l border-emerald-700"
                        title="Download Absensi Mahasiswa UMT (.pdf)"
                      >
                        📕 PDF
                      </a>
                    </div>

                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <a
                        href={`${CONFIG_APP.BASE_URL}/event-registration/registration-type/${registrationType?.data?.id}/export-absensi?category=UMUM&format=docx`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 text-xs font-medium bg-blue-600 text-white rounded-l-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                        title="Download Absensi Peserta Umum (.docx)"
                      >
                        📄 Umum (.docx)
                      </a>
                      <a
                        href={`${CONFIG_APP.BASE_URL}/event-registration/registration-type/${registrationType?.data?.id}/export-absensi?category=UMUM&format=pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 text-xs font-medium bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors flex items-center gap-1 border-l border-blue-700"
                        title="Download Absensi Peserta Umum (.pdf)"
                      >
                        📕 PDF
                      </a>
                    </div>
                  </div>
                </div>
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
                return: (data) => <Poppins>{data.nim || "-"}</Poppins>,
              },
              {
                return: (data) => <Poppins>{data.prodi || "-"}</Poppins>,
              },
              {
                return: (data) => <Poppins>{data.institution || "-"}</Poppins>,
              },
              {
                return: (data) => <Poppins>{data.phoneNumber || "-"}</Poppins>,
              },
              {
                return: (data) => <Poppins>{data.class || "-"}</Poppins>,
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
            title={["Image", "Name", "NIM", "Prodi", "Instansi", "Phone Number", "Class", "Event", "Submit Time"]}
          />
        </PageLayout>
      </div>
    </>
  );
};
