import { useState } from "react";
import Card from "./components/Card";
import Section from "./components/Section";
import Introduction from "./components/Introduction";
import Header from "./components/Header";
import "./App.css";



const App = () => {

  const [mode, setMode] = useState("light");
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchText, setSearchText] = useState("");

  const profiles = [
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
      image: "https://pbs.twimg.com/profile_images/2015558340319797248/A6TbRBuq_400x400.jpg",
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
  ];

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
    <div className={`app ${mode}`}>
    <Header />
    <Introduction />

    <button className="mode-button" onClick={toggleMode}>
      Switch to {mode === "light" ? "Dark" : "Light"} Mode
    </button>

    {mode === "dark" && (
      <p className="mode-text">Dark mode is enabled</p>
    )}

    <div className="controls">
      <select value={selectedTitle} onChange={handleTitleChange}>
        <option value="All">All</option>
        <option value="Student">Student</option>
        <option value="TA">TA</option>
      </select>

      <input
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={handleSearchChange}
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
  );
};

export default App;