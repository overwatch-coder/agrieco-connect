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
import React, { forwardRef } from "react";

type LoginWithChildrenProps = {
  children?: React.ReactNode;
  className?: string;
  hasChildren: boolean;
  endPath?: string;
};

type LoginWithButtonNameProps = {
  buttonName?: string;
  className?: string;
  endPath?: string;
};

type PopUpLoginAlertProps = LoginWithChildrenProps & LoginWithButtonNameProps;

const LoginModal = forwardRef<HTMLButtonElement, PopUpLoginAlertProps>(
  ({ buttonName, className, children, hasChildren, endPath }, ref) => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    const handleRedirect = () => {
      navigate(`/login?redirect=${pathname}${endPath ? endPath : ""}`);
    };

    return (
      <Dialog>
        {hasChildren ? (
          <DialogTrigger ref={ref} className={cn("", className)}>
            {children}
          </DialogTrigger>
        ) : (
          <DialogTrigger
            ref={ref}
            className={cn(
              "bg-primary-brown text-white px-7 py-3 rounded text-center",
              className
            )}
          >
            {buttonName}
          </DialogTrigger>
        )}

        <DialogContent
          id="hide"
          className="flex flex-col gap-4 px-5 rounded-none"
        >
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle className="flex items-center justify-center">
              <span className="text-primary-brown text-2xl font-bold">
                You must be logged in to do this
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
  }
);

LoginModal.displayName = "LoginModal";

export default LoginModal;
