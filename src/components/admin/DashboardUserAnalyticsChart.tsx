import LineChart from "@/components/graphs/LineChart";

const labels = ["Jan", "Feb", "Mar", "Apr", "May"];
const totalUsersData = [186, 305, 237, 300, 500];
const activeUsersData = [80, 200, 120, 190, 130];
const commonDatasetConfig = {
  borderWidth: 1,
  pointRadius: 5,
  pointHoverRadius: 10,
  pointStyle: "circle",
};

const datasets = [
  {
    label: "Total Users",
    backgroundColor: "#4880FF",
    borderColor: "#4880FF",
    data: totalUsersData,
    pointBackgroundColor: "#4880FF",
    ...commonDatasetConfig,
  },
  {
    label: "Active Users",
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
    data: activeUsersData,
    pointBackgroundColor: "#4CAF50",
    ...commonDatasetConfig,
  },
];

const DashboardUserAnalyticsChart = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <LineChart
        labels={labels}
        datasets={datasets}
        showLegend={false}
        smooth={true}
      />
    </div>
  );
};

export default DashboardUserAnalyticsChart;
