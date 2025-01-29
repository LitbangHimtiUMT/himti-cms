import { useState } from "react";
import { PageLayout } from "../../../_global/components/PageLayout";
import { MasterTable } from "../../../_global/components/Table/Master";
import { Poppins } from "../../../_global/components/Text";
import { formatRupiah } from "../../../_global/helper";
import { useMentors } from "../hooks/useMentors";
import { DrawerAssignMentor } from "./DrawerAssignMentor";
import { Button } from "../../../_global/components/Button";
import { BiDetail, BiTrash } from "react-icons/bi";
import { ModalDeleteMentor } from "./ModalDeleteMentor";
import { useNavigate } from "react-router-dom";

export const MentorsTable = () => {
  const { data: mentors, isFetching } = useMentors();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    drawer: false,
    modal: {
      show: false,
      id: "",
    },
  });

  return (
    <PageLayout
      action={{
        show: true,
        buttonTitle: "Assign Mentor",
        buttonProps: {
          onClick: () =>
            setShow((prev) => ({
              ...prev,
              drawer: !prev.drawer,
            })),
        },
      }}
      title="Mentors"
      searchField
      searchPlaceholder="Search Mentor"
    >
      <MasterTable
        isLoading={isFetching}
        data={mentors?.data || []}
        title={["NAMA", "EMAIL", "BALANCE", ""]}
        columnTable={[
          {
            return: ({ name }) => (
              <>
                <Poppins>{name}</Poppins>
              </>
            ),
          },
          {
            return: ({ email }) => (
              <>
                <Poppins>{email}</Poppins>
              </>
            ),
          },
          {
            return: ({ balance }) => (
              <>
                <Poppins>{formatRupiah(balance ?? 0)}</Poppins>
              </>
            ),
          },
          {
            return: ({ id }) => (
              <div className="flex items-center justify-end gap-4 w-full">
                <div className="w-max">
                  <Button
                    variant="danger"
                    onClick={() =>
                      setShow((prev) => ({
                        ...prev,
                        modal: { id, show: !prev.modal.show },
                      }))
                    }
                  >
                    <div className="flex items-center gap-2">
                      <BiTrash />
                      <p className="text-xs">Delete</p>
                    </div>
                  </Button>
                </div>
                <div className="w-max">
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/lms/mentors/${id}`)}
                  >
                    <div className="flex items-center gap-2">
                      <BiDetail className="text-black" />
                      <p className="text-black text-xs">Detail</p>
                    </div>
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
      />
      <DrawerAssignMentor
        onHide={() => setShow((prev) => ({ ...prev, drawer: !prev.drawer }))}
        show={show.drawer}
      />
      <ModalDeleteMentor
        show={show.modal.show}
        id={show.modal.id}
        onHide={() =>
          setShow((prev) => ({
            ...prev,
            modal: { id: "", show: !prev.modal.show },
          }))
        }
      />
    </PageLayout>
  );
};
