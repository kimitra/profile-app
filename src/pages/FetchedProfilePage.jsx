import Card from "../components/Card";

const FetchedProfilePage = ({ fetchedProfiles, loading }) => {
  if (loading) return <p>Loading profiles...</p>;

  if (!fetchedProfiles || fetchedProfiles.length === 0) {
    return <p>No fetched profiles available.</p>;
  }

  return (
    <section>
      <h2>Fetched Profiles</h2>
      <div className="card-wrapper">
        {fetchedProfiles.map((profile) => (
          <Card
            key={profile.id}
            id={profile.id}
            image={
              profile.image_url
            }
            name={profile.name}
            title={profile.title}
            year={profile.year}
            major={profile.major}
            bio={profile.bio}
            isFeatured={profile.isFeatured}
          />
        ))}
      </div>
    </section>
  );
};

export default FetchedProfilePage;