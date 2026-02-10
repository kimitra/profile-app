import { useEffect, useState } from "react";
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
import "./App.css";




const App = () => {

  const [mode, setMode] = useState("light");
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [titles, setTitles] = useState([]);
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
    fetch("https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php")
    .then((res) => res.json())
    .then((data) => setTitles(data.titles || []))
    .catch((err) => console.error(err));
  }, []);

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
    setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchesTitle =
      selectedTitle === "All" || profile.title === selectedTitle;

    const matchesSearch =
      profile.name.toLowerCase().includes(searchText.toLowerCase());

    return matchesTitle && matchesSearch;
  });

  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleReset = () => {
    setSelectedTitle("All");
    setSearchText("");
  };

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <HashRouter>
    <div className={`app ${mode}`}>
      <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/add">Add Profile</Link>
      <Link to="/fetched">Fetched Profiles</Link>
      <Link to="/about">About</Link>
    </nav>
    <Introduction />

    <button className="mode-button" onClick={toggleMode}>
      Switch to {mode === "light" ? "Dark" : "Light"} Mode
    </button>

    {mode === "dark" && (
      <p className="mode-text">Dark mode is enabled</p>
    )}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={
        <AddProfilePage titles={titles} onAddProfile={addProfile} />
      } />
      <Route path="/fetched" element={
        <FetchedProfilePage fetchedProfiles ={fetchedProfiles} loading={loading} mode={mode} />
      } />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <div className="controls">
      <select
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
        >
        <option value="All">All</option>
        <option value="TA">TA</option>
        <option value="Student">Student</option>
          {titles.map((title, index) => (
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