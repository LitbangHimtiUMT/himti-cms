import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import { PageLayout } from "@features/_global/components/PageLayout";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { Button } from "@material-tailwind/react";
import { useContactInfoCreation } from "../hooks/useContactInfo";
import { ContactInfoDTO } from "../model/contactInfo";

const InitialValue: ContactInfoDTO = {
  key: "",
  value: "",
  group: "social_media",
};

const AddContactInfoView: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useContactInfoCreation();

  const [formBody, setFormBody] = useState<ContactInfoDTO>({ ...InitialValue });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfoDTO, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof ContactInfoDTO, string>> = {};
    let isValid = true;

    if (!formBody.key.trim()) {
      newErrors.key = "Key Name is required";
      isValid = false;
    }
    if (!formBody.value.trim()) {
      newErrors.value = "Value is required";
      isValid = false;
    }
    if (!formBody.group.trim()) {
      newErrors.group = "Group Category is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    await mutation.mutateAsync({
      type: "create",
      data: {
        key: formBody.key.trim(),
        value: formBody.value.trim(),
        group: formBody.group.trim(),
      },
    });
  };

  const handleReset = () => {
    setFormBody(InitialValue);
    setErrors({});
  };

  return (
    <>
      <AdminNavbar layout="Contact Info" page="Create Contact" showBackButton={true} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
          title="Create Contact Configuration"
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
              label="Group / Category (e.g. social_media, office_info)"
              value={formBody.group}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormBody({ ...formBody, group: e.target.value })
              }
              error={errors.group}
              disabled={mutation.isPending}
            />

            <InputGroup
              type="text"
              label="Key Name (e.g. youtube, address, phone)"
              value={formBody.key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormBody({ ...formBody, key: e.target.value })
              }
              error={errors.key}
              disabled={mutation.isPending}
            />

            <InputGroup
              type="textarea"
              label="Value (e.g. https://youtube.com, Bekasi)"
              value={formBody.value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormBody({ ...formBody, value: e.target.value })
              }
              error={errors.value}
              disabled={mutation.isPending}
            />

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
                {mutation.isPending ? "Creating..." : "Create Contact"}
              </Button>
            </div>
          </form>
        </PageLayout>
      </div>
    </>
  );
};

export default AddContactInfoView;
