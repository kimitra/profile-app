import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ProfileDetail = ({ localProfiles, apiProfiles  }) => {
  const { id } = useParams();
  const profile = 
    localProfiles.find((p) => p.id === id) ||
    apiProfiles.find((p) => String(p.id) === id);

  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="card-wrapper">
      <Card id={id} {...profile} />
    </div>
  );
};

export default ProfileDetail;