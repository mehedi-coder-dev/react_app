import { useEffect, useState } from "react";

export default function UseFetchPhoto(url, methods, header) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method: methods || "GET",
          headers: header,
        });
        const finalData = await response.json();
        setLoading(false);
        setImage(finalData);
      } catch (error) {
        console.log("error");
        setLoading(false);
        setError(true);
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    image,
  };
}
