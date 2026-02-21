import { useState } from "react";
import "./AddProfile.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import TitlesContext from "../context/TitlesContext";
import { useReducer, useRef , useEffect }  from "react";

const initialState = {
    name: "",
    email: "",
    title: "",
    bio: "",
    image: null,
    errors: {},
    success: false,
    subumitting: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.field]: action.value
            };
        case "SET_ERROR":
            return {
                ...state,
                errors: action.payload
            };
        case "SET_SUBMITTING":
            return {
                ...state,
                submitting: action.payload,
            };
        case "SET_SUCCESS":
            return {
                ...state,
                success: true,
                errors: {}
            };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

const AddProfile = ({ onAddProfile }) => {
  const { titles } = useContext(TitlesContext);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
    }, []);

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

        dispatch({
        type: "UPDATE_FIELD",
        field: name,
        value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
        dispatch({
            type: "SET_ERRORS",
            payload: { ...state.errors, image: "File must be an image." },
        });
        return;
        }

        dispatch({
        type: "UPDATE_FIELD",
        field: "image",
        value: file,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        Object.keys(state).forEach((key) => {
        if (
            ["name", "email", "title", "bio"].includes(key)
        ) {
            const error = validateField(key, state[key]);
            if (error) newErrors[key] = error;
        }
        });

        if (Object.keys(newErrors).length > 0) {
        dispatch({ type: "SET_ERRORS", payload: newErrors });
        return;
        }

        dispatch({ type: "SET_SUBMITTING", payload: true });

        const newProfile = {
        name: state.name,
        email: state.email,
        title: state.title,
        bio: state.bio,
        year: "New",
        major: state.title,
        isFeatured: false,
        image: state.image
            ? URL.createObjectURL(state.image)
            : "https://via.placeholder.com/150",
        };

        onAddProfile(newProfile);

        dispatch({ type: "SET_SUCCESS" });

        setTimeout(() => {
        dispatch({ type: "RESET" });
        navigate("/", { replace: true });
        }, 800);
    };

    return (
        <section className="add-profile">
            <h2>Add Profile</h2>

        <form onSubmit={handleSubmit} noValidate>

        <label>
          Name *
          <input
            ref={nameInputRef}
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          {state.errors.name && (
            <span className="error">{state.errors.name}</span>
          )}
        </label>

        <label>
          Email *
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          {state.errors.email && (
            <span className="error">{state.errors.email}</span>
          )}
        </label>

        <label>
          Title *
          <select
            name="title"
            value={state.title}
            onChange={handleChange}
          >
            <option value="">Select Title</option>
            {titles?.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
          {state.errors.title && (
            <span className="error">{state.errors.title}</span>
          )}
        </label>

        <label>
          Bio
          <textarea
            name="bio"
            maxLength={200}
            value={state.bio}
            onChange={handleChange}
          />
          {state.errors.bio && (
            <span className="error">{state.errors.bio}</span>
          )}
        </label>

        <label>
          Image
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            onChange={handleFileChange}
          />
          {state.errors.image && (
            <span className="error">{state.errors.image}</span>
          )}
        </label>

        <button type="submit" disabled={state.submitting}>
          {state.submitting ? "Submitting..." : "Add Profile"}
        </button>

        {state.success && (
          <p className="success">Profile added successfully!</p>
        )}
      </form>
    </section>
  );
};

export default AddProfile;