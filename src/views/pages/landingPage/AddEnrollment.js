import { cilBirthdayCake, cilChild, cilPhone, cilUser, cilUserFemale } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../../api/service'

// eslint-disable-next-line react/prop-types
const AddEnrollment = ({ display }) => {
  const [data, setData] = useState()
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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.name == 'child_age' || e.target.name == 'class_id'
          ? parseInt(e.target.value)
          : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await API.post('/enrollment', data)
      alert('Berhasil Membuat Enrollment')
      nav('/')
    } catch (error) {
      console.log(error)
      alert('Gagal Membuat Enrollment')
    }
  }
  return (
    <CContainer className={display == 'enrollment' ? 'm-3' : 'd-none'}>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <h1>Enrollment</h1>
                <p className="text-body-secondary">Add New Enrollment</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Father Name"
                    name="father_name"
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUserFemale} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Mother Name"
                    name="mother_name"
                    onChange={handleChange}
                  />
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
                  <CInputGroupText>
                    <CIcon icon={cilBirthdayCake} />
                  </CInputGroupText>
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
                <div className="d-grid">
                  <CButton color="success" type="submit">
                    Create Enrollment
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

export default AddEnrollment
