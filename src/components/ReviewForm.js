import { useState } from 'react';
import FileInput from './FileInput';
import './ReviewForm.css';


function ReviewForm() {
    const [values, setValues] = useState({
      title: '',
      rating: 0,
      content: '',
      imgFile: null,
    })


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

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({
        values
      })
    }

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
          <FileInput name="imgFile" value={values.imgFile} onChange={handleChange}/>
          <input
            value={values.title}
            onChange={handleInputChange}
            name="title"
          />
          <input 
            type="number"
            value={values.rating}
            onChange={handleInputChange}
            name="rating"
          />
          <textarea 
            value={values.content}
            onChange={handleInputChange}
            name="content"
          />
          <button type="submit">확인</button>
        </form>
    );
}

export default ReviewForm;