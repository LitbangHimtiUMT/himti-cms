import { useState } from "react";
import { PageLayout } from "../../../_global/components/PageLayout";
import { MasterTable } from "../../../_global/components/Table/Master";
import { Poppins } from "../../../_global/components/Text";
import { formatRupiah } from "../../../_global/helper";
import { useMentors } from "../hooks/useMentors";
import { DrawerAssignMentor } from "./DrawerAssignMentor";

export const MentorsTable = () => {
  const { data: mentors, isFetching } = useMentors();
  const [show, setShow] = useState(false);
  return (
    <PageLayout
      action={{
        show: true,
        buttonTitle: "Assign Mentor",
        buttonProps: {
          onClick: () => setShow((prev) => !prev),
        },
      }}
      title="Mentors"
      searchField
      searchPlaceholder="Search Mentor"
    >
      <MasterTable
        isLoading={isFetching}
        data={mentors?.data || []}
        title={["NAMA", "EMAIL", "BALANCE"]}
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
        ]}
      />
      <DrawerAssignMentor onHide={() => setShow((prev) => !prev)} show={show} />
    </PageLayout>
  );
};
