import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { RiLogoutCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAppContext } from "@/hooks/useAppContext";

const Logout = ({
  showLogoutName,
  headerLogout,
}: {
  showLogoutName?: boolean;
  headerLogout?: boolean;
}) => {
  const [auth, setAuth] = useAuth();
  const isUser = !auth?.email.toLowerCase().startsWith("admin");
  const { setIsUserAuthenticated } = useAppContext();

  // handle logout
  const handleLogout = async () => {
    setAuth(null);
    setIsUserAuthenticated(false);
    toast.success("You have been logged out");
  };

  return (
    <AlertDialog>
      <>
        {headerLogout ? (
          <AlertDialogTrigger>Logout</AlertDialogTrigger>
        ) : (
          <AlertDialogTrigger className="hover:no-underline hover:scale-105 ps-3 flex flex-col items-start mt-16 transition">
            <p className="flex items-center gap-4 font-bold">
              <RiLogoutCircleLine
                size={20}
                className={isUser ? "text-primary-brown" : "text-white"}
              />
              {showLogoutName ? (
                <span
                  className={`${isUser ? "text-primary-brown" : "text-white"} text-lg`}
                >
                  Logout
                </span>
              ) : (
                <span
                  className={
                    isUser
                      ? "lg:block hidden text-lg text-primary-brown"
                      : "text-white"
                  }
                >
                  Logout
                </span>
              )}
            </p>
          </AlertDialogTrigger>
        )}
      </>

      <AlertDialogContent
        id="hide"
        className="flex flex-col gap-4 px-5 rounded-none"
      >
        <AlertDialogHeader className="flex flex-col gap-3">
          <AlertDialogTitle className="flex items-center justify-between">
            <span className="text-primary-brown text-2xl font-bold">
              Logout
            </span>
            <AlertDialogCancel className="hover:bg-transparent hover:outline-none bg-transparent border-0 outline-none">
              <X
                className="text-red-500 border border-red-500 rounded-full"
                size={20}
              />
            </AlertDialogCancel>
          </AlertDialogTitle>

          <AlertDialogDescription className="flex flex-col gap-5">
            <p className="text-secondary-gray font-semibold">
              Are you sure you want to logout?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-primary-green md:px-10 md:w-fit w-full py-3 text-white"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Logout;
