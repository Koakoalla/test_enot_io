import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { actions } from "../../context/Provider";

const NEWS_NUMBER = 1;

const useGetNews = () => {
  const { refetch, isFetching } = useQuery(
    ["news"],
    () => {
      return api.news.getNews();
    },
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      enabled: false,
      onSuccess: ({ value: valueSuccess }) => {
        const prepareData = valueSuccess[NEWS_NUMBER].description;
        actions?.setNews(prepareData);
      },
      onError: () => {
        actions?.toggleNews(false);
      },
    },
  );

  return { refetch, isFetching };
};

export default useGetNews;
