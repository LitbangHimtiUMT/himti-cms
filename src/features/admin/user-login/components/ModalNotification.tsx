import InputGroup from "@features/_global/components/Input/InputGroup";
import {
  useDropdownAcara,
  useDropdownSubAcara,
} from "@features/admin/acara/hooks/useDropdownAcara";
import { useNotificationCreation } from "@features/admin/notification/hooks/useNotification";
import { useState } from "react";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

interface BodyRequest {
  acaraId?: string;
  subAcaraId?: string;
  title: string;
  body: string;
}

const inititalValue: BodyRequest = {
  title: "",
  body: "",
  acaraId: "T",
  subAcaraId: undefined,
};

const initialError = {
  title: "",
  body: "",
};

export const ModalNotification: React.FC<ModalProps> = ({ onHide, show }) => {
  const [body, setBody] = useState<BodyRequest>(inititalValue);
  const [error, setError] = useState(initialError);
  const { data: acaras } = useDropdownAcara({ page: 1, perPage: 99999999 });
  const { data: subAcaras } = useDropdownSubAcara({
    page: 1,
    perPage: 99999999,
    acaraId: body?.acaraId,
  });

  const mutation = useNotificationCreation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!body.title) {
      setError((prev) => ({ ...prev, title: "Title is required" }));
      return;
    }
    if (!body.body) {
      setError((prev) => ({ ...prev, body: "Body is required" }));
      return;
    }

    await mutation.mutateAsync({
      type: "ALL",
      data: body,
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
              Send All Notification
            </div>
            <form onSubmit={handleSubmit}>
              <div className="relative h-[350px] p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
                <div className="mb-4 my-2">
                  <InputGroup
                    disabled={mutation.isPending}
                    onChange={(e) =>
                      setBody({ ...body, title: e.target.value })
                    }
                    error={error.title}
                    type="text"
                    label="Title"
                    variant="outlined"
                  />
                </div>
                <div className="mb-4 my-2">
                  <InputGroup
                    disabled={mutation.isPending}
                    onChange={(e) => setBody({ ...body, body: e.target.value })}
                    error={error.body}
                    type="textarea"
                    label="Body"
                    variant="outlined"
                    rows={4}
                  />
                </div>
                <div className="mb-4 my-2">
                  <InputGroup
                    disabled={mutation.isPending}
                    type="select"
                    label="Acara"
                    variant="outlined"
                    options={
                      acaras?.data?.length
                        ? acaras.data.map((item) => ({
                            label: item.name,
                            value: item.id,
                            onClick: () =>
                              setBody({ ...body, acaraId: item.id }),
                          }))
                        : []
                    }
                  />
                </div>
                <div className="mb-4 my-2">
                  <InputGroup
                    disabled={mutation.isPending}
                    type="select"
                    label="Sub Acara"
                    variant="outlined"
                    options={
                      subAcaras?.data?.length
                        ? subAcaras.data.map((item) => ({
                            label: item.name,
                            value: item.id,
                            onClick: () =>
                              setBody({ ...body, subAcaraId: item.id }),
                          }))
                        : []
                    }
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
                  // onClick={}
                >
                  {mutation.isPending ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
