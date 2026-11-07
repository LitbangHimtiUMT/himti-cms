import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { Button } from "@material-tailwind/react";
import { useContactInfoById, useContactInfoCreation } from "../hooks/useContactInfo";
import { ContactInfoDTO } from "../model/contactInfo";

const EditContactInfoView: React.FC = () => {
  const navigate = useNavigate();
  const { data: contactDetail, isLoading: isLoadingDetail } = useContactInfoById();
  const mutation = useContactInfoCreation();

  const [formBody, setFormBody] = useState<ContactInfoDTO>({
    key: "",
    value: "",
    group: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfoDTO, string>>>({});

  // Populate data when loaded
  useEffect(() => {
    if (contactDetail?.data) {
      const { key, value, group } = contactDetail.data;
      setFormBody({
        key: key || "",
        value: value || "",
        group: group || "",
      });
    }
  }, [contactDetail]);

  const validate = () => {
    const newErrors: Partial<Record<keyof ContactInfoDTO, string>> = {};
    let isValid = true;

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
      type: "update",
      data: {
        key: formBody.key.trim(),
        value: formBody.value.trim(),
        group: formBody.group.trim(),
      },
      id: contactDetail?.data?.id,
    });
  };

  return (
    <>
      <AdminNavbar layout="Contact Info" page="Edit Contact" showBackButton={true} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
          title="Edit Contact Configuration"
          action={{
            show: true,
            buttonTitle: "Cancel",
            buttonProps: { onClick: () => navigate(-1) },
            colorButton: "red",
          }}
        >
          {isLoadingDetail ? (
            <SimpleLoadingTable isTable={false} />
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
              <InputGroup
                type="text"
                label="Group / Category"
                value={formBody.group}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormBody({ ...formBody, group: e.target.value })
                }
                error={errors.group}
                disabled={mutation.isPending}
              />

              <InputGroup
                type="text"
                label="Key Name"
                value={formBody.key}
                disabled={true} // Key is usually immutable once created
              />

              <InputGroup
                type="textarea"
                label="Value"
                value={formBody.value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormBody({ ...formBody, value: e.target.value })
                }
                error={errors.value}
                disabled={mutation.isPending}
              />

              <div className="flex justify-center items-center gap-5 pt-4">
                <Button
                  className="text-white"
                  type="submit"
                  variant="gradient"
                  color="blue"
                  fullWidth
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </PageLayout>
      </div>
    </>
  );
};

export default EditContactInfoView;
