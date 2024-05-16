import { CButton, CCard, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api/service'

const AddPage = () => {
  const nav = useNavigate()

  const [data, setData] = useState({
    type: '',
    title: '',
    desc: '',
    email: '',
    phone: '',
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await API.post('/page', data)
      nav('/page/list-page')
    } catch (error) {
      console.log(error)
      alert('Gagal Menambahkan Page')
    }
  }

  return (
    <CCard className="mb-4">
      <CForm className="p-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="type">Type</CFormLabel>
          <CFormInput
            type="text"
            id="type"
            placeholder="type"
            name="type"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="title">Title</CFormLabel>
          <CFormInput
            type="text"
            id="title"
            placeholder="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="desc">Description</CFormLabel>
          <CFormTextarea
            id="desc"
            floatingLabel="Description"
            placeholder="Leave a comment here"
            name="desc"
            onChange={handleChange}
          ></CFormTextarea>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="email">Email address</CFormLabel>
          <CFormInput
            type="email"
            id="email"
            placeholder="name@example.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="phone">Phone</CFormLabel>
          <CFormInput
            type="tel"
            id="phone"
            placeholder="phone number"
            name="phone"
            onChange={handleChange}
          />
        </div>
        <CButton type="submit" color="primary">
          Submit
        </CButton>
      </CForm>
    </CCard>
  )
}

export default AddPage
