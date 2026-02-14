import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const ProfileDetail = ({ mode }) => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`
        )
        .then((res) => res.json())
        .then((data) => {
            setProfile(data.profile);
        })
        .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>Profile not found.</p>;

    return (
        <div className="section">
            <Card {...profile} mode={mode} />
        </div>
    );
};
export default ProfileDetail;