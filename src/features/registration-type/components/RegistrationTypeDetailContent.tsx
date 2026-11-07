import { useMemo, useState } from "react";
import { PageLayout } from "@features/_global/components/PageLayout";
import { Poppins } from "../../_global/components/Text";
import { formatTime } from "../../_global/lib/FormatTime";
import {
  useRegistrationTypeById,
  useRegistrationTypeCreation,
  useRegistrationTypeToggleStatus,
} from "../hooks/useRegistrationType";
import { MasterTable } from "../../_global/components/Table/Master";
import { Card, CardBody, Switch } from "@material-tailwind/react";
import { useEventRegistrationByRegistrationType } from "@features/event-registration/hooks/useEventRegistration";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RegistrationEventTypeEnum } from "@core/model/registration-type";
import { Badge } from "../../_global/components/Badges";
import { Button } from "../../_global/components/Button";
import { CONFIG_APP } from "@core/configs/app";
import {
  Download,
  FileSpreadsheet,
  FileText,
  FileType,
  GraduationCap,
  Globe2,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type DownloadKey = `${"MAHASISWA" | "UMUM"}-${"docx" | "pdf"}`;

// Match the API-side logic for MAHASISWA vs UMUM classification.
const isUmumRegistration = (reg: {
  nim?: string | null;
  class?: string | null;
  institution?: string | null;
}): boolean => {
  const institutionLower = (reg.institution ?? "").toLowerCase();
  const isUmt =
    institutionLower === "universitas muhammadiyah tangerang" ||
    institutionLower === "umt";
  return (
    reg.nim === "-" ||
    !reg.nim ||
    (reg.class ?? "").toLowerCase().includes("umum") ||
    (!!reg.institution && !isUmt)
  );
};

export const RegistrationTypeDetailContent = () => {
  const { data: registrationType } = useRegistrationTypeById();
  const {
    data: eventRegistrations,
    isFetching: isFetchingRegistrations,
    isError: isErrorRegistrations,
    refetch: refetchRegistrations,
  } = useEventRegistrationByRegistrationType();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const navigate = useNavigate();
  const mutation = useRegistrationTypeCreation();
  const toggleStatusMutation = useRegistrationTypeToggleStatus();

  const [downloadingKey, setDownloadingKey] = useState<DownloadKey | null>(
    null
  );

  const isBootcamp =
    registrationType?.data?.type === RegistrationEventTypeEnum.BOOTCAMP;

  // Fetch ALL registrations for bootcamp Excel export (no pagination limit)
  const { data: allRegistrations } = useEventRegistrationByRegistrationType({
    page: 1,
    perPage: 9999,
    enabled: isBootcamp,
  });

  const [isExportingBootcamp, setIsExportingBootcamp] = useState(false);

  const handleExportBootcampExcel = async () => {
    if (!allRegistrations?.data?.length) return;
    setIsExportingBootcamp(true);

    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "HIMTI CMS";
      workbook.created = new Date();

      const sheetName =
        `Pendaftaran ${registrationType?.data?.name ?? "Bootcamp"}`.slice(0, 31);
      const worksheet = workbook.addWorksheet(sheetName);

      // ── Column definitions ──
      const columns = [
        { header: "No", key: "no", width: 6 },
        { header: "Nama", key: "nama", width: 28 },
        { header: "NIM", key: "nim", width: 16 },
        { header: "Prodi", key: "prodi", width: 22 },
        { header: "Instansi", key: "instansi", width: 28 },
        { header: "No. HP", key: "hp", width: 18 },
        { header: "Kelas", key: "kelas", width: 14 },
        { header: "Kategori", key: "kategori", width: 18 },
        { header: "Link Bukti Transfer", key: "buktiTf", width: 45 },
        { header: "Waktu Daftar", key: "waktu", width: 22 },
      ];

      // ── Title row (merged) ──
      const eventTitle = `DATA PENDAFTARAN ${registrationType?.data?.name ?? "BOOTCAMP"} ${registrationType?.data?.year ?? ""}`.toUpperCase().trim();
      worksheet.mergeCells(1, 1, 1, columns.length);
      const titleCell = worksheet.getCell("A1");
      titleCell.value = eventTitle;
      titleCell.font = { name: "Calibri", size: 16, bold: true, color: { argb: "FFFFFFFF" } };
      titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E3A8A" } }; // HIMTI Navy/Blue
      titleCell.alignment = { horizontal: "center", vertical: "middle" };
      worksheet.getRow(1).height = 40;

      // ── Subtitle row (merged) ──
      const subtitle = `HIMTI UMT • Diekspor pada: ${formatTime(new Date())} — Total: ${allRegistrations.data.length} pendaftar`;
      worksheet.mergeCells(2, 1, 2, columns.length);
      const subtitleCell = worksheet.getCell("A2");
      subtitleCell.value = subtitle;
      subtitleCell.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
      subtitleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF97316" } }; // HIMTI Orange
      subtitleCell.alignment = { horizontal: "center", vertical: "middle" };
      worksheet.getRow(2).height = 24;

      // ── Header row (row 3) ──
      worksheet.columns = columns.map((col) => ({
        key: col.key,
        width: col.width,
      }));

      const headerRow = worksheet.getRow(3);
      columns.forEach((col, idx) => {
        const cell = headerRow.getCell(idx + 1);
        cell.value = col.header;
        cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E293B" } }; // Slate / Dark Navy
        cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
        cell.border = {
          top: { style: "medium", color: { argb: "FFF97316" } }, // Orange accent border
          bottom: { style: "medium", color: { argb: "FF1E3A8A" } },
          left: { style: "thin", color: { argb: "FFCBD5E1" } },
          right: { style: "thin", color: { argb: "FFCBD5E1" } },
        };
      });
      headerRow.height = 28;

      // ── Data rows ──
      const thinBorder: Partial<ExcelJS.Borders> = {
        top: { style: "thin", color: { argb: "FFCBD5E1" } },
        bottom: { style: "thin", color: { argb: "FFCBD5E1" } },
        left: { style: "thin", color: { argb: "FFCBD5E1" } },
        right: { style: "thin", color: { argb: "FFCBD5E1" } },
      };

      const evenFill: ExcelJS.FillPattern = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFF7ED" }, // Warm subtle orange tint
      };

      const oddFill: ExcelJS.FillPattern = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      };

      allRegistrations.data.forEach((reg, index) => {
        const isUmum = isUmumRegistration(reg);
        const rowData = {
          no: index + 1,
          nama: reg.name,
          nim: reg.nim || "-",
          prodi: reg.prodi || "-",
          instansi: reg.institution || "-",
          hp: reg.phoneNumber || "-",
          kelas: reg.class || "-",
          kategori: isUmum ? "Umum" : "Mahasiswa UMT",
          buktiTf: reg.image || "-",
          waktu: formatTime(reg.createdAt),
        };

        const row = worksheet.addRow(rowData);
        const isEven = index % 2 === 0;

        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.font = { name: "Calibri", size: 10 };
          cell.border = thinBorder;
          cell.fill = isEven ? evenFill : oddFill;
          cell.alignment = { vertical: "middle", wrapText: true };

          // Center align No column
          if (colNumber === 1) {
            cell.alignment = { horizontal: "center", vertical: "middle" };
          }

          // Kategori badge coloring (Orange for Umum, Navy Blue for Mahasiswa UMT)
          if (colNumber === 8) {
            cell.font = {
              name: "Calibri",
              size: 10,
              bold: true,
              color: { argb: isUmum ? "FFEA580C" : "FF1D4ED8" },
            };
            cell.alignment = { horizontal: "center", vertical: "middle" };
          }

          // Make bukti TF link clickable
          if (colNumber === 9 && reg.image) {
            cell.value = {
              text: reg.image,
              hyperlink: reg.image,
            };
            cell.font = {
              name: "Calibri",
              size: 10,
              color: { argb: "FF2563EB" },
              underline: true,
            };
          }
        });

        row.height = 22;
      });

      // ── Summary footer ──
      const lastDataRow = 3 + allRegistrations.data.length;
      const mahasiswaTotal = allRegistrations.data.filter(
        (r) => !isUmumRegistration(r)
      ).length;
      const umumTotal = allRegistrations.data.filter(isUmumRegistration).length;

      worksheet.mergeCells(lastDataRow + 1, 1, lastDataRow + 1, columns.length);
      const footerCell = worksheet.getCell(lastDataRow + 1, 1);
      footerCell.value = `Total: ${allRegistrations.data.length} Pendaftar   |   Mahasiswa UMT: ${mahasiswaTotal}   |   Umum: ${umumTotal}`;
      footerCell.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
      footerCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E3A8A" } }; // HIMTI Navy
      footerCell.alignment = { horizontal: "center", vertical: "middle" };
      footerCell.border = {
        top: { style: "medium", color: { argb: "FFF97316" } }, // Orange line
        bottom: { style: "medium", color: { argb: "FF1E3A8A" } },
      };
      worksheet.getRow(lastDataRow + 1).height = 28;

      // ── Freeze header ──
      worksheet.views = [{ state: "frozen", ySplit: 3 }];

      // ── Export ──
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileName = `pendaftaran-${(registrationType?.data?.name ?? "bootcamp")
        .toLowerCase()
        .replace(/\s+/g, "-")}.xlsx`;
      saveAs(blob, fileName);
    } finally {
      setTimeout(() => setIsExportingBootcamp(false), 1500);
    }
  };

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

  const { mahasiswaCount, umumCount, totalOnPage } = useMemo(() => {
    const rows = eventRegistrations?.data ?? [];
    let mhs = 0;
    let umum = 0;
    for (const r of rows) {
      if (isUmumRegistration(r)) umum += 1;
      else mhs += 1;
    }
    return { mahasiswaCount: mhs, umumCount: umum, totalOnPage: rows.length };
  }, [eventRegistrations?.data]);

  const totalRegistrations = eventRegistrations?.meta?.totalData ?? 0;

  const tableRows = useMemo(() => {
    const rows = eventRegistrations?.data ?? [];
    const page = eventRegistrations?.meta?.page ?? 1;
    const perPage = eventRegistrations?.meta?.perPage ?? 10;
    return rows.map((r, i) => ({
      ...(r as object),
      _rowNumber: (page - 1) * perPage + i + 1,
    })) as Array<
      (typeof rows)[number] & { _rowNumber: number; id: string | number }
    >;
  }, [
    eventRegistrations?.data,
    eventRegistrations?.meta?.page,
    eventRegistrations?.meta?.perPage,
  ]);

  const buildDownloadUrl = (
    category: "MAHASISWA" | "UMUM",
    format: "docx" | "pdf"
  ) =>
    `${CONFIG_APP.BASE_URL}/event-registration/registration-type/${registrationType?.data?.id}/export-absensi?category=${category}&format=${format}`;

  const handleDownload = (
    category: "MAHASISWA" | "UMUM",
    format: "docx" | "pdf"
  ) => {
    if (!registrationType?.data?.id) return;
    const key: DownloadKey = `${category}-${format}`;
    setDownloadingKey(key);
    const url = buildDownloadUrl(category, format);
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => setDownloadingKey(null), 2500);
  };

  const eventName = registrationType?.data?.name || "-";
  const eventYear = registrationType?.data?.year;
  const eventType = registrationType?.data?.type
    ? getTypeLabel(registrationType.data.type)
    : "-";
  const isActive = !!registrationType?.data?.isActive;

  return (
    <div className="px-3 sm:px-4 md:px-6">
      {/* ==================== HEADER / INFO CARD ==================== */}
      <Card className="mb-4 sm:mb-6">
        <CardBody className="!p-4 sm:!p-6">
          {/* Title + actions */}
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 flex-1">
              <Poppins className="break-words text-xl font-bold sm:text-2xl">
                {eventName}
              </Poppins>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <Badge variant="primary" size="sm">
                  {eventType}
                </Badge>
                <Badge variant="default" size="sm">
                  Angkatan {eventYear || "-"}
                </Badge>
                <Badge variant={isActive ? "success" : "danger"} size="sm">
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:flex md:w-auto md:flex-shrink-0">
              <div className="w-full md:w-28">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={handleEdit}
                  disabled={mutation.isPending}
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              </div>
              <div className="w-full md:w-28">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDelete}
                  disabled={mutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>{mutation.isPending ? "..." : "Delete"}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Banner:
              - Mobile (<md): full width, keep aspect ratio (no crop)
              - Desktop (md+): compact fixed size like the original design */}
          {registrationType?.data?.image && (
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-1.5 text-sm text-gray-600">
                <ImageIcon className="h-4 w-4" />
                <Poppins>Banner / Image</Poppins>
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 md:inline-block md:h-52 md:w-auto md:max-w-md">
                <img
                  src={registrationType.data.image}
                  alt={registrationType.data.name}
                  className="h-auto w-full object-contain md:h-52 md:w-auto md:object-cover"
                />
              </div>
            </div>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <InfoBlock label="Year" value={eventYear || "-"} />
            <InfoBlock label="Type" value={eventType} />
            <div>
              <Poppins className="text-xs text-gray-600 sm:text-sm">
                Status
              </Poppins>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Switch
                  checked={isActive}
                  onChange={handleToggleStatus}
                  disabled={toggleStatusMutation.isPending}
                  color="green"
                  crossOrigin=""
                />
                <Badge variant={isActive ? "success" : "danger"} size="sm">
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <InfoBlock
              label="Created At"
              value={
                registrationType?.data?.createdAt
                  ? formatTime(registrationType.data.createdAt)
                  : "-"
              }
            />
          </div>

          {/* WA Group full width */}
          <div className="mt-4">
            <div className="mb-1 flex items-center gap-1.5 text-sm text-gray-600">
              <LinkIcon className="h-4 w-4" />
              <Poppins>Link WA Group</Poppins>
            </div>
            {registrationType?.data?.link ? (
              <a
                href={registrationType.data.link}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-sm font-semibold text-blue-600 underline hover:text-blue-700"
              >
                {registrationType.data.link}
              </a>
            ) : (
              <Poppins className="text-sm font-semibold text-gray-400">
                -
              </Poppins>
            )}
          </div>
        </CardBody>
      </Card>

      {/* ==================== STATS + DOWNLOAD ABSENSI CARD ==================== */}
      <Card className="mb-4 sm:mb-6">
        <CardBody className="!p-4 sm:!p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            {/* --- Total Registrations --- */}
            <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-primary-50 to-white p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary-600" />
                <Poppins className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
                  Total Pendaftar
                </Poppins>
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-3xl font-bold text-primary-700 sm:text-4xl">
                  {totalRegistrations}
                </span>
                <Badge variant="primary" size="sm">
                  peserta
                </Badge>
              </div>

              {/* Summary sub-stats */}
              <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                <SummaryStat
                  label="Mahasiswa UMT"
                  count={mahasiswaCount}
                  hint={`dari ${totalOnPage} di halaman ini`}
                  variant="success"
                />
                <SummaryStat
                  label="Peserta Umum"
                  count={umumCount}
                  hint={`dari ${totalOnPage} di halaman ini`}
                  variant="primary"
                />
              </div>
            </div>

            {/* --- Download Absensi --- */}
            <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
              <div className="mb-1 flex items-center gap-2">
                <Download className="h-5 w-5 text-gray-700" />
                <Poppins className="text-sm font-semibold text-gray-800 sm:text-base">
                  Download Absensi
                </Poppins>
              </div>
              <Poppins className="mb-4 text-xs text-gray-500">
                Pilih kategori dan format dokumen. Dokumen dihasilkan dari
                template resmi HIMTI dan hanya diisi data peserta.
              </Poppins>

              <div className="space-y-3 sm:space-y-4">
                <DownloadGroup
                  Icon={GraduationCap}
                  title="Mahasiswa UMT"
                  description="Peserta dengan NIM & Prodi (UMT)"
                  category="MAHASISWA"
                  color="emerald"
                  disabled={!registrationType?.data?.id}
                  downloadingKey={downloadingKey}
                  onDownload={handleDownload}
                />
                <DownloadGroup
                  Icon={Globe2}
                  title="Peserta Umum"
                  description="Peserta luar / non-UMT / tanpa NIM"
                  category="UMUM"
                  color="blue"
                  disabled={!registrationType?.data?.id}
                  downloadingKey={downloadingKey}
                  onDownload={handleDownload}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ==================== DOWNLOAD DATA PENDAFTARAN (BOOTCAMP ONLY) ==================== */}
      {isBootcamp && (
        <Card className="mb-4 sm:mb-6">
          <CardBody className="!p-4 sm:!p-6">
            <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
              <div className="mb-1 flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-green-700" />
                <Poppins className="text-sm font-semibold text-gray-800 sm:text-base">
                  Download Data Pendaftaran Bootcamp
                </Poppins>
              </div>
              <Poppins className="mb-4 text-xs text-gray-500">
                Download seluruh data pendaftaran bootcamp dalam format Excel
                (.xlsx). Termasuk link gambar bukti transfer.
              </Poppins>

              <button
                type="button"
                disabled={
                  isExportingBootcamp || !allRegistrations?.data?.length
                }
                onClick={handleExportBootcampExcel}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: "#059669" }}
                onMouseEnter={(e) => {
                  if (
                    !isExportingBootcamp &&
                    allRegistrations?.data?.length
                  ) {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#047857";
                  }
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.backgroundColor = "#059669";
                }}
              >
                {isExportingBootcamp ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileSpreadsheet className="h-4 w-4" />
                )}
                <span>
                  {isExportingBootcamp
                    ? "Memproses..."
                    : `Download Excel (${allRegistrations?.data?.length ?? 0} pendaftar)`}
                </span>
              </button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* ==================== REGISTRATIONS TABLE ==================== */}
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
              return: (data: (typeof tableRows)[number]) => (
                <Poppins className="text-gray-500">{data._rowNumber}</Poppins>
              ),
            },
            {
              return: (data) =>
                data.image ? (
                  <img
                    className="h-14 w-14 rounded-md object-cover sm:h-16 sm:w-16"
                    src={data.image}
                    alt={data.name}
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gray-100 text-gray-400 sm:h-16 sm:w-16">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                ),
            },
            {
              return: (data) => (
                <Poppins className="font-semibold">{data.name}</Poppins>
              ),
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
              return: (data) => {
                const label = data.class || "-";
                const isUmum = isUmumRegistration(data);
                return (
                  <Badge variant={isUmum ? "primary" : "success"} size="sm">
                    {label}
                  </Badge>
                );
              },
            },
            {
              return: (data) => (
                <Poppins>{formatTime(data.createdAt)}</Poppins>
              ),
            },
          ]}
          data={tableRows}
          isLoading={isFetchingRegistrations}
          isError={isErrorRegistrations}
          onRetry={() => refetchRegistrations()}
          title={[
            "#",
            "Image",
            "Name",
            "NIM",
            "Prodi",
            "Instansi",
            "Phone",
            "Class",
            "Submit Time",
          ]}
        />
      </PageLayout>
    </div>
  );
};

/* ---------- helpers ---------- */

const InfoBlock = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="min-w-0">
    <Poppins className="text-xs text-gray-600 sm:text-sm">{label}</Poppins>
    <Poppins className="truncate text-sm font-semibold sm:text-base">
      {value}
    </Poppins>
  </div>
);

const SummaryStat = ({
  label,
  count,
  hint,
  variant,
}: {
  label: string;
  count: number;
  hint?: string;
  variant: "primary" | "success" | "default";
}) => (
  <div className="rounded-lg border border-gray-100 bg-white p-2.5 sm:p-3">
    <Poppins className="text-[11px] text-gray-500 sm:text-xs">{label}</Poppins>
    <div className="mt-1 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
      <span className="text-xl font-bold text-gray-800 sm:text-2xl">
        {count}
      </span>
      <Badge variant={variant} size="sm">
        {label.includes("UMT") ? "UMT" : "Umum"}
      </Badge>
    </div>
    {hint && (
      <Poppins className="mt-1 text-[10px] text-gray-400 sm:text-[11px]">
        {hint}
      </Poppins>
    )}
  </div>
);

// Raw HEX palette. We use inline `style` for backgrounds/borders instead of
// Tailwind classes because color classes like `bg-emerald-600` may be purged
// out of the final CSS bundle if they aren't already used elsewhere in the
// project (Tailwind JIT only ships classes it finds in source text). Using
// inline styles guarantees the buttons always render with the right colors,
// regardless of Tailwind config or content-scan behavior.
const PALETTE = {
  emerald: {
    cardBg: "#ecfdf5",
    cardBorder: "#a7f3d0",
    title: "#065f46",
    iconBg: "#d1fae5",
    iconFg: "#047857",
    docxBg: "#059669",
    docxBgHover: "#047857",
    pdfBg: "#e11d48",
    pdfBgHover: "#be123c",
  },
  blue: {
    cardBg: "#eff6ff",
    cardBorder: "#bfdbfe",
    title: "#1e40af",
    iconBg: "#dbeafe",
    iconFg: "#1d4ed8",
    docxBg: "#2563eb",
    docxBgHover: "#1d4ed8",
    pdfBg: "#4f46e5",
    pdfBgHover: "#4338ca",
  },
} as const;

const DownloadGroup = ({
  Icon,
  title,
  description,
  category,
  color,
  disabled,
  downloadingKey,
  onDownload,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  category: "MAHASISWA" | "UMUM";
  color: "emerald" | "blue";
  disabled?: boolean;
  downloadingKey: DownloadKey | null;
  onDownload: (
    category: "MAHASISWA" | "UMUM",
    format: "docx" | "pdf"
  ) => void;
}) => {
  const p = PALETTE[color];

  const renderBtn = (format: "docx" | "pdf") => {
    const key: DownloadKey = `${category}-${format}`;
    const isLoading = downloadingKey === key;
    const label = format === "docx" ? "DOCX" : "PDF";
    const FormatIcon = format === "docx" ? FileText : FileType;
    const bg = format === "docx" ? p.docxBg : p.pdfBg;
    const bgHover = format === "docx" ? p.docxBgHover : p.pdfBgHover;

    return (
      <button
        type="button"
        disabled={disabled || isLoading}
        onClick={() => onDownload(category, format)}
        onMouseEnter={(e) => {
          if (!disabled && !isLoading) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              bgHover;
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = bg;
        }}
        style={{
          backgroundColor: bg,
          color: "#ffffff",
          opacity: disabled || isLoading ? 0.6 : 1,
          cursor: disabled || isLoading ? "not-allowed" : "pointer",
        }}
        title={`Download Absensi ${
          category === "MAHASISWA" ? "Mahasiswa UMT" : "Peserta Umum"
        } format ${format.toUpperCase()}`}
        className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold shadow-sm transition-all sm:px-4 sm:text-sm"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin" />
        ) : (
          <FormatIcon className="h-4 w-4 flex-shrink-0" />
        )}
        <span>{isLoading ? "Preparing..." : `Download ${label}`}</span>
      </button>
    );
  };

  return (
    <div
      className="rounded-lg border p-3"
      style={{ borderColor: p.cardBorder, backgroundColor: p.cardBg }}
    >
      <div className="mb-3 flex items-start gap-2">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: p.iconBg, color: p.iconFg }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <Poppins
            className="text-sm font-semibold"
            style={{ color: p.title }}
          >
            {title}
          </Poppins>
          <Poppins className="text-[11px] text-gray-500 sm:text-xs">
            {description}
          </Poppins>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {renderBtn("docx")}
        {renderBtn("pdf")}
      </div>
    </div>
  );
};