import { useState } from "react";
import { PageLayout } from "../../../_global/components/PageLayout";
import { CategoryContent } from "../components/CategoryContent";
import { ModalCreateCategory } from "../components/ModalCreateCategory";

export const CategoriesViews = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
      <PageLayout
        title="Categories"
        action={{
          show: true,
          buttonTitle: "Create Category",
          buttonProps: {
            onClick: () => setShowCreate(true),
          },
        }}
      >
        <CategoryContent />
      </PageLayout>
      <ModalCreateCategory
        show={showCreate}
        onHide={() => setShowCreate(false)}
      />
    </div>
  );
};
