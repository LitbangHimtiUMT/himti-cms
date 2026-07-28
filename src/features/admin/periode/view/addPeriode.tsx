import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import { PageLayout } from "@features/_global/components/PageLayout";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { Button, Typography } from "@material-tailwind/react";
import DefaultImage from "@core/assets/default-image.png";
import { usePeriodeCreation } from "../hooks/usePeriode";
import { PeriodeDTO, MissionItem } from "../model/periode";

const InitialValue: PeriodeDTO = {
  period: "",
  name: "",
  vision: "",
  mission: "[]",
  isActive: true,
  logo: "",
};

const AddPeriodeView: React.FC = () => {
  const navigate = useNavigate();
  const mutation = usePeriodeCreation();

  const [formBody, setFormBody] = useState<PeriodeDTO>({ ...InitialValue });
  const [missionItems, setMissionItems] = useState<MissionItem[]>([{ title: "", description: "" }]);
  const [logoFile, setLogoFile] = useState<string | ArrayBuffer | null>(DefaultImage);
  const [errors, setErrors] = useState<Partial<Record<keyof PeriodeDTO | "missions", string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof PeriodeDTO | "missions", string>> = {};
    let isValid = true;

    if (!formBody.period.trim()) {
      newErrors.period = "Period (e.g. 2024/2025) is required";
      isValid = false;
    }
    if (!formBody.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formBody.vision.trim()) {
      newErrors.vision = "Vision is required";
      isValid = false;
    }
    if (!formBody.logo) {
      newErrors.logo = "Logo is required";
      isValid = false;
    }

    // Validate mission items
    const isMissionsValid = missionItems.every((item) => item.title.trim() && item.description.trim());
    if (missionItems.length === 0 || !isMissionsValid) {
      newErrors.missions = "All mission items must have a title and description";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("period", formBody.period);
    formData.append("name", formBody.name);
    formData.append("vision", formBody.vision);
    formData.append("mission", JSON.stringify(missionItems));
    formData.append("isActive", String(formBody.isActive));
    if (formBody.logo instanceof File) {
      formData.append("logo", formBody.logo);
    }

    await mutation.mutateAsync({
      type: "create",
      data: formData,
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormBody((prev) => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMission = () => {
    setMissionItems((prev) => [...prev, { title: "", description: "" }]);
  };

  const handleRemoveMission = (index: number) => {
    setMissionItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMissionChange = (index: number, field: keyof MissionItem, value: string) => {
    setMissionItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleReset = () => {
    setFormBody(InitialValue);
    setLogoFile(DefaultImage);
    setMissionItems([{ title: "", description: "" }]);
    const fileInput = document.getElementById("logo-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    setErrors({});
  };

  return (
    <>
      <AdminNavbar layout="Tenure Period" page="Create Period" showBackButton={true} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
          title="Create Tenure Period"
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
              label="Period Code (e.g., 2024/2025)"
              value={formBody.period}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormBody({ ...formBody, period: e.target.value })
              }
              error={errors.period}
              disabled={mutation.isPending}
            />

            <InputGroup
              type="text"
              label="Tenure Name (e.g. Kepengurusan Angkatan 24)"
              value={formBody.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormBody({ ...formBody, name: e.target.value })
              }
              error={errors.name}
              disabled={mutation.isPending}
            />

            <InputGroup
              type="textarea"
              label="Vision"
              value={formBody.vision}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormBody({ ...formBody, vision: e.target.value })
              }
              error={errors.vision}
              disabled={mutation.isPending}
            />

            <div className="mb-4">
              <InputGroup
                type="select"
                label="Is Active Period?"
                value={formBody.isActive ? "true" : "false"}
                onChange={(val: any) => {
                  setFormBody((prev) => ({
                    ...prev,
                    isActive: val === "true",
                  }));
                }}
                options={[
                  { value: "true", label: "Active" },
                  { value: "false", label: "Inactive" },
                ]}
                disabled={mutation.isPending}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Logo / Symbol
              </label>
              <div className="flex justify-start items-center my-2">
                <img
                  src={logoFile as string}
                  alt="Preview Logo"
                  className="w-[120px] h-[120px] rounded-md object-contain border bg-gray-50 p-2 shadow-sm"
                />
              </div>
              <input
                id="logo-input"
                type="file"
                accept="image/*"
                className="file-input w-full border border-solid border-gray-300 rounded-lg p-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleLogoChange}
                disabled={mutation.isPending}
              />
              {errors.logo && (
                <p className="text-red-500 text-xs mt-1">{errors.logo}</p>
              )}
            </div>

            {/* Mission Section */}
            <div className="border-t border-gray-100 pt-4 mt-6">
              <div className="flex justify-between items-center mb-3">
                <Typography className="text-sm font-semibold text-gray-800">
                  Mission List
                </Typography>
                <Button
                  type="button"
                  size="sm"
                  variant="outlined"
                  onClick={handleAddMission}
                  disabled={mutation.isPending}
                >
                  + Add Mission
                </Button>
              </div>

              {errors.missions && (
                <p className="text-red-500 text-xs mb-3 font-medium">{errors.missions}</p>
              )}

              <div className="space-y-4">
                {missionItems.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500">Mission #{index + 1}</span>
                      {missionItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMission(index)}
                          className="text-xs font-semibold text-red-500 hover:text-red-700"
                          disabled={mutation.isPending}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <InputGroup
                      type="text"
                      label="Title (e.g. Misi 1)"
                      value={item.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleMissionChange(index, "title", e.target.value)
                      }
                      disabled={mutation.isPending}
                    />
                    <InputGroup
                      type="textarea"
                      label="Description"
                      value={item.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        handleMissionChange(index, "description", e.target.value)
                      }
                      disabled={mutation.isPending}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center gap-5 pt-6">
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
                {mutation.isPending ? "Creating..." : "Create Period"}
              </Button>
            </div>
          </form>
        </PageLayout>
      </div>
    </>
  );
};

export default AddPeriodeView;
