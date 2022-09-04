import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestion(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    async function fetchQuestion() {
      const db = getDatabase();
      const questionRef = ref(db, "quiz/" + videoId + "/questions");
      const questionQuery = query(questionRef, orderByKey());

      try {
        setLoading(true);
        const snapshort = await get(questionQuery);

        if (snapshort.exists()) {
          setQuestion((prev) => {
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

    fetchQuestion();
  }, [videoId]);

  return {
    loading,
    error,
    question,
  };
}
