import "../App.css";
import { services } from "../apis/apiManager";
import { useFormik } from "formik";
import { noteSchema } from "../schemas";
import { useNavigate } from "react-router-dom";


const initialValues = {
  title: "",
  content: "",
  date: "",
  status: false,
};

function AddNote() {
const navigate = useNavigate();

  const { errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: noteSchema,
      onSubmit: (values, action) => {
        addNoteData(values);
        action.resetForm();
      },
    });

  const addNoteData = (value) => {
    services
      .addNote({ url: "/todo", note: value })
      .then(function (response) {
        console.log(response);
        if(response.status == process.env.REACT_APP_CREATED){
          navigate('/')
        }
      })
      .catch(function (error) {});
  };

  return (
    <>
      <div className="main_note">
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <input
              type="text"
              autoComplete="off"
              name="title"
              id="title"
              placeholder="Title"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title ? (
              <p className="form-error">{errors.title}</p>
            ) : null}
          </div>

          <div className="input-block">
            <input
              type="date"
              autoComplete="off"
              name="date"
              id="date"
              placeholder="Date"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.date && touched.date ? (
              <p className="form-error">{errors.date}</p>
            ) : null}
          </div>

          <div className="input-block">
            <textarea
              autoComplete="off"
              name="content"
              id="content"
              placeholder="Write a note..."
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.content && touched.content ? (
              <p className="form-error">{errors.content}</p>
            ) : null}
          </div>

            <button className="input-button" type="submit">
              Add Note
            </button>

        </form>
      </div>
    </>
  );
}

export default AddNote;
