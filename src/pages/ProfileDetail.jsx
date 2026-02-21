import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ProfileDetail = ({ profiles }) => {
  const { id } = useParams();
  const profile = profiles[Number(id)];

  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="section">
      <Card id={id} {...profile} />
    </div>
  );
};

export default ProfileDetail;