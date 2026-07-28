import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import { PageLayout } from "@features/_global/components/PageLayout";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { Button } from "@material-tailwind/react";
import { usePotentialUserKeyCreation } from "../hooks/usePotentialUserKeys";
import { PotentialUserKeyDTO } from "../model/potentialUserKey";

const InitialValue: PotentialUserKeyDTO = {
  key: "",
  maxUsage: 1,
  allowedGen: [],
  expiredAt: "",
};

const AddPotentialUserKeyView: React.FC = () => {
  const navigate = useNavigate();
  const mutation = usePotentialUserKeyCreation();

  const [formBody, setFormBody] = useState<PotentialUserKeyDTO>({ ...InitialValue });
  const [allowedGenInput, setAllowedGenInput] = useState<string>("");
  const [errors, setErrors] = useState<Partial<Record<keyof PotentialUserKeyDTO | "allowedGenInput", string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof PotentialUserKeyDTO | "allowedGenInput", string>> = {};
    let isValid = true;

    if (!formBody.key.trim()) {
      newErrors.key = "Key code is required";
      isValid = false;
    }
    if (formBody.maxUsage <= 0) {
      newErrors.maxUsage = "Max usage must be greater than 0";
      isValid = false;
    }
    if (!allowedGenInput.trim()) {
      newErrors.allowedGenInput = "At least one allowed generation is required";
      isValid = false;
    }
    if (!formBody.expiredAt) {
      newErrors.expiredAt = "Expiration date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    // Parse allowed generations
    const gens = allowedGenInput
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g.length > 0);

    const payload: PotentialUserKeyDTO = {
      ...formBody,
      allowedGen: gens,
      // Format expiredAt to ISO string if needed
      expiredAt: new Date(formBody.expiredAt).toISOString(),
    };

    await mutation.mutateAsync({
      type: "create",
      data: payload,
    });
  };

  const handleReset = () => {
    setFormBody(InitialValue);
    setAllowedGenInput("");
    setErrors({});
  };

  return (
    <>
      <AdminNavbar layout="Potential Keys" page="Create Potential Key" showBackButton={true} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
          title="Create Potential User Key"
          action={{
            show: true,
            buttonTitle: "Cancel",
            buttonProps: { onClick: () => navigate(-1) },
            colorButton: "red",
          }}
        >
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            <InputGroup
              type="text"
              label="Key Code (e.g. TALENTA-01)"
              value={formBody.key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormBody({ ...formBody, key: e.target.value })
              }
              error={errors.key}
              disabled={mutation.isPending}
            />

            <InputGroup
              type="number"
              label="Max Usage"
              value={formBody.maxUsage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormBody({ ...formBody, maxUsage: Number(e.target.value) })
              }
              error={errors.maxUsage}
              disabled={mutation.isPending}
            />

            <InputGroup
              type="text"
              label="Allowed Generations (comma-separated, e.g. 2023, 2024)"
              value={allowedGenInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAllowedGenInput(e.target.value)
              }
              error={errors.allowedGenInput}
              disabled={mutation.isPending}
            />

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Expiration Date
              </label>
              <input
                type="datetime-local"
                value={formBody.expiredAt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormBody({ ...formBody, expiredAt: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-all duration-200 ${
                  errors.expiredAt ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                }`}
                disabled={mutation.isPending}
              />
              {errors.expiredAt && (
                <p className="text-red-500 text-xs mt-1">{errors.expiredAt}</p>
              )}
            </div>

            <div className="flex justify-center items-center gap-5 pt-4">
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
                {mutation.isPending ? "Creating..." : "Create Key"}
              </Button>
            </div>
          </form>
        </PageLayout>
      </div>
    </>
  );
};

export default AddPotentialUserKeyView;
