import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswer(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answers, setAnswer] = useState([]);

  useEffect(() => {
    async function fetchAnswer() {
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoId + "/questions");
      const answerQuery = query(answerRef, orderByKey());

      try {
        setLoading(true);
        const snapshort = await get(answerQuery);

        if (snapshort.exists()) {
            setAnswer((prev) => {
            return [...prev, ...Object.values(snapshort.val())];
          });
        }
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log("There was error!");
        setLoading(false);
        setError(true);
      }
    }

    fetchAnswer();
  }, [videoId]);

  return {
    loading,
    error,
    answers,
  };
}
