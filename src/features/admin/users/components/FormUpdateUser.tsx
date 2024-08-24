import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

import { CreateAdminUserBodyDTO } from "@core/model/user";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import { useNavigate } from "react-router-dom";
import { useUserById, useUserCreation } from "../hooks/useUser";

const InitialValue: CreateAdminUserBodyDTO = {
  name: "",
  email: "",
};

export const FormUpdateUserAdmin: React.FC = () => {
  const mutation = useUserCreation();
  const { data: user, isLoading } = useUserById();

  const [userBody, setUserBody] = useState<CreateAdminUserBodyDTO>({
    email: user?.data?.email as string,
    name: user?.data?.name as string,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateAdminUserBodyDTO, string>>
  >({});

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!validate()) return;
    console.log(userBody);
    await mutation.mutateAsync({
      type: "admin-update",
      adminData: userBody,
    });
  };

  const handleReset = () => {
    setUserBody(InitialValue);
    setErrors({});
  };
  console.log({ userBody });
  return (
    <PageLayout
      title="Update User"
      headBackground="amber"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      {isLoading ? (
        <SimpleLoadingTable isTable={false} />
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <InputGroup
              mb={false}
              disabled={mutation.isPending || isLoading}
              type="text"
              label="Name"
              variant="outlined"
              error={errors.name}
              // value={userBody?.name}
              defaultValue={user?.data?.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserBody({ ...userBody, name: e.target.value })
              }
            />
          </div>
          <div>
            <InputGroup
              mb={false}
              disabled={mutation.isPending || isLoading}
              type="email"
              label="Email"
              variant="outlined"
              error={errors.email}
              value={user?.data?.email as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserBody({ ...userBody, email: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center items-center gap-5">
            <Button
              disabled={mutation.isPending}
              onClick={handleReset}
              variant="outlined"
              fullWidth
            >
              Reset
            </Button>
            <Button
              className="text-white"
              type="submit"
              variant="gradient"
              color="amber"
              fullWidth
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Loading..." : "Update"}
            </Button>
          </div>
        </form>
      )}
    </PageLayout>
  );
};
