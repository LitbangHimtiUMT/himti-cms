import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import { useAnggota, useAnggotaCreation, useExportAnggota } from "../hooks/useAnggota";
import { TableItem } from "./Table/TableItem";
import { useAngkatanDropdown } from "../../angkatan/hooks/useAngkatan";
import { Button } from "@material-tailwind/react";
import { useState, useMemo } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import { DropdownV2, ListItem } from "@features/_global/components/Dropdown/DropdownV2";

export const AnggotaContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const [selectedGenerationId, setSelectedGenerationId] = useState<string>("");
  const { data: anggotas, isLoading } = useAnggota({
    generationId: selectedGenerationId || undefined,
  });
  const { data: generations } = useAngkatanDropdown();
  const exportMutation = useExportAnggota();

  // Transform generations data to ListItem format
  const generationsList: ListItem[] = useMemo(() => {
    const allOption: ListItem = { label: "All Generations", value: "" };
    const generationsOptions: ListItem[] =
      generations?.data
        ?.filter((gen) => gen.year !== "all")
        .map((generation) => ({
          label: generation.year,
          value: generation.id,
        })) || [];
    return [allOption, ...generationsOptions];
  }, [generations]);

  // Find the default selected generation for DropdownV2
  const selectedGeneration = useMemo(() => {
    return generationsList.find((item) => item.value === selectedGenerationId) || generationsList[0];
  }, [generationsList, selectedGenerationId]);

  const onPageChange = (page: number) =>
    setSearchParams({ ...queryParams, page: page.toString() });

  const mutation = useAnggotaCreation();

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const handleExportExcel = async () => {
    await exportMutation.mutateAsync({
      generationId: selectedGenerationId || undefined,
    });
  };

  const pagination = {
    currentPage: anggotas?.meta?.page || 1,
    totalPages: anggotas?.meta?.totalPages || 1,
    onPageChange,
  };
  return (
    <PageLayout
      title="Anggota"
      action={{
        show: true,
        buttonTitle: "Create Anggota",
        link: { to: "/admin/anggota/create" },
      }}
      showPagination={
        !!(
          anggotas?.data?.length &&
          !isLoading &&
          (anggotas.meta?.totalData as number) >
            (anggotas?.meta?.perPage as number)
        )
      }
      pagination={pagination}
      searchField
      searchPlaceholder="Search Anggota"
    >
      {/* Filter and Export Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Filter by Generation
            </label>
            <div className="min-w-[200px]">
              <DropdownV2
                list={generationsList}
                placeholder="Select Generation"
                defaultValue={selectedGeneration}
                onChange={(value) => setSelectedGenerationId(value.value as string)}
                searchInput={true}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleExportExcel}
          disabled={exportMutation.isPending || isLoading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <SiMicrosoftexcel className="w-5 h-5" />
          {exportMutation.isPending ? "Exporting..." : "Export to Excel"}
        </Button>
      </div>

      <Table>
        <TableHead field={["Name", "NIM", "Angkatan", "Status", "Action"]} />

        <TableBody>
          {isLoading ? (
            <SimpleLoadingTable ColSpan={6} />
          ) : (
            <>
              {anggotas?.data?.map(
                (item, key) => (
                  <TableItem
                    key={key}
                    {...item}
                    show={key !== (anggotas?.data?.length as number) - 1}
                    handleDelete={handleDelete}
                  />
                )
              )}
            </>
          )}
        </TableBody>
      </Table>
    </PageLayout>
  );
};
