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

import { API } from '../../api/service'

const ListVisitor = () => {
  const [visitor, setVisitor] = useState()
  const [visible, setVisible] = useState(false)
  const [tempUpdId, setTempUpdId] = useState({
    id: '',
    status: '',
  })

  useEffect(() => {
    const visitor = async () => {
      try {
        const response = await API.get('/visitors')
        setVisitor(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    visitor()
  }, [])

  const handleUpdateStatus = async (id) => {
    try {
      await API.patch(`/visitor/${id}`, tempUpdId)
      const response = await API.get('/visitors')
      setVisitor(response.data.data)
      setVisible(false)
    } catch (error) {
      console.log(error)
      alert('Gagal Melakukan Perubahan')
      setVisible(false)
    }
  }

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>Visitor List</CCardHeader>
        <CCardBody>
          <CTable responsive className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Child name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Child age</CTableHeaderCell>
                <CTableHeaderCell scope="col">Parent name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {visitor &&
                Array.isArray(visitor) &&
                visitor.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item?.child_name}</CTableDataCell>
                    <CTableDataCell>{item?.child_age} old</CTableDataCell>
                    <CTableDataCell>{item?.name}</CTableDataCell>
                    <CTableDataCell>{item?.email}</CTableDataCell>
                    <CTableDataCell>{item?.phone}</CTableDataCell>
                    <CTableDataCell>{item?.message}</CTableDataCell>
                    <CTableDataCell
                      className={
                        item?.status == 'Waiting'
                          ? 'text-warning'
                          : item?.status == 'Accepted'
                            ? 'text-success'
                            : 'text-danger'
                      }
                    >
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
          <CModalTitle id="LiveDemoExampleLabel">{tempUpdId?.status} Visitor</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Confirm to {tempUpdId?.status} this Visitor</p>
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

export default ListVisitor
