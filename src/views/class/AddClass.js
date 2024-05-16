import { CButton, CCard, CForm, CFormInput, CFormLabel } from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api/service'

const AddClass = () => {
  const nav = useNavigate()
  const [data, setData] = useState({
    name: '',
    capacity: '',
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.name == 'capacity' ? parseInt(e.target.value) : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await API.post('/class', data)
      nav('/class/list-class')
    } catch (error) {
      console.log(error)
      alert('Gagal Menambahkan Kelas')
    }
  }

  return (
    <CCard className="mb-4">
      <CForm className="p-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="class-name">Class Name</CFormLabel>
          <CFormInput
            type="text"
            id="class-name"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="capacity">Class Capacity</CFormLabel>
          <CFormInput
            type="number"
            maxLength="2"
            id="capacity"
            placeholder="Capacity"
            name="capacity"
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

export default AddClass
