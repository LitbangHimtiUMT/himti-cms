import DefaultPhoto from "../../../core/assets/default-photo.svg";
import { HistoryFlag, HistoryModule } from "../../../core/model/histories";
import { Drawer } from "../../_global/components/Drawer";
import { Skeleton } from "../../_global/components/Skeleton";
import { Poppins } from "../../_global/components/Text";
import { textFlag } from "../const";
import { useHistories } from "../hooks/userHistories";

interface DrawerHistoriesProps {
  show: boolean;
  onHide: () => void;
  flag?: HistoryFlag;
  module: HistoryModule;
}

export const DrawerHistories: React.FC<DrawerHistoriesProps> = ({
  flag,
  module,
  onHide,
  show,
}) => {
  const { data: histories, isFetching } = useHistories({
    module,
    flag,
    enabled: show,
  });
  return (
    <>
      <Drawer
        onHide={onHide}
        show={show}
        close={{
          title: "Back",
        }}
      >
        <div className="px-3 ml-2 flex flex-col gap-6">
          <Poppins fontSize={"0.9rem"}>Histories {module}</Poppins>
            <div className="flex flex-col justify-center">
              {isFetching ? (
                <>
                  {Array.from({ length: 4 }).map(() => (
                    <div className="mb-4">
                      <Skeleton width="100%" height="4rem" />
                    </div>
                  ))}
                </>
              ) : (
                histories?.data?.map((item, index) => (
                  <>
                    <div
                      key={index}
                      className="px-4 py-6 border-b border-solid border-gray-700 flex flex-col gap-4"
                    >
                      <div className="flex justify-between">
                        <Poppins fontSize={"0.8rem"}>{item.title}</Poppins>
                        <Poppins
                          fontSize={"0.8rem"}
                          color={`#fff`}
                          style={{
                            backgroundColor: textFlag[item.flag].color,
                            padding: "2px 5px",
                            borderRadius: 20,
                          }}
                        >
                          {item.flag}
                        </Poppins>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          className="w-6 h-6 rounded-full"
                          src={item.user?.photo || DefaultPhoto}
                          onError={(e) => {
                            e.currentTarget.src = DefaultPhoto;
                          }}
                        />
                        <Poppins>{item.user?.name}</Poppins>
                      </div>
                    </div>
                  </>
                ))
              )}
            </div>
        </div>
      </Drawer>
    </>
  );
};
