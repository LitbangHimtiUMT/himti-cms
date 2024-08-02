import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { useDosenById, useDosenCreation } from "../hooks/useDosen";
import { DosenDTO } from "@core/model/dosen";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";

const InitialValue: DosenDTO = {
  nidn: "",
  name: "",
  email: "",
  numberPhone: "",
  lesson: "",
};

const FormEditDosen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dosenById, isLoading } = useDosenById();

  const mutation = useDosenCreation();

  const [dosenBody, setDosenBody] = useState<DosenDTO>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DosenDTO, string>>>(
    {}
  );

  useEffect(() => {
    if (dosenById && dosenById.data) {
      const { nidn, name, email, numberPhone, lesson } = dosenById.data;
      // const categoryId = category ? category.id : "";
      setDosenBody({
        nidn,
        name,
        email,
        numberPhone,
        lesson,
      });
    }
  }, [dosenById]);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<Record<keyof DosenDTO, string>> = {};
    let isValid = true;

    if (!dosenBody.nidn) {
      newErrors.nidn = "NIDN is required";
      isValid = false;
    }

    if (!dosenBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!dosenBody.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!dosenBody.numberPhone) {
      newErrors.numberPhone = "Number Phone is required";
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
      data: dosenBody,
      id,
    });
  };

  const handleReset = () => {
    setDosenBody(InitialValue);
    setErrors({});
  };

  return (
    <PageLayout
      title="Edit Dosen"
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

      {!isLoading && dosenById?.data && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4 my-2">
            <InputGroup
              disabled={mutation.isPending}
              type="text"
              label="NIDN"
              variant="outlined"
              error={errors.nidn}
              value={dosenBody.nidn as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDosenBody({ ...dosenBody, nidn: e.target.value })
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
              value={dosenBody.name as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDosenBody({ ...dosenBody, name: e.target.value })
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
              value={dosenBody.email as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDosenBody({ ...dosenBody, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4 my-2">
            <InputGroup
              disabled={mutation.isPending}
              type="text"
              label="Number Phone"
              variant="outlined"
              error={errors.numberPhone}
              value={dosenBody.numberPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDosenBody({ ...dosenBody, numberPhone: e.target.value })
              }
            />
          </div>
          <div className="mb-4 my-2">
            <InputGroup
              disabled={mutation.isPending}
              type="text"
              label="Lesson"
              variant="outlined"
              error={errors.lesson}
              value={dosenBody.lesson as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDosenBody({ ...dosenBody, lesson: e.target.value })
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

export default FormEditDosen;
