import { Search } from "lucide-react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TopicItem from "@/components/TopicItem";
import { userFeeds as userTopics } from "@/constants";
import SubscribeModal from "@/components/SubscribeModal";

const Topics = () => {
  const [searchTopic, setSearchTopic] = useState("");
  const [subscribedTopics, setSubscribedTopics] = useState<string[]>([
    "Poultry",
    "Cash Crop Farming",
    "Forestry",
    "Fisheries",
  ]);

  const handleSearchTopic = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchTopic);
    setSearchTopic("");
  };

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title>Topics - Agrieco-Connect </title>
        <meta name="description" content="Topics" />
      </Helmet>

      <div className="flex flex-col gap-10 md:gap-6 p-5 w-full">
        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between w-full md:gap-5">
          <TopicsDropdown />
          <form
            onSubmit={handleSearchTopic}
            className="flex items-center flex-grow w-full gap-3 px-4 bg-white rounded-lg"
          >
            <Search size={25} className="text-secondary-gray" />
            <input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="Search"
              className="placeholder-secondary-gray/80 w-full px-1 py-3 text-sm bg-transparent outline-none"
            />
          </form>
        </section>

        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            All Topics
          </h2>

          <SubscribeModal
            subscribedTopics={subscribedTopics}
            setSubscribedTopics={setSubscribedTopics}
          />
        </section>

        <section className="flex flex-wrap flex-row items-center w-full gap-3 md:gap-5">
          {subscribedTopics.map((topic) => (
            <button
              key={topic}
              className="border-primary-brown text-secondary-gray px-5 py-2 text-sm font-normal bg-white border"
            >
              {topic}
            </button>
          ))}
        </section>

        <section className="flex flex-col w-full gap-5">
          {userTopics.map((topic) => (
            <TopicItem key={topic.id} {...topic} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Topics;

const TopicsDropdown = () => {
  const [selectedTopic, setSelectedTopic] = useState("Activity");

  const handleSelectTopic = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSelectedTopic(e.currentTarget.innerText!);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-primary-brown w-fit px-7 flex items-center gap-2 py-2 font-medium text-center bg-white border">
        <span className="text-secondary-gray text-xs">{selectedTopic}</span>
        <IoMdArrowDropdown
          size={20}
          strokeWidth={1}
          className="text-secondary-gray"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white">
        <DropdownMenuItem onClick={handleSelectTopic}>
          Activity
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSelectTopic}>Search</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSelectTopic}>
          New Post
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSelectTopic}>
          Cash Crops
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSelectTopic}>Poultry</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
