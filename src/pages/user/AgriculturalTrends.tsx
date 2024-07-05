import AgriculturalTrendItemModal from "@/components/AgriculturalTrendItemModal";
import { agriculturalTrends } from "@/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

const agriculturalTrendHashtags = Array.from(
  new Set(agriculturalTrends.map((trend) => trend.category))
).slice(0, 5);

export type AgriculturalTrendsItemType = (typeof agriculturalTrends)[number];

const AgriculturalTrends = () => {
  const [trends, setTrends] =
    useState<AgriculturalTrendsItemType[]>(agriculturalTrends);

  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const filterTrends = useCallback(() => {
    const trend = searchParams.get("trend");

    if (trend) {
      setTrends(
        agriculturalTrends.filter(
          (item) =>
            item.title.toLowerCase().includes(trend.toLowerCase()) ||
            item.category.toLowerCase().includes(trend.toLowerCase()) ||
            item.description.toLowerCase().includes(trend.toLowerCase()) ||
            item.hashtags.some(
              (hashtag) => hashtag.toLowerCase() === trend.toLowerCase()
            )
        )
      );
    } else {
      setTrends(agriculturalTrends);
    }
  }, [searchParams]);

  useEffect(() => {
    filterTrends();

    return () => {
      setTrends(agriculturalTrends);
    };
  }, [filterTrends, searchParams]);

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title>Agricultural Trends - Agrieco-Connect </title>
        <meta
          name="description"
          content="Agricultural Trends - Agrieco-Connect"
        />
      </Helmet>

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5 mx-auto">
        <section className="md:items-center md:flex-row md:justify-between flex flex-col items-start w-full gap-5">
          <h2 className="text-sm sm:text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            {`Latest ${searchParams.has("trend") ? searchParams.get("trend") : "Agricultural"} Trends`}
          </h2>
        </section>

        <p className="text-sm font-normal text-black">
          Stay updated with the newest trends and innovations in agriculture.
        </p>

        <section className="md:gap-5 flex flex-row flex-wrap items-center w-full gap-3">
          <Link
            to={`/user/agriculture-trends`}
            className="border-primary-brown text-secondary-gray px-5 py-2 text-sm font-normal bg-white border-2"
          >
            #All
          </Link>

          {agriculturalTrendHashtags.map((trend) => (
            <Link
              to={`/user/agriculture-trends?trend=${trend}`}
              key={trend}
              className="border-primary-brown text-secondary-gray px-5 py-2 text-sm font-normal bg-white border-2"
            >
              #{trend}
            </Link>
          ))}
        </section>

        {trends.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full gap-5">
            <span className="text-primary-brown text-xl font-bold">
              No Trends Found
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Click on a trend to view the latest agricultural trends.
            </span>
          </div>
        ) : (
          <section className="md:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-5">
            {trends.map((trend) => (
              <AgriculturalTrendsItem key={trend.id} item={trend} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default AgriculturalTrends;

const AgriculturalTrendsItem = ({
  item,
}: {
  item: AgriculturalTrendsItemType;
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="relative flex flex-col w-full h-full col-span-1 gap-3 p-3 bg-white rounded-md shadow">
        <button
          onClick={handleOpenModal}
          className="top-7 left-7 bg-primary-green absolute z-30 px-3 py-1 text-sm text-center text-white rounded-md"
        >
          Read More
        </button>

        <div
          onClick={handleOpenModal}
          className="group w-full h-full md:h-[250px] xl:h-[300px] overflow-hidden cursor-pointer"
        >
          <img
            src={item.image}
            alt-={item.title}
            className="group-hover:scale-105 object-cover object-center w-full h-full transition-transform rounded"
          />
        </div>

        <div className="flex flex-col flex-1 gap-4 pb-3">
          <h3 className="flex flex-col gap-1 text-base font-normal text-black capitalize">
            <span className="cursor-pointer" onClick={handleOpenModal}>
              {item.title}
            </span>
            <span className="text-xs font-bold">{item.category}</span>
          </h3>

          <p className="text-sm leading-relaxed text-black">
            {item.description.length > 100
              ? item.description.slice(0, 100)
              : item.description}
            {item.description.length > 100 && (
              <span
                onClick={handleOpenModal}
                className="hover:underline px-1 font-medium cursor-pointer"
              >
                Read more ...
              </span>
            )}
          </p>

          <p className="text-secondary-gray mt-auto text-xs">
            {item.datePosted}
          </p>
        </div>
      </div>

      <AgriculturalTrendItemModal
        item={item}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
