import { Outlet, useNavigate } from "react-router-dom";

const ProfileLayout = () => {
    const navigate = useNavigate();

    return (
        <>
            <button
             className="mode-button"
             onClick={() => navigate(-1)}
             > Go Back</button>

             <Outlet />
        </>
    );
};
export default ProfileLayout;