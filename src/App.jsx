import Card from "./components/Card";
import Section from "./components/Section";
import Introduction from "./components/Introduction";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const profiles = [
    {
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "John Smith",
      year: "Senior",
      major: "Web Development",
      isFeatured: true,
    },
    {
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      name: "Mary Sue",
      year: "Junior",
      major: "UX Design",
      isFeatured: false,
    },
    {
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Kevin Bacon",
      year: "Senior",
      major: "Animation",
      isFeatured: true,
    },
  ];

  return (
    <>
      <Header />
      <Introduction />

      <Section title="Student Profiles">
        {profiles.map((profile, index) => (
          <Card
            key={index}
            image={profile.image}
            name={profile.name}
            year={profile.year}
            major={profile.major}
            isFeatured={profile.isFeatured}
          />
        ))}
      </Section>
    </>
  );
};

export default App;