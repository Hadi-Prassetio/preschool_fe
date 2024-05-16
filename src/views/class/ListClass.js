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

const ListClass = () => {
  const [classes, setClass] = useState()
  const [visible, setVisible] = useState(false)
  const [tempDelId, setTempDelId] = useState()
  const nav = useNavigate()

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

  const countAcceptedItems = (enrollArray) => {
    if (!Array.isArray(enrollArray)) {
      return 0
    }
    return enrollArray
      .filter((enrollItem) => enrollItem?.status === 'Accept')
      .reduce((sum, _) => sum + 1, 0)
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/class/${id}`)
      const response = await API.get('/classes')
      setClass(response.data.data)
      setVisible(false)
    } catch (error) {
      console.log(error)
      setVisible(false)
      alert('Gagal Menghapus Kelas, Ada guru yang mengajar di kelas ini')
    }
  }

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>Class List</CCardHeader>
        <CCardBody>
          <CTable responsive className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Class Name</CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope="col">
                  Total Capacity
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope="col">
                  Available Capacity
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {classes &&
                Array.isArray(classes) &&
                classes.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item?.name}</CTableDataCell>
                    <CTableDataCell className="text-center">{item?.capacity}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {item?.capacity - countAcceptedItems(item?.enroll)}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-success px-3 mx-1"
                          onClick={() => nav(`/class/update-class/${item?.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary px-3 mx-1"
                          onClick={() => nav(`/class/detail-class/${item?.id}`)}
                        >
                          Detail
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
          <CModalTitle id="LiveDemoExampleLabel">Delete Class</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Confirm to Delete Class</p>
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

export default ListClass
