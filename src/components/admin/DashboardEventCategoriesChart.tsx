import DoughnutChart from "@/components/graphs/DoughnutChart";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import seedColor from "seed-color";

const DashboardEventCategoriesChart = () => {
  const { data: trendsData } = useFetch<ITrend[]>({
    queryKey: "trends",
    url: "/feeds/trending-keywords",
    enabled: true,
  });

  const [trends, setTrends] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    if (trendsData) {
      const names = Object.keys(trendsData);
      const values = Object.values(trendsData);

      const data = names.map((name, index) => ({
        name,
        value: values[index] as unknown as number,
      }));

      setTrends(data);
    }
  }, [trendsData]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <DoughnutChart
        labels={trends.map((trend) => trend.name)}
        data={trends.map((trend) => trend.value)}
        bgColors={Array.from(Array(trends.length).keys()).map((trend) =>
          seedColor(trend.toString()).toHex()
        )}
      />
    </div>
  );
};

export default DashboardEventCategoriesChart;
