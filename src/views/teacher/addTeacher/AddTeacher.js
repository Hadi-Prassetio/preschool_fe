/* eslint-disable prettier/prettier */
import React from 'react';
import { CForm, CFormLabel, CFormInput, CFormTextarea, CButton, CFormSelect } from '@coreui/react';

const AddTeacher = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted!');
  };

  return (
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="fullname">Fullname</CFormLabel>
        <CFormInput type="text" id="fullname" placeholder="Your fullname" />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="email">Email address</CFormLabel>
        <CFormInput type="email" id="email" placeholder="name@example.com" />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="phone">Phone</CFormLabel>
        <CFormInput type="tel" id="phone" placeholder="Your phone number" />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="register">Register</CFormLabel>
        <CFormInput type="text" id="register" placeholder="Your register number" />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="subject">Subject</CFormLabel>
        <CFormSelect id="subject" defaultValue="">
          <option value="" disabled>Select Subject</option>
          <option value="math">Play Group</option>
          <option value="science">TK A</option>
          <option value="history">TK B</option>
        </CFormSelect>
      </div>
      <CButton type="submit" color="primary">Submit</CButton>
    </CForm>
  );
};

export default AddTeacher;
