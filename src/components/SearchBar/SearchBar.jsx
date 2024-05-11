import { Formik, Field, Form } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css"

const notify = () => toast('This field cannot be empty. Please enter a search query');

const FORM_INITIAL_VALUES = {
    search: "",
  };

  
const SearchBar = ({onSearch}) =>{
    const handleSubmit = (values, { setSubmitting }) => {
      if (!values.search.trim()) {
          notify();
          setSubmitting(false);
          return;
      }
      onSearch(values.search);
  }
    return(
        <header>
      <Formik initialValues={FORM_INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form>
          <label>
            <Field
              className={css.formSearch}
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>
          <button className={css.formBtn}  type="submit">
            Search
          </button>
          <Toaster />
        </Form>
      </Formik>
    </header>
    );
}
export default SearchBar 