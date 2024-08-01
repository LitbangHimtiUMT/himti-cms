import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import { useUserById, useUserCreation } from "../hooks/useUser";
import { UserDTO } from "@core/model/user";

const InitialValue: UserDTO = {
  nim: "",
  name: "",
  email: "",
  role: "",
};

const FormEditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userById, isLoading } = useUserById();

  const mutation = useUserCreation();

  const [userBody, setUserBody] = useState<UserDTO>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserDTO, string>>>(
    {}
  );

  useEffect(() => {
    if (userById && userById.data) {
      const { nim, name, email, role } = userById.data;
      // const categoryId = category ? category.id : "";
      setUserBody({
        nim,
        name,
        role,
        email,
      });
    }
  }, [userById]);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<Record<keyof UserDTO, string>> = {};
    let isValid = true;

    if (!userBody.nim) {
      newErrors.nim = "NIM is required";
      isValid = false;
    }

    if (!userBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!userBody.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!userBody.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync({
      type: "update",
      data: userBody,
      id,
    });
  };

  const handleReset = () => {
    setUserBody(InitialValue);
    setErrors({});
  };

  return (
    <PageLayout
      title="Edit User"
      headBackground="amber"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      {isLoading && (
        <table className="w-full justify-center items-center">
          <tbody>
            <SimpleLoadingTable />
          </tbody>
        </table>
      )}
      {!isLoading && userById?.data && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4 my-2">
            <InputGroup
              disabled={mutation.isPending}
              type="text"
              label="NIM"
              variant="outlined"
              error={errors.nim}
              value={userBody.nim}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserBody({ ...userBody, nim: e.target.value })
              }
            />
          </div>
          <div className="mb-4 my-2">
            <InputGroup
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
          <div className="mb-4 my-2">
            <InputGroup
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
          <div className="mb-4">
            <InputGroup
              disabled={mutation.isPending}
              type="select"
              label="Status"
              value={userBody.role as string}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setUserBody({
                  ...userBody,
                  role: e,
                });
              }}
              error={errors.role}
              options={[
                { value: "", label: "Pilih Role" },
                { value: "ADMIN", label: "ADMIN" },
                { value: "ANGGOTA", label: "AANGGOTA" },
                { value: "USER", label: "USER" },
              ]}
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
              {mutation.isPending ? "Loading..." : "Add"}
            </Button>
          </div>
        </form>
      )}
    </PageLayout>
  );
};

export default FormEditUser;
