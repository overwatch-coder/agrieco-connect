import { useAppContext } from "@/hooks/useAppContext";
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
    import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com",
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

export const IsUserAuthenticated = () => {
  const { isUserAuthenticated } = useAppContext();

  return isUserAuthenticated;
};
