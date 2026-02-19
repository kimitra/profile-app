import { useEffect, useState, useContext } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Card from "./components/Card";
import Section from "./components/Section";
import Introduction from "./components/Introduction";
import Header from "./components/Header";
import AddProfile from "./components/AddProfile";
import Home from "./pages/Home";
import AddProfilePage from "./pages/AddProfilePage";
import FetchedProfilePage from "./pages/FetchedProfilePage";
import About from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import ProfileLayout from "./pages/ProfileLayout";
import ProfileDetail from "./pages/ProfileDetail";
import ModeContext from "./context/ModeContext";
import TitlesContext from "./context/TitlesContext";
import "./App.css";




const App = () => {

  const { mode, toggleMode } = useContext(ModeContext);
  const { titles } = useContext(TitlesContext);
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [fetchedProfiles, setFetchedProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [profiles, setProfiles] = useState([
    {
      image: "https://pbs.twimg.com/profile_images/2014810779845808128/m8uW-qWB_400x400.jpg",
      name: "Shane Hollander",
      title: "Student",
      year: "Senior",
      major: "Web Development",
      isFeatured: true,
    },
    {
      image: "https://pbs.twimg.com/profile_images/2014163555092672514/lBh7jSfO_400x400.jpg",
      name: "Ilya Rozanov",
      title: "Student",
      year: "Senior",
      major: "UX Design",
      isFeatured: false,
    },
    {
      image: "https://pbs.twimg.com/profile_images/2016633591388569602/LUDaWUDR_400x400.jpg",
      name: "Rose Landry",
      title: "TA",
      year: "Junior",
      major: "Animation",
      isFeatured: true,
    },
    {
    image: "https://pbs.twimg.com/profile_images/2012970250837331968/8Ltrzrrc_400x400.jpg",
      name: "Svetlana Vetrova",
      title: "TA",
      year: "Senior",
      major: "Web Design",
      isFeatured: false,
    },
  ]);

  useEffect(() => {
    setLoading(true);

    const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${
      selectedTitle === "All" ? "" : selectedTitle
    }&name=${searchText}&page=1&limit=10`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFetchedProfiles(data.profiles || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

  }, [selectedTitle, searchText]);

  const addProfile = (newProfile) => {
    setProfiles((prev) => [...prev, newProfile]);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchesTitle =
      selectedTitle === "All" || profile.title === selectedTitle;

    const matchesSearch =
      profile.name.toLowerCase().includes(searchText.toLowerCase());

    return matchesTitle && matchesSearch;
  });

  const handleReset = () => {
    setSelectedTitle("All");
    setSearchText("");
  };

  return (
    <HashRouter>
      <div className={`app ${mode}`}>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/add">Add Profile</Link>
          <Link to="/fetched">Fetched Profiles</Link>
          <Link to="/about">About</Link>
          <button className="mode-button" onClick={toggleMode}>
            Switch to {mode === "light" ? "Dark" : "Light"} Mode
            </button>
        </nav>

        <Introduction />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/add"
            element={<AddProfilePage onAddProfile={addProfile} />}
          />

          <Route
            path="/fetched"
            element={
              <FetchedProfilePage
                fetchedProfiles={fetchedProfiles}
                loading={loading} mode={mode}
              />
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/profile" element={<ProfileLayout />}>
            <Route path=":id" element={<ProfileDetail />} />
          </Route>
        </Routes>

        <div className="controls">
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
          >
            <option value="All">All</option>

            {(titles || []).map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button onClick={handleReset}>Reset</button>
        </div>

        <Section title="Student Profiles">
          {filteredProfiles.map((profile, index) => (
            <Card
              key={index}
              image={profile.image}
              name={profile.name}
              title={profile.title}
              year={profile.year}
              major={profile.major}
              isFeatured={profile.isFeatured}
              mode={mode}
            />
          ))}
        </Section>

      </div>
    </HashRouter>
  );
};
export default App;