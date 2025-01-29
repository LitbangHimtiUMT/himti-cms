import React, { useState } from "react";
import { Drawer } from "../../../_global/components/Drawer";
import { DropdownV2 } from "../../../_global/components/Dropdown/DropdownV2";
import { Poppins } from "../../../_global/components/Text";
import { useUser } from "../../../admin/users/hooks/useUser";
import { Button } from "../../../_global/components/Button";
import { useMentorCreation } from "../hooks/useMentorCreation";

interface DrawerAssignMentorProps {
  show: boolean;
  onHide: () => void;
}

interface AssignMentorCreation {
  userId: string;
}

export const DrawerAssignMentor: React.FC<DrawerAssignMentorProps> = ({
  onHide,
  show,
}) => {
  const { data: users } = useUser({
    page: 1,
    perPage: 99999,
    path: "without-mentor",
  });

  const [data, setData] = useState<AssignMentorCreation>({
    userId: "",
  });

  const mutation = useMentorCreation();

  const handleAssign = async () => {
    await mutation.mutateAsync({
      type: "create",
      data: {
        userId: data.userId,
      },
    });
    onHide();
    setData({
      userId: "",
    });
  };

  return (
    <Drawer onHide={onHide} show={show}>
      <div className="px-3 ml-2 flex flex-col gap-6">
        <Poppins fontSize={"0.9rem"}>Assign Mentor</Poppins>
        <div className="w-full flex flex-col gap-2">
          <Poppins fontSize={"0.8rem"}>Name</Poppins>
          <DropdownV2
            placeholder="Select User"
            list={(users?.data || [])?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            onChange={(e) => setData((prev) => ({ ...prev, userId: e.value }))}
            searchInput
          />
        </div>
        <Button
          size="lg"
          variant={data.userId && !mutation.isPending ? "primary" : "disabled"}
          onClick={mutation.isPending || data.userId ? handleAssign : undefined}
        >
          <Poppins fontSize={"0.8rem"} color="white" className="text-white">
            {mutation.isPending ? "Loading..." : "Assign"}
          </Poppins>
        </Button>
      </div>
    </Drawer>
  );
};
