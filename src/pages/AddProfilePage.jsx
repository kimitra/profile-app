import AddProfile from "../components/AddProfile";

const AddProfilePage = ({ titles, onAddProfile }) => {
    return (
        <>
            <AddProfile titles={titles} onAddProfile={onAddProfile} />
        </>
    );
};
export default AddProfilePage;