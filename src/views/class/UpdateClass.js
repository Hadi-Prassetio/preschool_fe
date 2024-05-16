import { CButton, CCard, CForm, CFormInput, CFormLabel } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../api/service'

const UpdataClass = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const [data, setData] = useState({
    name: '',
    capacity: '',
  })

  useEffect(() => {
    const data = async () => {
      try {
        const response = await API.get(`/class/${id}`)
        setData(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.name == 'capacity' ? parseInt(e.target.value) : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await API.patch(`/class/${id}`, data)
      nav('/class/list-class')
    } catch (error) {
      console.log(error)
      alert('Gagal Melakukan Perubahan')
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
            value={data?.name}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="capacity">Class Capacity</CFormLabel>
          <CFormInput
            type="number"
            id="capacity"
            placeholder="Capacity"
            name="capacity"
            onChange={handleChange}
            value={data?.capacity}
          />
        </div>
        <CButton type="submit" color="primary">
          Submit
        </CButton>
      </CForm>
    </CCard>
  )
}

export default UpdataClass
