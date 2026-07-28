import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import { PageLayout } from "@features/_global/components/PageLayout";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { Button } from "@material-tailwind/react";
import DefaultImage from "@core/assets/default-image.png";
import { useProdiStructuralById, useProdiStructuralCreation } from "../hooks/useProdiStructural";
import { ProdiStructuralDTO } from "../model/prodiStructural";

const EditProdiStructuralView: React.FC = () => {
  const navigate = useNavigate();
  const { data: memberDetail, isLoading: isLoadingDetail } = useProdiStructuralById();
  const mutation = useProdiStructuralCreation();

  const [formBody, setFormBody] = useState<ProdiStructuralDTO>({
    name: "",
    role: "",
    bio: "",
    sequence: 1,
    image: "",
  });
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>(DefaultImage);
  const [errors, setErrors] = useState<Partial<Record<keyof ProdiStructuralDTO, string>>>({});

  // Populate data when loaded
  useEffect(() => {
    if (memberDetail?.data) {
      const { name, role, bio, sequence, image } = memberDetail.data;
      setFormBody({
        name: name || "",
        role: role || "",
        bio: bio || "",
        sequence: sequence || 1,
        image: "", // Don't set file, keep empty unless user uploads a new one
      });
      if (image) {
        setImageFile(image);
      }
    }
  }, [memberDetail]);

  const validate = () => {
    const newErrors: Partial<Record<keyof ProdiStructuralDTO, string>> = {};
    let isValid = true;

    if (!formBody.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formBody.role.trim()) {
      newErrors.role = "Role is required";
      isValid = false;
    }
    if (formBody.sequence <= 0) {
      newErrors.sequence = "Sequence must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", formBody.name);
    formData.append("role", formBody.role);
    formData.append("bio", formBody.bio);
    formData.append("sequence", String(formBody.sequence));
    if (formBody.image instanceof File) {
      formData.append("image", formBody.image);
    }

    await mutation.mutateAsync({
      type: "update",
      data: formData,
      id: memberDetail?.data?.id,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormBody((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <AdminNavbar layout="Prodi Structural" page="Edit Prodi Structural" showBackButton={true} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
          title="Edit Prodi Structural Member"
          action={{
            show: true,
            buttonTitle: "Cancel",
            buttonProps: { onClick: () => navigate(-1) },
            colorButton: "red",
          }}
        >
          {isLoadingDetail ? (
            <div className="text-center py-10">Loading member details...</div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
              <InputGroup
                type="text"
                label="Full Name"
                value={formBody.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormBody({ ...formBody, name: e.target.value })
                }
                error={errors.name}
                disabled={mutation.isPending}
              />

              <InputGroup
                type="text"
                label="Role / Position"
                value={formBody.role}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormBody({ ...formBody, role: e.target.value })
                }
                error={errors.role}
                disabled={mutation.isPending}
              />

              <InputGroup
                type="textarea"
                label="Bio"
                value={formBody.bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormBody({ ...formBody, bio: e.target.value })
                }
                error={errors.bio}
                disabled={mutation.isPending}
              />

              <InputGroup
                type="number"
                label="Sequence Order"
                value={formBody.sequence}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormBody({ ...formBody, sequence: Number(e.target.value) })
                }
                error={errors.sequence}
                disabled={mutation.isPending}
              />

              <div className="flex flex-col gap-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Profile Image (leave empty to keep current)
                </label>
                <div className="flex justify-start items-center my-2">
                  <img
                    src={imageFile as string}
                    alt="Preview"
                    className="w-[150px] h-[150px] rounded-md object-cover border shadow-sm"
                  />
                </div>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  className="file-input w-full border border-solid border-gray-300 rounded-lg p-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleImageChange}
                  disabled={mutation.isPending}
                />
              </div>

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

export default EditProdiStructuralView;
