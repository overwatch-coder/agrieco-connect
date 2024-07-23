import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useFetch } from "@/hooks/useFetch";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ResponsiveArticle from "react-content-loader";

type SubscribeModalProps = {
  setSubscribedTopics: React.Dispatch<React.SetStateAction<string[]>>;
  subscribedTopics: string[];
};

const SubscribeModal = ({
  subscribedTopics,
  setSubscribedTopics,
}: SubscribeModalProps) => {
  const { data: topics, isLoading } = useFetch<ITopic[]>({
    queryKey: "topics",
    url: "/topics",
    enabled: true,
  });

  const [allTopics, setAllTopics] = useState<string[]>([]);

  useEffect(() => {
    if (topics) {
      setAllTopics(topics.map((topic) => topic.name));
    }
  }, [topics]);

  const toggleSubcribeTopic = (topic: string) => {
    if (subscribedTopics.includes(topic)) {
      setSubscribedTopics(
        subscribedTopics.filter((t) => t.toLowerCase() !== topic.toLowerCase())
      );
    } else {
      setSubscribedTopics([...subscribedTopics, topic]);
    }
  };

  // === loading spinner when topics are loading ===
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-5 mx-auto">
        <ResponsiveArticle width={500} height={500} backgroundColor="#dddddd" />
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-transparent border-primary-brown text-primary-brown px-5 py-2 text-center bg-transparent border rounded-none">
        Subscribe
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl flex flex-col gap-5 h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown md:text-3xl text-xl font-bold">
              All Topics
            </span>
            <span className="text-secondary-gray text-sm font-normal">
              Subscribe or Unscubscribe to topics
            </span>
          </DialogTitle>

          <DialogClose className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full">
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Subscribe to Topics */}
        <div className="scrollbar-hide flex flex-col gap-5 overflow-y-scroll">
          {allTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-5"
            >
              <p>{topic}</p>

              {subscribedTopics.includes(topic) ? (
                <button
                  className="hover:bg-transparent border-primary-brown text-primary-brown w-32 px-5 py-2 text-center bg-transparent border rounded-none"
                  onClick={() => toggleSubcribeTopic(topic)}
                >
                  Unsubscribe
                </button>
              ) : (
                <button
                  className="hover:bg-primary-green bg-primary-green w-32 px-5 py-2 text-center text-white rounded-none"
                  onClick={() => toggleSubcribeTopic(topic)}
                >
                  Subscribe
                </button>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeModal;
