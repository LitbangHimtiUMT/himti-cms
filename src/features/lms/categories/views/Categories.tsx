import { PageLayout } from "../../../_global/components/PageLayout";
import { CategoryContent } from "../components/CategoryContent";

export const CategoriesViews = () => {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
      <PageLayout
        title="Categories"
        action={{
          show: true,
          buttonTitle: "Create Category",
        }}
      >
        <CategoryContent />
      </PageLayout>
    </div>
  );
};
