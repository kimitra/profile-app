import { useEffect, useState } from "react";

export const useFetchProfiles = (url) => {
  const [apiProfiles, setApiProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
  console.log("API Response:", data);

  if (Array.isArray(data)) {
    // API returned array directly
    setApiProfiles(data);
  } else if (Array.isArray(data.profiles)) {
    // API returned { profiles: [...] }
    setApiProfiles(data.profiles);
  } else {
    setApiProfiles([]);
  }
})
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch profiles.");
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { apiProfiles, loading, error };
};