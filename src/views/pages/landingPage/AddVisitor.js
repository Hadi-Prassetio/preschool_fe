import { cilBirthdayCake, cilChild, cilDescription, cilPhone, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../../api/service'

// eslint-disable-next-line react/prop-types
const AddVisitor = ({ display }) => {
  const [data, setData] = useState()
  const nav = useNavigate()

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.name == 'child_age' ? parseInt(e.target.value) : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await API.post('/visitor', data)
      alert('Berhasil Membuat Appointment')
      nav('/')
    } catch (error) {
      console.log(error)
      alert('Gagal Membuat Appointment')
    }
  }
  return (
    <CContainer className={display == 'visitor' ? 'm-3' : 'd-none'}>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <h1>Appointment</h1>
                <p className="text-body-secondary">Add Visit Appointment</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput placeholder="Parent Name" name="name" onChange={handleChange} />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilChild} />
                  </CInputGroupText>
                  <CFormInput placeholder="Child Name" name="child_name" onChange={handleChange} />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilBirthdayCake} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Child Age"
                    type="number"
                    name="child_age"
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    autoComplete="email"
                    name="email"
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPhone} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Phone"
                    autoComplete="phone"
                    name="phone"
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilDescription} />
                  </CInputGroupText>
                  <CFormTextarea
                    id="message"
                    floatingLabel="Description"
                    placeholder="Leave a comment here"
                    name="message"
                    onChange={handleChange}
                  ></CFormTextarea>
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="success" type="submit">
                    Create Appointment
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddVisitor
