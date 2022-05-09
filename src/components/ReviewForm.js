import { useState } from 'react';
import { createReview } from '../api';
import FileInput from './FileInput';
import RatingInput from './RatingInput';
import './ReviewForm.css';

const INITIAL_VALUES = {
  title: '',
  rating: 0,
  content: '',
  imgFile: null,
}

function ReviewForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittingError, setSubmittingError ] = useState(null);
    const [values, setValues] = useState(INITIAL_VALUES)


    const handleChange = (name, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      handleChange(name, value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('rating', values.rating);
      formData.append('content', values.content);
      formData.append('imgFile', values.imgFile);
      try {
        setSubmittingError(null);
        setIsSubmitting(true);
        await createReview(formData);
      } catch (error) {
        setSubmittingError(error);
        return;
      } finally {
        setIsSubmitting(false);
      }
      setValues(INITIAL_VALUES);
    }

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
          <FileInput name="imgFile" value={values.imgFile} onChange={handleChange}/>
          <input
            value={values.title}
            onChange={handleInputChange}
            name="title"
          />
          <RatingInput
            value={values.rating}
            onChange={handleChange}
            name="rating"
          />
          <textarea 
            value={values.content}
            onChange={handleInputChange}
            name="content"
          />
          <button type="submit" disabled={isSubmitting}>확인</button>
          {submittingError?.message && <div>{submittingError.message}</div>}
        </form>
    );
}

export default ReviewForm;