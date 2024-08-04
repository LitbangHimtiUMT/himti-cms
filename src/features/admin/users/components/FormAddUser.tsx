import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import { PageLayout } from "@features/_global/components/PageLayout";
import { useNavigate } from "react-router-dom";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { useUserCreation } from "../hooks/useUser";
import { Role, UserDTO } from "@core/model/user";
import { ButtonGroup } from "@material-tailwind/react";
import { useAnggota } from "@features/admin/anggota/hooks/useAnggota";

const InitialValue: UserDTO = {
  nim: "",
  name: "",
  email: "",
  role: "",
  anggotaId: "",
  password: "",
};

const FormAddUser: React.FC = () => {
  const [searchAnggota, setSearchAnggota] = useState("");
  const { data: anggota, isLoading: isLoadingAnggota } = useAnggota({
    perPage: 100000,
    search: searchAnggota,
  });
  const mutation = useUserCreation();

  const [userBody, setUserBody] = useState<UserDTO>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserDTO, string>>>(
    {}
  );

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

    if (!userBody.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!userBody.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }

    if (userBody.role === "ANGGOTA" && !userBody.anggotaId) {
      newErrors.anggotaId = "Anggota is required";
      isValid = false;
    }

    if (!userBody.nim) {
      newErrors.nim = "NIM is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(userBody);

    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync({
      type: "create",
      data: userBody,
    });
  };

  const handleReset = () => {
    setUserBody(InitialValue);
    setErrors({});
  };

  const handleRoleChange = (name: Role) => {
    if (userBody.role === name) {
      setUserBody({ ...userBody, role: "", nim: "", anggotaId: "" });
    } else {
      setUserBody({ ...userBody, role: name, nim: "", anggotaId: "" });
    }
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
      <form onSubmit={handleSubmit}>
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
        <div className="mb-4 my-2">
          <InputGroup
            disabled={mutation.isPending}
            type="password"
            label="Password"
            variant="outlined"
            error={errors.password}
            placeholder="*****"
            value={userBody.password as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserBody({ ...userBody, password: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <Typography className="text-xs font-semibold text-blue-gray-600">
            Role:
          </Typography>
          <ButtonGroup variant="outlined" size="sm">
            <Button
              className={`${
                userBody.role === "ADMIN" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleRoleChange("ADMIN")}
            >
              ADMIN
            </Button>
            <Button
              className={`${
                userBody.role === "ANGGOTA" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleRoleChange("ANGGOTA")}
            >
              ANGGOTA
            </Button>
            <Button
              className={`${
                userBody.role === "USER" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleRoleChange("USER")}
            >
              USER
            </Button>
          </ButtonGroup>
          <InputGroup error={errors.role} />
        </div>

        {userBody.role === "ANGGOTA" ? (
          <div className="flex sm:flex-row flex-col">
            <InputGroup
              type="search"
              label="Search Anggota"
              variant="outlined"
              value={searchAnggota}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchAnggota(e.target.value);
              }}
            />
            {isLoadingAnggota ? (
              <InputGroup
                className="flex-1"
                disabled
                type="select"
                label="Loading..."
              />
            ) : anggota?.data ? (
              <InputGroup
                className="flex-1"
                disabled={mutation.isPending}
                type="select"
                label="Anggota"
                defaultValue={userBody.anggotaId}
                // value={searchAnggota ? "" : userBody.anggotaId as string}
                onChange={() => {}}
                error={errors.anggotaId}
                options={[
                  {
                    value: "",
                    label: "Pilih Anggota",
                    onClick: () => {
                      setUserBody({
                        ...userBody,
                        anggotaId: "",
                        nim: "",
                      });
                    },
                  },
                  ...anggota?.data.map((anggota) => ({
                    value: anggota.id,
                    label: anggota.name,
                    onClick: () => {
                      setUserBody({
                        ...userBody,
                        nim: anggota.nim,
                        anggotaId: anggota.id,
                      });
                    },
                  })),
                ]}
              />
            ) : (
              <InputGroup
                className="flex-1"
                disabled
                type="select"
                label="Anggota not found"
              />
            )}
          </div>
        ) : (
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
        )}

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

export default FormAddUser;
