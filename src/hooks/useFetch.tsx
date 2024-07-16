import { axiosInstance } from "@/lib/utils";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
  useMutation,
} from "@tanstack/react-query";

interface IUseFetch {
  url: string;
  queryKey: string;
  token?: string;
  enabled?: boolean; // Optional flag to enable/disable query fetching
}

export const useFetch = <TData,>({
  url,
  queryKey,
  enabled = true,
}: IUseFetch): UseQueryResult<TData, Error> => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [queryKey, url],
    queryFn: async () => {
      const res = await axiosInstance.get(`${url}`);
      return res.data;
    },
    enabled: enabled,
    refetchOnWindowFocus: "always",
    refetchInterval: 1000 * 60 * 1, // 1 minute
  });

  return query;
};

interface IUseMutateData {
  url: string;
  config: {
    method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    token?: string;
    contentType?: "application/json" | "multipart/form-data";
    queryKey?: string;
    reset?: (values: { [key: string]: any }) => void;
    resetValues?: { [key: string]: any };
  };
}

export const useMutateData = <TData, TResponse = Record<string, unknown>>({
  url,
  config,
}: IUseMutateData) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: TData | null): Promise<TResponse> => {
      const headers = {
        "Content-Type": config.contentType
          ? config.contentType
          : "application/json",
        Authorization: config.token ? `Bearer ${config.token}` : "",
      };

      const res = await axiosInstance({
        url,
        method: config.method ? config.method : "POST",
        data: data ? data : {},
        headers,
      });

      return res.data;
    },
    onSuccess: (data: TResponse) => {
      console.log({ data, in: "useMutateData success" });

      if (config.reset) {
        config.reset({});
      }

      // Invalidate relevant queries after mutation success
      if (config.queryKey) {
        queryClient.invalidateQueries({
          queryKey: [config.queryKey, url],
        });
      }

      return data;
    },
    onError: (err) => {
      console.log({ err, in: "useMutateData error" });

      if (config.reset) {
        config.reset(config.resetValues || {});
      }
    },
  });

  return mutation;
};
