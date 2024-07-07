import DoughnutChart from "@/components/graphs/DoughnutChart";

const labels = [
  "Crop Production",
  "Animal Husbandry",
  "Agroforestry",
  "Systainable and Organic Farming",
];
const data = [275, 200, 287, 173];
const colors = ["#4880FF", "#4CAF50", "#795548", "#C0D2F0"];

const DashboardEventCategoriesChart = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <DoughnutChart labels={labels} data={data} bgColors={colors} />
    </div>
  );
};

export default DashboardEventCategoriesChart;
