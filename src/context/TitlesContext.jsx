import { createContext, useState, useEffect } from "react";

const TitlesContext = createContext();

export const TitlesProvider = ({ children }) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php")
      .then((res) => res.json())
      .then((data) => {
        setTitles(data.titles || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <TitlesContext.Provider value={{ titles }}>
      {children}
    </TitlesContext.Provider>
  );
};
export default TitlesContext;