import { faker } from "@faker-js/faker";

const SystemLogsAnalytics = () => {
  faker.seed(124);

  return (
    <section className="sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-10">
      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {faker.number.int({ min: 100, max: 1000 })}
          </p>
          <p className="text-primary-brown text-sm font-medium">Total Logs</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {faker.number.int({ min: 50, max: 2000 })}
          </p>
          <p className="text-primary-brown text-sm font-medium">Error Logs</p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-black">
            {faker.number.int({ min: 50, max: 2000 })}
          </p>
          <p className="text-primary-brown text-sm font-medium">
            User Activity Logs
          </p>
        </div>
      </div>

      <div className="rounded-xl 2xl:p-10 flex items-center justify-between col-span-1 gap-2 p-5 bg-white">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold text-black">
            {faker.number.int({ min: 10, max: 5000 })}
          </p>
          <p className="text-primary-brown text-sm font-medium">
            System Warnings
          </p>
        </div>
      </div>
    </section>
  );
};

export default SystemLogsAnalytics;
