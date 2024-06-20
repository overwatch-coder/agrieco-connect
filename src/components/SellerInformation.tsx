import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { MarketPlaceItemType } from "@/pages/user/MyItemsMarketPlace";
import { X } from "lucide-react";

type SellerInformationProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: MarketPlaceItemType;
};

const SellerInformation = ({
  openModal,
  setOpenModal,
  item,
}: SellerInformationProps) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-full max-w-2xl h-[90vh] flex bg-white rounded-none flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-primary-brown text-xl md:text-3xl font-bold">
              Seller Information
            </span>
            <span className="text-sm text-secondary-gray font-normal">
              Contact seller to purchase the item
            </span>
          </DialogTitle>

          <DialogClose className="h-6 w-6 flex items-center justify-center rounded-full border-red-500 border">
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* Contact Seller */}
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-5 place-content-start place-items-start text-secondary-gray text-base">
            <h3>Name</h3>
            <p>{item.seller}</p>
          </div>
          <div className="grid grid-cols-2 gap-5 place-content-start place-items-start text-secondary-gray text-base">
            <h3>Location</h3>
            <p>{item.location}</p>
          </div>
          <div className="grid grid-cols-2 gap-5 place-content-start place-items-start text-secondary-gray text-base">
            <h3>Contact Details</h3>
            <p>xxxxxxxxxxxxxxx</p>
          </div>
          <div className="grid grid-cols-2 gap-5 place-content-start place-items-start text-secondary-gray text-base">
            <h3>Company</h3>
            <p>{item.seller}</p>
          </div>
          <div className="grid grid-cols-2 gap-5 place-content-start place-items-start text-secondary-gray text-base">
            <h3>Others</h3>
            <p>xxxxxxxxxxxxxx</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellerInformation;
