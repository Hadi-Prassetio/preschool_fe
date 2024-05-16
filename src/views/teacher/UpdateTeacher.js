import React, { useState, useEffect } from 'react'
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
  CFormSelect,
  CCard,
} from '@coreui/react'
import { API } from '../../api/service'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateTeacher = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const [classes, setClass] = useState()
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const classesResponse = await API.get('/classes')
        setClass(classesResponse.data.data)

        const teacherResponse = await API.get(`/teacher/${id}`)
        setData(teacherResponse.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllData()
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
      await API.patch(`/teacher/${id}`, data)
      nav('/teacher/list-teacher')
    } catch (error) {
      console.log(error)
      alert('Gagal Melakukan Perubahan')
    }
  }

  return (
    <CCard className="mb-3">
      <CForm className="p-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="fullname">Fullname</CFormLabel>
          <CFormInput
            type="text"
            id="fullname"
            placeholder="Name"
            name="fullname"
            onChange={handleChange}
            value={data?.fullname}
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
        <div className="mb-3">
          <CFormLabel htmlFor="subject">Subject</CFormLabel>
          <CFormSelect
            id="subject"
            value={data?.class_id}
            selected
            onChange={handleChange}
            name="class_id"
          >
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
          Save
        </CButton>
      </CForm>
    </CCard>
  )
}

export default UpdateTeacher
