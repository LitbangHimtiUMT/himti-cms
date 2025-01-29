import React, { useState } from "react";
import HIMTI from "@core/assets/Logo/HIMTI.png";
import { BaseTableVersion } from "../components/base-table-version";
import { ModalUpdate } from "../components/modal-update";
import { useVersion } from "../hooks/useVersion";
import { VersionModel } from "@core/model/version";

export const VersionView: React.FC = () => {
  const [show, setShow] = useState(false);
  const onHide = () => setShow((prev) => !prev);
  const { data: version } = useVersion();
  return (
    <>
      <div className="w-full h-min-[300px] bg-white mt-10 rounded-xl shadow-xl p-10 flex md:flex-row flex-col items-center gap-10">
        <div className="flex flex-col justify-center">
          <img src={HIMTI} width={200} />
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-lg font-bold"
            onClick={onHide}
          >
            Update
          </button>
        </div>
        <BaseTableVersion />
      </div>
      <ModalUpdate
        show={show}
        onHide={onHide}
        data={version?.data as VersionModel}
      />
    </>
  );
};
