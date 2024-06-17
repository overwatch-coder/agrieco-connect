import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// instantiate axios
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
