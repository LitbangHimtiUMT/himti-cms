import { useSearchParams } from "react-router-dom";
import { Badge } from "../../_global/components/Badges";
import { PageLayout } from "../../_global/components/PageLayout";
import { MasterTable } from "../../_global/components/Table/Master";
import { Poppins } from "../../_global/components/Text";
import { FlagMappingVariant } from "../const";
import { useHistories } from "../hooks/userHistories";
import { DropdownV2 } from "../../_global/components/Dropdown/DropdownV2";
import { convertQueryParamsToObject } from "../../_global/helper";
import { HistoryFlag, HistoryModule } from "../../../core/model/histories";
import { Button } from "../../_global/components/Button";

export const HistoriesViews = () => {
  const { data: histories, isFetching } = useHistories({});
  const [searchParams, setSearchParams] = useSearchParams();

  const queries = convertQueryParamsToObject(searchParams.toString());
  const page = queries?.page;
  const keys = Object.keys(queries);
  const onPageChange = (page: number) => {
    setSearchParams({ ...queries, page: String(page) });
  };
  const onChangeModule = (module: HistoryModule) => {
    if (!module) {
      const { module, ...rest } = queries;
      module;
      setSearchParams(rest);
      return;
    }
    setSearchParams({ ...queries, module });
  };
  const onChangeFlag = (flag: HistoryFlag) => {
    if (!flag) {
      const { flag, ...rest } = queries;
      flag;
      setSearchParams(rest);
      return;
    }
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
      <PageLayout
        title="Histories"
        showPagination
        pagination={{
          currentPage: histories?.meta?.page || 1,
          totalPages: histories?.meta?.totalPages || 0,
          onPageChange,
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex md:flex-row flex-col gap-4 items-center">
            <div className="md:w-64 w-full">
              <DropdownV2
                onChange={(e) => onChangeModule(e.value as HistoryModule)}
                placeholder="Select Module"
                list={[
                  {
                    label: "All",
                    value: "",
                  },
                  {
                    label: "Auth",
                    value: "AUTH",
                  },
                  {
                    label: "Meeting",
                    value: "MEETING",
                  },
                  {
                    label: "Event Meeting",
                    value: "EVENT_MEETING",
                  },
                ]}
              />
            </div>
            <div className="md:w-64 w-full">
              <DropdownV2
                onChange={(e) => onChangeFlag(e.value as HistoryFlag)}
                placeholder="Select Flag"
                list={[
                  {
                    label: "All",
                    value: "",
                  },
                  {
                    label: "Create",
                    value: "CREATE",
                  },
                  {
                    label: "Update",
                    value: "UPDATE",
                  },
                  {
                    label: "Delete",
                    value: "DELETE",
                  },
                  {
                    label: "Login",
                    value: "LOGIN",
                  },
                  {
                    label: "Logout",
                    value: "LOGOUT",
                  },
                ]}
              />
            </div>
            {keys.length > 1 || (keys.length && !page) ? (
              <div className="w-48">
                <Button variant="danger" onClick={() => setSearchParams({})}>
                  Reset
                </Button>
              </div>
            ) : null}
          </div>
          <MasterTable
            isLoading={isFetching}
            data={histories?.data || []}
            title={["Title", "Action By", "Module", "Flag"]}
            columnTable={[
              {
                return: ({ title }) => (
                  <>
                    <Poppins>{title}</Poppins>
                  </>
                ),
              },
              {
                return: ({ user }) => (
                  <>
                    <Poppins>{user?.name}</Poppins>
                  </>
                ),
              },
              {
                return: ({ module }) => (
                  <>
                    <Poppins>{module}</Poppins>
                  </>
                ),
              },
              {
                return: ({ flag }) => (
                  <>
                    <Badge variant={FlagMappingVariant[flag]} size="sm">
                      {flag}
                    </Badge>
                  </>
                ),
              },
            ]}
          />
        </div>
      </PageLayout>
    </div>
  );
};
