import { CButton, CCard, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api/service'

const AddTeacher = () => {
  const nav = useNavigate()

  const [classes, setClass] = useState()
  useEffect(() => {
    const classes = async () => {
      try {
        const response = await API.get('/classes')
        setClass(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    classes()
  }, [])

  const [data, setData] = useState({
    fullname: '',
    email: '',
    phone: '',
    class_id: 0,
  })
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.name == 'class_id' ? parseInt(e.target.value) : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await API.post('/teacher', data)
      nav('/teacher/list-teacher')
    } catch (error) {
      console.log(error)
      alert('Gagal Menambahkan Guru')
    }
  }

  return (
    <CCard className="mb-4">
      <CForm className="p-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="fullname">Fullname</CFormLabel>
          <CFormInput
            type="text"
            id="fullname"
            placeholder="Name"
            name="fullname"
            onChange={handleChange}
          />
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
        <div className="mb-3">
          <CFormLabel htmlFor="subject">Subject</CFormLabel>
          <CFormSelect id="subject" defaultValue="" onChange={handleChange} name="class_id">
            <option value="" disabled>
              Subject
            </option>
            {classes &&
              Array.isArray(classes) &&
              classes.map((item, index) => (
                <option key={index} value={item?.id}>
                  {item?.name}
                </option>
              ))}
          </CFormSelect>
        </div>
        <CButton type="submit" color="primary">
          Submit
        </CButton>
      </CForm>
    </CCard>
  )
}

export default AddTeacher
