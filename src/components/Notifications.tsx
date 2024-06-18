import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { notifications } from "@/constants";
import { Bell, X } from "lucide-react";

const Notifications = () => {
  return (
    <Dialog>
      <DialogTrigger>
        {/* Mobile Menu */}
        <p className="hover:scale-105 bg-white/30 md:hidden relative flex items-center gap-3 p-4 transition rounded">
          <Bell size={20} className={"text-white"} />
          <span className={"text-white text-base"}>Notifications</span>
          <span className="top-5 right-2 absolute flex flex-col items-center w-5 h-5 text-sm text-center text-white bg-red-500 rounded-full">
            4
          </span>
        </p>

        {/* Desktop Menu */}
        <p className="hover:scale-105 bg-secondary-gray/10 md:flex relative flex-col items-center hidden p-4 transition rounded-full">
          <Bell size={20} className={"text-primary-brown"} />
          <span className="absolute top-0 right-0 flex flex-col items-center w-5 h-5 text-sm text-center text-white bg-red-500 rounded-full">
            4
          </span>
        </p>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-4 w-full max-w-[95vw] md:max-w-[70vw] max-h-[90vh] h-full px-0 rounded-xl">
        <DialogHeader className="scrollbar-hide overflow-y-scroll">
          <DialogTitle className="border-b-primary-brown flex items-center justify-between pb-4 border-b">
            <span className="md:text-3xl ps-5 text-primary-brown text-xl font-bold">
              Notifications
            </span>
            <DialogClose>
              <X
                className="me-5 text-red-500 border border-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>

          <DialogDescription>
            {notifications.map((notification) => (
              <section
                key={notification.name}
                className="border-primary-brown py-5 border-b"
              >
                <div className="md:items-center md:flex-row flex flex-col gap-4 px-5">
                  <div className="flex items-center gap-2">
                    <img
                      src={notification.image}
                      alt={notification.name}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                    <p className="text-primary-green md:hidden text-xs font-semibold">
                      {notification.name}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="text-primary-green md:block hidden text-xs font-semibold">
                        {notification.name}
                      </p>
                      <p className="text-secondary-gray text-start text-xs">
                        {notification.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="text-primary-brown text-xs">
                        {notification.moment}
                      </p>

                      <Separator
                        orientation="vertical"
                        className="bg-primary-brown/50 w-[1px] h-7"
                      />

                      <p className="text-primary-brown text-xs">
                        {notification.time}
                      </p>

                      <Separator
                        orientation="vertical"
                        className="bg-primary-brown/50 w-[1px] h-7"
                      />

                      <p className="text-primary-brown/70 text-xs">
                        {notification.topic}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Notifications;
