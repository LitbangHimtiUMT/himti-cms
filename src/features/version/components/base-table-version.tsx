import { PropsWithChildren } from "react";
import { useVersion } from "../hooks/useVersion";

interface TRProps extends PropsWithChildren { }

const TR = ({ children }: TRProps) => <tr>{children}</tr>;

export const BaseTableVersion = () => {
  const { data: version } = useVersion();

  return (
    <>
      <div className="flex items-center gap-5">
        <table className="h-[220px]">
          <TR>
            <td>
              <p className="p-2 font-bold">Android Version</p>
            </td>
          </TR>
          <TR>
            <td>
              <p className="p-2 font-bold">Playstore URL</p>
            </td>
          </TR>
          <TR>
            <td>
              <p className="p-2 font-bold">IOS Version</p>
            </td>
          </TR>
          <TR>
            <td>
              <p className="p-2 font-bold">App Store URL</p>
            </td>
          </TR>
        </table>
        <table className="h-[220px]">
          <TR>
            <td>
              <p className="p-2">{version?.data?.androidVersion || "-"}</p>
            </td>
          </TR>
          <TR>
            <td>
              {version?.data?.playstoreLink ? (
                <a
                  href={version.data.playstoreLink}
                  className="p-2 text-blue-800 underline"
                >
                  {version?.data?.playstoreLink}
                </a>
              ) : (
                <p className="p-2">{"-"}</p>
              )}{" "}
            </td>
          </TR>
          <TR>
            <td>
              <p className="p-2">{version?.data?.iosVersion || "-"}</p>
            </td>
          </TR>{" "}
          <TR>
            <td>
              {version?.data?.appStoreLink ? (
                <a
                  href={version.data.appStoreLink}
                  className="p-2 text-blue-800 underline"
                >
                  {version?.data?.appStoreLink}
                </a>
              ) : (
                <p className="p-2">{"-"}</p>
              )}
            </td>
          </TR>
        </table>
      </div>
    </>
  );
};
