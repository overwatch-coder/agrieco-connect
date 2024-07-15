import { useAppContext } from "@/hooks/useAppContext";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// instantiate axios
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://ec2-34-239-105-167.compute-1.amazonaws.com/api",
});

export const slugifyData = (data: string) => {
  return slugify(data, {
    lower: true,
    strict: true,
    trim: true,
    replacement: "-",
  });
};

export const UrlPath = () => {
  const { urlPath } = useAppContext();

  return urlPath;
};

export const IsAuth = () => {
  const [auth] = useAuth();

  return auth !== null ? true : false;
};

// get future time
export const getEndTime = (startTime: string) => {
  // Parse the start time
  const [time, modifier] = startTime.split(" ");
  let [hours, minutes]: number[] | string[] = time.split(":");
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  // Convert to 24-hour format if necessary
  if (modifier === "PM" && hours < 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Add 30 minutes
  minutes += 30;
  if (minutes >= 60) {
    minutes -= 60;
    hours += 1;
  }

  // Handle hours overflow
  if (hours >= 24) {
    hours -= 24;
  }

  // Format end time in 12-hour format with AM/PM
  const endModifier = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, set it to 12

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${endModifier}`;
};
