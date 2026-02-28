import { useState, useContext, useMemo, useCallback, Suspense, lazy } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Section from "./components/Section";
import Introduction from "./components/Introduction";
import Home from "./pages/Home";
import FetchedProfilePage from "./pages/FetchedProfilePage";
import NotFound from "./pages/NotFound";
import ProfileLayout from "./pages/ProfileLayout";
import ModeContext from "./context/ModeContext";
import TitlesContext from "./context/TitlesContext";
import { useFetchProfiles } from "./hooks/useFetchProfiles";
import "./App.css";

const AddProfilePage = lazy(() => import("./pages/AddProfilePage"));
const About = lazy(() => import("./pages/AboutPage"));
const ProfileDetail = lazy(() => import("./pages/ProfileDetail"));

const App = () => {
  const { mode, toggleMode } = useContext(ModeContext);
  const { titles } = useContext(TitlesContext);

  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchText, setSearchText] = useState("");

  /* ---------- LOCAL PROFILES ---------- */
  const [localProfiles, setLocalProfiles] = useState([
    {
      id: "local-1",
      image: "https://pbs.twimg.com/profile_images/2014810779845808128/m8uW-qWB_400x400.jpg",
      name: "Shane Hollander",
      title: "Student",
      year: "Senior",
      major: "Web Development",
      isFeatured: true,
    },
    {
      id: "local-2",
      image: "https://pbs.twimg.com/profile_images/2014163555092672514/lBh7jSfO_400x400.jpg",
      name: "Ilya Rozanov",
      title: "Student",
      year: "Senior",
      major: "UX Design",
      isFeatured: false,
    },
    {
      id: "local-3",
      image: "https://pbs.twimg.com/profile_images/2016633591388569602/LUDaWUDR_400x400.jpg",
      name: "Rose Landry",
      title: "TA",
      year: "Junior",
      major: "Animation",
      isFeatured: true,
    },
    {
      id: "local-4",
      image: "https://pbs.twimg.com/profile_images/2012970250837331968/8Ltrzrrc_400x400.jpg",
      name: "Svetlana Vetrova",
      title: "TA",
      year: "Senior",
      major: "Web Design",
      isFeatured: false,
    }
  ]);

  const { apiProfiles, loading, error } = useFetchProfiles(
  "https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php"
);

  /* ---------- Add Profile (Local Only) ---------- */
  const addProfile = useCallback((newProfile) => {
    const profileWithId = {
      ...newProfile,
      id: `local-${Date.now()}`
    };
    setLocalProfiles((prev) => [...prev, profileWithId]);
  }, []);

  const filterProfiles = useCallback((profiles) => {
  return profiles.filter((profile) => {
    const name = profile.name?.toLowerCase() || "";
    const title = profile.title || "";

    const matchesSearch = searchText
      ? name.includes(searchText.toLowerCase())
      : true;

    const matchesTitle =
      selectedTitle !== "All"
        ? title === selectedTitle
        : true;

    return matchesSearch && matchesTitle;
  });
}, [searchText, selectedTitle]);

  const filteredLocalProfiles = useMemo(
  () => filterProfiles(localProfiles),
  [localProfiles, filterProfiles]
);

const filteredApiProfiles = useMemo(
  () => filterProfiles(apiProfiles),
  [apiProfiles, filterProfiles]
);

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

        <Suspense fallback={<p>Loading...</p>}>
          <Routes>

            {/* LOCAL HOME PAGE */}
            <Route
              path="/"
              element={<Home profiles={filteredLocalProfiles} />}
            />

            {/* ADD LOCAL PROFILE */}
            <Route
              path="/add"
              element={<AddProfilePage onAddProfile={addProfile} />}
            />

            {/* API PAGE */}
            <Route
              path="/fetched"
              element={
                <FetchedProfilePage
                  fetchedProfiles={filteredApiProfiles}
                  loading={loading}
                />
              }
            />

            <Route path="/about" element={<About />} />

            {/* PROFILE DETAIL (works for both) */}
            <Route path="/profile" element={<ProfileLayout />}>
              <Route
                path=":id"
                element={
                  <ProfileDetail
                    localProfiles={localProfiles}
                    apiProfiles={apiProfiles}
                  />
                }
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

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

        {error && <p className="error">{error}</p>}
      </div>
    </HashRouter>
  );
};

export default App;