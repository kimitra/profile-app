import { useState } from "react";
import "./AddProfile.css";

const AddProfile = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        title: "",
        bio: "",
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const validateField = (name, value) => {
        switch (name) {
            case "name":
                if (!value.trim()) return "Name is required.";
                break;
            case "email":
                if (!value.trim()) return "Email is required.";
                if (!value.includes("@")) return "Invalid email format.";
                break;
            case "title":
                if (!value.trim()) return "Title is required.";
                break;
            case "bio":
                if (value.length > 200) return "Bio must be 200 characters or less.";
                break;
            default:
                return "";
        }
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, image: "File must be an image." }));
            return;
        }

        setValues((prev) => ({ ...prev, image: file }));
        setErrors((prev) => ({ ...prev, image: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(values).forEach((key) => {
            if (key !== "image"){
                const error = validateField(key, values[key]);
                if (error) newErrors[key] = error;
            }
        });

        if (Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
        setSubmitting(true);

        setTimeout(() => {
            setSuccessMessage("Profile added successfully!");
            setValues({
                name: "",
                email: "",
                title: "",
                bio: "",
                image: null,
            });
            setErrors({});
            e.target.reset();
            setSubmitting(false);
        }, 800);
    };

    return (
        <section className='add-profile'>
            <h2>Add Profile</h2>

            <form onSubmit={handleSubmit} noValidate>
                <label>
                    Name *
                    <input name="name"
                    value={values.name}
                    onChange={handleChange} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </label>

                <label>
                    Email *
                    <input type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </label>

                <label>
                    Title *
                    <input
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                    />
                    {errors.title && <span className="error">{errors.title}</span>}
                    </label>

                    <label>
                    Bio
                    <textarea
                        name="bio"
                        maxLength={200}
                        value={values.bio}
                        onChange={handleChange}
                    />
                    {errors.bio && <span className="error">{errors.bio}</span>}
                    </label>

                    <label>
                    Image
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                        onChange={handleFileChange}
                    />
                    {errors.image && <span className="error">{errors.image}</span>}
                    </label>

                    <button type="submit" disabled={submitting}>
                        {submitting ? "Submitting..." : "Add Profile"}
                    </button>

                    {successMessage && (
                        <p className="success">{successMessage}</p>
                    )}
            </form>
        </section>
    );
};

export default AddProfile;