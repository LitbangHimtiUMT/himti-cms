import {
  Card,
  CardContent,
  CardTitle,
} from "../../../../_global/components/Card";
import { SimpleLoadingTable } from "../../../../_global/components/SimpleLoadingTable";
import { formatRupiah } from "../../../../_global/helper";
import { useMentorById } from "../../hooks/useMentors";

export const DetailMentorContent = () => {
  const { data: mentor, isFetching } = useMentorById();

  if (isFetching) {
    return <SimpleLoadingTable isTable={false} />;
  }

  return (
    <>
      <Card title="Informasi Mentor">
        <CardContent>
          <CardTitle
            label="Nama"
            separator=":"
            value={mentor?.data?.name || "-"}
          />
          <CardTitle
            label="Email"
            separator=":"
            value={mentor?.data?.email || "-"}
          />
          <CardTitle
            label="Balance"
            separator=":"
            value={formatRupiah(mentor?.data?.balance ?? 0)}
          />
          <CardTitle
            label="Total Uang Keluar"
            separator=":"
            value={formatRupiah(mentor?.data?.totalExpend ?? 0)}
          />
          <CardTitle
            label="Total Uang Masuk"
            separator=":"
            value={formatRupiah(mentor?.data?.totalIncome ?? 0)}
          />
        </CardContent>
      </Card>
    </>
  );
};
