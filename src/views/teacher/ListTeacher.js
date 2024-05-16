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

const ListTeacher = () => {
  const [teacher, setTeacher] = useState()
  const [visible, setVisible] = useState(false)
  const [tempDelId, setTempDelId] = useState()
  const nav = useNavigate()

  useEffect(() => {
    const teacher = async () => {
      try {
        const response = await API.get('/teachers')
        setTeacher(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    teacher()
  }, [])

  const handleDelete = async (id) => {
    try {
      await API.delete(`/teacher/${id}`)
      const response = await API.get('/teachers')
      setTeacher(response.data.data)
      setVisible(false)
    } catch (error) {
      console.log(error)
      setVisible(false)
      alert('Gagal Menghapus Guru')
    }
  }

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>Teacher List</CCardHeader>
        <CCardBody>
          <CTable responsive className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Fullname</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {teacher &&
                Array.isArray(teacher) &&
                teacher.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item?.fullname}</CTableDataCell>
                    <CTableDataCell>{item?.email}</CTableDataCell>
                    <CTableDataCell>{item?.phone}</CTableDataCell>
                    <CTableDataCell>{item?.class?.name}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-success px-3 mx-1"
                          onClick={() => nav(`/teacher/update-teacher/${item?.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger px-3 mx-1"
                          onClick={() => {
                            setVisible(!visible)
                            setTempDelId(item?.id)
                          }}
                        >
                          Delete
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
          <CModalTitle id="LiveDemoExampleLabel">Delete Teacher</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Confirm to Delete Teacher</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleDelete(tempDelId)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ListTeacher
