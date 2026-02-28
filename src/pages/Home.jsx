
import Card from "../components/Card";
const Home = ({ profiles }) => {
    return (
        <>
            <h2>Home</h2>
            <h3>Welcome to the Profile App.</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <div className="card-wrapper">
            {profiles.map((profile) => (
                <Card key={profile.id} {...profile} />
            ))}
        </div>
        </>
    );
};
export default Home;