import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

import { CreateAdminUserBodyDTO, UserDTO } from "@core/model/user";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserCreation } from "../hooks/useUser";

const InitialValue: CreateAdminUserBodyDTO = {
  name: "",
  email: "",
  password: "",
};

export const FormCreateUserAdmin: React.FC = () => {
  const mutation = useUserCreation();
  const [show, setShow] = useState<boolean>(false);

  const [userBody, setUserBody] = useState<CreateAdminUserBodyDTO>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateAdminUserBodyDTO, string>>
  >({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<Record<keyof UserDTO, string>> = {};
    let isValid = true;

    if (!userBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!userBody.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!userBody.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(userBody);
    await mutation.mutateAsync({
      type: "admin",
      adminData: userBody,
    });
  };

  const handleReset = () => {
    setUserBody(InitialValue);
    setErrors({});
  };

  return (
    <PageLayout
      title="Add User"
      headBackground="blue"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <InputGroup
            mb={false}
            disabled={mutation.isPending}
            type="text"
            label="Name"
            variant="outlined"
            error={errors.name}
            value={userBody.name as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserBody({ ...userBody, name: e.target.value })
            }
          />
        </div>
        <div>
          <InputGroup
            mb={false}
            disabled={mutation.isPending}
            type="email"
            label="Email"
            variant="outlined"
            error={errors.email}
            value={userBody.email as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserBody({ ...userBody, email: e.target.value })
            }
          />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <InputGroup
              mb={false}
              className="w-full"
              disabled={mutation.isPending}
              type={show ? "text" : "password"}
              label="Password"
              variant="outlined"
              error={errors.password}
              placeholder="*****"
              value={userBody.password as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserBody({ ...userBody, password: e.target.value })
              }
            />
            <div
              className="hover:bg-gray-200 p-3 rounded-full cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
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
            color="blue"
            fullWidth
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Loading..." : "Add"}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};
