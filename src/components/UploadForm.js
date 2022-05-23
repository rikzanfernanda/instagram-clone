// TODO: answer here
import axios from 'axios';
import React, { useState } from 'react'
import { API_URL } from '../api/config';
import { createPost } from '../api/post';
import '../assets/style/components/uploadForm.scss';

export default function UploadForm({onSubmit}) {
  // TODO: answer here
  const [input, setInput] = useState({
    content: '',
    image: ''
  });

  const onChange = (e) => {
    setInput({...input, content: e.target.value});
  }

  const onFileChange = (e) => {
    setInput({...input, image: e.target.files[0]});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content', input.content);
    formData.append('image', input.image);
    setInput({
      content: '',
      image: ''
    })
    createPost(formData).then((res) => {
      onSubmit(res.data);
    })
  }
  return <>
    <div aria-label="Upload Form" className='form-container'>
      <form encType='multipart/form-data'>
        <div className='form-group'>
          <label>Caption</label>
          <input type='text' value={input.content} onChange={onChange} aria-label="Caption Input" />
        </div>
        <div className='form-group'>
          <label>Image</label>
          <input type='file' onChange={onFileChange} aria-label="Image Input" accept='image/png, image/jpg, image/gif' />
        </div>
        <div className='form-button'>
          <button className='btn-primary' aria-label="Submit Button" onClick={handleSubmit}>Upload</button>
        </div>
      </form>
    </div>
  </>
}