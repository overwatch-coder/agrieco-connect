import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

type SubscribeModalProps = {
  setSubscribedTopics: React.Dispatch<React.SetStateAction<string[]>>;
  subscribedTopics: string[];
};

const allTopics = [
  "Poultry",
  "Cash Crop Farming",
  "Forestry",
  "Fisheries",
  "Agriculture",
  "Livestock",
  "Dairy",
  "Beef",
  "Pork",
  "Eggs",
  "Milk",
  "Yogurt",
  "Cheese",
  "Wheat",
  "Rice",
  "Corn",
  "Soybeans",
  "Sugar",
  "Coffee",
];

const SubscribeModal = ({
  subscribedTopics,
  setSubscribedTopics,
}: SubscribeModalProps) => {
  const toggleSubcribeTopic = (topic: string) => {
    if (subscribedTopics.includes(topic)) {
      setSubscribedTopics(
        subscribedTopics.filter((t) => t.toLowerCase() !== topic.toLowerCase())
      );
    } else {
      setSubscribedTopics([...subscribedTopics, topic]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-transparent border-primary-brown text-primary-brown text-center bg-transparent border rounded-none px-5 py-2">
        Subscribe
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl flex flex-col gap-5 h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown text-xl font-bold">
              All Topics
            </span>
            <span className="text-sm text-secondary-gray font-medium">
              Subscribe or Unscubscribe to topics
            </span>
          </DialogTitle>

          <DialogClose className="h-6 w-6 flex items-center justify-center rounded-full border-red-500 border">
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Subscribe to Topics */}
        <div className="flex flex-col gap-5 overflow-y-scroll scrollbar-hide">
          {allTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-5"
            >
              <p>{topic}</p>

              {subscribedTopics.includes(topic) ? (
                <button
                  className="hover:bg-transparent border-primary-brown text-primary-brown text-center bg-transparent border rounded-none px-5 w-32 py-2"
                  onClick={() => toggleSubcribeTopic(topic)}
                >
                  Unsubscribe
                </button>
              ) : (
                <button
                  className="hover:bg-primary-green text-white text-center bg-primary-green rounded-none w-32 px-5 py-2"
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
