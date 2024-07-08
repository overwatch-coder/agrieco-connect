import { Helmet } from "react-helmet-async";
import { adminDashboardTopics as topics } from "@/constants";
import AdminTopicsAnalytics from "@/components/admin/AdminTopicsAnalytics";
import AdminTopicsTable from "@/components/admin/AdminTopicsTable";
import AddTopic from "@/components/admin/AddTopic";

export type Topics = (typeof topics)[number];

const AdminTopics = () => {
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
      <AdminTopicsAnalytics />

      {/* System Logs */}
      <section className="grid w-full grid-cols-1 gap-5">
        <div className="flex flex-col w-full h-full col-span-1 gap-5 bg-white rounded-md shadow">
          <h2 className="flex items-center justify-between gap-2 px-5 py-3">
            <span className="text-primary-brown font-medium">All Topics</span>

            <AddTopic />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          {/* System Logs */}
          <AdminTopicsTable topics={topics} />
        </div>
      </section>
    </div>
  );
};

export default AdminTopics;
