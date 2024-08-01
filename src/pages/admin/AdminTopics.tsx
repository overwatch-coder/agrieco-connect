import { Helmet } from "react-helmet-async";
import AdminTopicsAnalytics from "@/components/admin/AdminTopicsAnalytics";
import AdminTopicsTable from "@/components/admin/AdminTopicsTable";
import AddTopic from "@/components/admin/AddTopic";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import RenderContentLoading from "@/components/shared/RenderContentLoading";

const AdminTopics = () => {
  // === use fetch ===
  const {
    data: topicsData,
    isLoading,
    refetch: refetchTopics,
  } = useFetch<ITopic[]>({
    queryKey: "topics",
    url: "/topics",
    enabled: true,
  });

  // === use state ===
  const [topics, setTopics] = useState<ITopic[]>([]);

  // === use effect ===
  useEffect(() => {
    if (topicsData) {
      setTopics(topicsData);
    }
  }, [topicsData]);

  return (
    <div className="flex flex-col gap-5 py-6">
      {/* Title */}
      <Helmet>
        <title>Topics | Admin - Agrieco-Connect </title>
        <meta
          name="description"
          content="Manage all the topics of the Agrieco-Connect platform."
        />
      </Helmet>

      {/* Analytics */}
      <AdminTopicsAnalytics topics={topics} />

      {/* System Logs */}
      <section className="grid w-full grid-cols-1 gap-5">
        <div className="flex flex-col w-full h-full col-span-1 gap-5 bg-white rounded-md shadow">
          <h2 className="flex items-center justify-between gap-2 px-5 py-3">
            <span className="text-primary-brown font-medium">All Topics</span>

            <AddTopic refetchTopics={refetchTopics} />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          {/* System Logs */}
          <AdminTopicsTable
            topics={topics.sort((a, b) => b.id - a.id)}
            refetchTopics={refetchTopics}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminTopics;
