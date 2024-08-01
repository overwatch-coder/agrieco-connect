import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";

const AdminTopicsAnalytics = ({ topics }: { topics: ITopic[] }) => {
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
    <section className="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-10">
      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">{topics.length}</p>
          <p className="text-primary-brown text-sm font-medium">Total Topics</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {Math.floor(Math.random() * topics.length)}
          </p>
          <p className="text-primary-brown text-sm font-medium">
            Subscribed Topics
          </p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {Math.floor(Math.random() * topics.length)}
          </p>
          <p className="text-primary-brown text-sm font-medium">New Topics</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold text-black">
            {
              topics.filter((item) =>
                trends.some((trend) => trend.name === item.name)
              ).length
            }
          </p>
          <p className="text-primary-brown text-sm font-medium">
            Trending Topic
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminTopicsAnalytics;
