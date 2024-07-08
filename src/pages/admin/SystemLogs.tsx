import { Helmet } from "react-helmet-async";
import { systemLogs } from "@/constants";
import SystemLogsAnalytics from "@/components/admin/SystemLogsAnalytics";
import SystemLogsTable from "@/components/admin/SystemLogsTable";

export type SystemLogs = (typeof systemLogs)[number];

const SystemLogs = () => {
  return (
    <div className="flex flex-col gap-5 py-6">
      {/* Title */}
      <Helmet>
        <title>System Logs - Agrieco-Connect </title>
        <meta
          name="description"
          content="View all the system logs of the Agrieco-Connect platform."
        />
      </Helmet>

      {/* Analytics */}
      <SystemLogsAnalytics />

      {/* System Logs */}
      <section className="grid w-full grid-cols-1 gap-5">
        <div className="flex flex-col w-full h-full col-span-1 gap-5 bg-white rounded-md shadow">
          <h2 className="flex items-center justify-between gap-2 px-5 py-3">
            <span className="text-primary-brown font-medium">System Logs</span>
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          {/* System Logs */}
          <SystemLogsTable systemLogs={systemLogs} />
        </div>
      </section>
    </div>
  );
};

export default SystemLogs;
