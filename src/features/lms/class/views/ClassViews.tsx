import { PageLayout } from "../../../_global/components/PageLayout";
import { ClassContent } from "../components/ClassContent";

export const ClassViews = () => {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
      <PageLayout title="Class List">
        <ClassContent />
      </PageLayout>
    </div>
  );
};
