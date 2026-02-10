import Section from "../components/Section";
import Card from "../components/Card";

const FetchProfiles = ({ fetchedProfiles, loading, mode, image }) => {
    return (
        <>
            <Section title="Fetched Profiles">
                {loading && <p>Loading...</p>}
                {!loading && fetchedProfiles.map((profile) => (
                    <Card
                        key={profile.id}
                        {...profile}
                        mode={mode}
                        image={profile.image_url}
                        isFeatured={false}
                    />
                ))}
            </Section>
        </>
    );
};
export default FetchProfiles;