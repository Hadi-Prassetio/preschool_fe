import {
  CButton,
  CCard,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../api/service'

const UpdatePage = () => {
  const nav = useNavigate()
  const { id } = useParams()

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

  useEffect(() => {
    const data = async () => {
      try {
        const response = await API.get(`/page/${id}`)
        setData(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])

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
            value={data?.type}
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
            value={data?.title}
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
            value={data?.desc}
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
            value={data?.email}
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
            value={data?.phone}
          />
        </div>
        <CButton type="submit" color="primary">
          Submit
        </CButton>
      </CForm>
    </CCard>
  )
}

export default UpdatePage
