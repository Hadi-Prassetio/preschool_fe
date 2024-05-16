import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api/service'

const ListEnrollment = () => {
  const [enrollment, setEnrollment] = useState()
  const [visible, setVisible] = useState(false)
  const [tempUpdId, setTempUpdId] = useState({
    id: '',
    status: '',
  })
  const nav = useNavigate()

  useEffect(() => {
    const enrollment = async () => {
      try {
        const response = await API.get('/enrollments')
        setEnrollment(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    enrollment()
  }, [])

  const handleUpdateStatus = async (id) => {
    try {
      await API.patch(`/enrollment/${id}`, tempUpdId)
      const response = await API.get('/enrollments')
      setEnrollment(response.data.data)
      setVisible(!visible)
    } catch (error) {
      console.log(error)
      alert('Gagal Melakukan Perubahan')
    }
  }

  const colorMap = {
    Waiting: 'text-warning',
    Accept: 'text-success',
    Cancel: 'text-danger',
  }

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>Enrollment List</CCardHeader>
        <CCardBody>
          <CTable responsive className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Child name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Child age</CTableHeaderCell>
                <CTableHeaderCell scope="col">Father name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Mother name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {enrollment &&
                Array.isArray(enrollment) &&
                enrollment.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item?.child_name}</CTableDataCell>
                    <CTableDataCell>{item?.child_age} old</CTableDataCell>
                    <CTableDataCell>{item?.father_name}</CTableDataCell>
                    <CTableDataCell>{item?.mother_name}</CTableDataCell>
                    <CTableDataCell>{item?.email}</CTableDataCell>
                    <CTableDataCell>{item?.phone}</CTableDataCell>
                    <CTableDataCell>{item?.class?.name}</CTableDataCell>
                    <CTableDataCell className={colorMap[item.status]}>
                      {item?.status}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          disabled={item?.status != 'Waiting'}
                          className="btn btn-outline-success px-3 mx-1"
                          onClick={() => {
                            setTempUpdId({ id: item?.id, status: 'Accept' }, setVisible(true))
                          }}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          disabled={item?.status != 'Waiting'}
                          className="btn btn-outline-danger px-3 mx-1"
                          onClick={() => {
                            setTempUpdId({ id: item?.id, status: 'Cancel' }, setVisible(true))
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">{tempUpdId?.status} Enrollment</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Confirm to {tempUpdId?.status} this Enrollment</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleUpdateStatus(tempUpdId?.id)}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ListEnrollment
