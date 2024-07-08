import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { useLocation, useNavigate } from "react-router-dom";

type PopUpLoginAlertProps = {
  buttonName: string;
  className?: string;
};

const PopUpLoginAlert = ({ buttonName, className }: PopUpLoginAlertProps) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleRedirect = () => {
    navigate(`/login?redirect=${pathname}`);
  };

  return (
    <Dialog>
      <DialogTrigger className={cn("", className)}>{buttonName}</DialogTrigger>

      <DialogContent
        id="hide"
        className="flex flex-col gap-4 px-5 rounded-none"
      >
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="flex items-center justify-center">
            <span className="text-primary-brown text-2xl font-bold">
              Only logged in users can see this
            </span>
          </DialogTitle>

          <DialogDescription className="flex flex-col items-center gap-5">
            <p className="text-secondary-gray font-semibold">
              Do you want to login?
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="md:flex-row flex flex-col items-center gap-5">
          <DialogClose className="border-secondary-gray text-secondary-gray w-full py-2 border rounded">
            Cancel
          </DialogClose>
          <Button
            onClick={handleRedirect}
            className="bg-primary-green w-full px-4 py-4 text-white"
          >
            Go to Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpLoginAlert;
