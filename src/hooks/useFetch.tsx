import { axiosInstance } from "@/lib/utils";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { UseFormReset } from "react-hook-form";

interface IUseFetch {
  url: string;
  queryKey: string;
  token?: string;
}

interface IUseMutateData {
  url: string;
  config: {
    method?: "POST" | "GET" | "PUT" | "DELETE";
    token?: string;
    contentType?: string;
    queryKey?: string;
    reset?: (values: { [key: string]: any }) => void;
    resetValues?: { [key: string]: any };
  };
}

// use fetch hook
export const useFetch = <TData,>({
  url,
  queryKey,
}: IUseFetch): UseQueryResult<TData, Error> => {
  const query = useQuery({
    queryKey: [queryKey, url],
    queryFn: async () => {
      const res = await axiosInstance.get(`${url}`);

      return res.data;
    },
  });

  return query;
};

export const useMutateData = <TData, TResponse = Record<string, unknown>>({
  url,
  config,
}: IUseMutateData) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: TData | null): Promise<TResponse> => {
      const headers = config.token
        ? {
            Authorization: config.token,
            "Content-Type": config.contentType || "application/json",
          }
        : {
            "Content-Type": config.contentType || "application/json",
          };

      const res = await axiosInstance({
        url,
        method: config.method || "POST",
        data: data ? data : {},
        headers,
      });

      return res.data;
    },
    onSuccess: (data: TResponse) => {
      console.log({ data, in: "useMutateData" });

      queryClient.invalidateQueries({
        queryKey: [config.queryKey, url],
      });

      if (config.reset) {
        config.reset({});
      }

      return data;
    },
    onError: (err) => {
      console.log({ err, in: "useMutateData" });

      if (config.reset) {
        config.reset(config.resetValues || {});
      }
    },
  });

  return mutation;
};
