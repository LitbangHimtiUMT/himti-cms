import DefaultImage from "@core/assets/default-image.png";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useAnggota } from "@features/admin/anggota/hooks/useAnggota";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStrukturalCreation } from "../hooks/useStruktural";
import {
  Department,
  Jabatan,
  StrukturalDTO,
  departmentOptions,
  isStrukturalSigner,
} from "../model/struktural";

const InitialValue: StrukturalDTO = {
  memberId: "",
  jabatan: "",
  department: "",
  image: "",
  signatureImage: "",
};

interface ImageFile extends File {
  preview: string;
}

const jabatanValues: Jabatan[] = [
  "KETUA_HIMPUNAN",
  "WAKIL_KETUA_HIMPUNAN",
  "BENDAHARA",
  "SEKRETARIS",
  "KETUA_DEPARTMENT",
];

const FormAddAcara: React.FC = () => {
  const [searchAnggota, setSearchAnngota] = useState("");
  const { data: anggota, isLoading: isLoadingAnggota } = useAnggota({
    perPage: 100000,
    search: searchAnggota,
  });

  const mutation = useStrukturalCreation();


  const [strukturalBody, setStrukturalBody] = useState<StrukturalDTO>({
    ...InitialValue,
  });
  const [imageFile, setImageFile] = useState<ImageFile | ArrayBuffer | string | null>(
    DefaultImage
  );
  // No placeholder: the preview only appears once a file is chosen.
  const [signatureImageFile, setSignatureImageFile] = useState<
    ImageFile | ArrayBuffer | string | null
  >(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof StrukturalDTO, string>>
  >({});

  const navigate = useNavigate();

  const isSigner = isStrukturalSigner(
    strukturalBody.jabatan as Jabatan | "",
    strukturalBody.department as Department | ""
  );

  const validate = () => {
    const newErrors: Partial<Record<keyof StrukturalDTO, string>> = {};
    let isValid = true;

    if (!strukturalBody.memberId) {
      newErrors.memberId = "Anggota is required";
      isValid = false;
    }
    if (!strukturalBody.jabatan) {
      newErrors.jabatan = "Jabatan Time is required";
      isValid = false;
    }
    if (!strukturalBody.image && (!imageFile || imageFile === DefaultImage)) {
      newErrors.image = "Image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const formData = new FormData();
    // department (short code, "" when unset) and signatureImage (File, or
    // the current URL/"" when unchanged) ride along through this loop
    // exactly like image; see the model for the field contract.
    Object.entries(strukturalBody).forEach(([key, value]) => {
      formData.append(key, value as unknown as string);
    });

    await mutation.mutateAsync({
      type: "create",
      data: formData,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    setStrukturalBody((prev) => ({
      ...prev,
      image: file as File,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setStrukturalBody((prev) => ({
        ...prev,
        signatureImage: file as File,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleReset = () => {
    setStrukturalBody(InitialValue);
    setImageFile(DefaultImage);
    setSignatureImageFile(null);
    const fileInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    const signatureFileInput = document.getElementById(
      "signature-image-input"
    ) as HTMLInputElement;
    if (signatureFileInput) {
      signatureFileInput.value = "";
    }
    setErrors({});
  };


  return (
    <PageLayout
      title="Add Struktural"
      headBackground="blue"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex sm:flex-col flex-col gap-2">
          <InputGroup
            type="search"
            label="Search Anggota"
            variant="outlined"
            value={searchAnggota}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchAnngota(e.target.value);
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
              defaultValue={strukturalBody.memberId as string}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setStrukturalBody({
                  ...strukturalBody,
                  memberId: e,
                });
              }}
              error={errors.memberId}
              options={[
                {
                  value: "",
                  label: "Pilih Anggota",
                },
                ...(anggota?.data.map((anggota) => ({
                  value: anggota.id,
                  label: anggota.name,
                })) || []),
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
        <div className="mb-4">
          <InputGroup
            disabled={mutation.isPending}
            type="select"
            label="Status"
            value={strukturalBody.jabatan as string}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setStrukturalBody({
                ...strukturalBody,
                jabatan: e,
              });
            }}
            error={errors.jabatan}
            options={jabatanValues.map((jabat) => ({
              value: jabat,
              label: jabat.replace(/_/g, " "),
            }))}
          />
        </div>
        <div className="mb-4">
          <InputGroup
            disabled={mutation.isPending}
            type="select"
            label="Department"
            value={strukturalBody.department as string}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setStrukturalBody({
                ...strukturalBody,
                department: e,
              });
            }}
            options={departmentOptions}
          />
        </div>

        <div className="flex justify-start items-center my-6">
          <img
            src={imageFile as string}
            alt="Struktural Image"
            className="max-w-[200px] h-[200px] max-h-[200px] rounded-md object-cover"
          />
        </div>
        <div className='mb-4'>
          <div className='flex items-center w-full'>
            <input
              type='file'
              className='file-input w-full border border-solid border-black'
              onChange={handleImageChange}
            />
          </div>
        </div>
        {signatureImageFile && (
          <div className="flex justify-start items-center my-6">
            <img
              src={signatureImageFile as string}
              alt="Signature Image"
              className="max-w-[200px] h-[200px] max-h-[200px] rounded-md object-contain bg-white border border-solid border-black"
            />
          </div>
        )}
        <div className='mb-4'>
          <p className="block text-xs font-semibold text-gray-600 mb-1">
            Signature Image (optional)
          </p>
          <div className='flex items-center w-full'>
            <input
              id='signature-image-input'
              type='file'
              className='file-input w-full border border-solid border-black'
              onChange={handleSignatureImageChange}
            />
          </div>
          {isSigner && !strukturalBody.signatureImage && (
            <p className="text-red-500 text-xs mt-1">TTD belum diupload</p>
          )}
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
            {mutation.isPending ? "Loading..." : "Create"}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default FormAddAcara;
