import { VersionModel } from "@core/model/version";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { useState } from "react";
import { useVersionCreation } from "../hooks/useVersion";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  data: VersionModel;
}

const inititalValue: VersionModel = {
  appStoreLink: undefined,
  playstoreLink: undefined,
  iosVersion: undefined,
  androidVersion: undefined,
  notes: undefined,
  id: 0,
};

export const ModalUpdate: React.FC<ModalProps> = ({ onHide, show, data }) => {
  const [body, setBody] = useState<VersionModel>(inititalValue);
  const mutation = useVersionCreation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync({
      ...body,
      id: data.id ? data.id : body.id,
    });
    onHide();
  };
  return (
    <>
      {show && (
        <div className="fixed inset-0 p-4 z-[9999] overflow-auto grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div
            data-dialog="dialog"
            className="relative w-full sm:min-w-[400px] z-[9999] sm:max-w-[40%] h-min overflow-auto rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
          >
            <div className="flex items-center justify-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
              {"Update Version"}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
                <div className="mb-4 my-2">
                  <InputGroup
                    value={body.androidVersion || data.androidVersion}
                    onChange={(e) =>
                      setBody({ ...body, androidVersion: e.target.value })
                    }
                    disabled={mutation.isPending}
                    type="text"
                    label="Android Version"
                    variant="outlined"
                  />
                </div>{" "}
                <div className="mb-4 my-2">
                  <InputGroup
                    disabled={mutation.isPending}
                    value={body.playstoreLink || data.playstoreLink}
                    onChange={(e) =>
                      setBody({ ...body, playstoreLink: e.target.value })
                    }
                    type="text"
                    label="Playstore URL"
                    variant="outlined"
                  />
                </div>
                <div className="mb-4 my-2">
                  <InputGroup
                    disabled={mutation.isPending}
                    value={body.iosVersion || data.iosVersion}
                    onChange={(e) =>
                      setBody({ ...body, iosVersion: e.target.value })
                    }
                    type="text"
                    label="IOS Version"
                    variant="outlined"
                  />
                </div>
                <div className="mb-4 my-2">
                  <InputGroup
                    disabled={mutation.isPending}
                    value={body.appStoreLink || data.appStoreLink}
                    onChange={(e) =>
                      setBody({ ...body, appStoreLink: e.target.value })
                    }
                    type="text"
                    label="App Store URL"
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                <button
                  data-ripple-dark="true"
                  data-dialog-close="true"
                  className="px-6 py-3 mr-1 font-sans text-xs font-bold bg-gradient-to-tr from-red-600 to-red-400 uppercase transition-all rounded-lg middle none center text-white hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="reset"
                  onClick={onHide}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  data-ripple-light="true"
                  data-dialog-close="true"
                  className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  {mutation.isPending ? "Loading..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
