import React from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }

  React.useEffect(() => {
    fetchData(url);
  }, []);

  return { loading, data, error, setData, setLoading, setError };
};
