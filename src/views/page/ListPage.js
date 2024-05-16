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

const ListPage = () => {
  const [page, setPage] = useState()
  const [visible, setVisible] = useState(false)
  const [tempDelId, setTempDelId] = useState()
  const nav = useNavigate()

  useEffect(() => {
    const page = async () => {
      try {
        const response = await API.get('/pages')
        setPage(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    page()
  }, [])

  const handleDelete = async (id) => {
    try {
      await API.delete(`/page/${id}`)
      const response = await API.get('/pages')
      setPage(response.data.data)
      setVisible(false)
    } catch (error) {
      console.log(error)
      setVisible(false)
      alert('Gagal Menghapus Page')
    }
  }

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>Page List</CCardHeader>
        <CCardBody>
          <CTable responsive className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {page &&
                Array.isArray(page) &&
                page.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item?.type}</CTableDataCell>
                    <CTableDataCell>{item?.title}</CTableDataCell>
                    <CTableDataCell>{item?.desc}</CTableDataCell>
                    <CTableDataCell>{item?.email}</CTableDataCell>
                    <CTableDataCell>{item?.phone}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-success px-3 mx-1"
                          onClick={() => nav(`/page/update-page/${item?.id}`)}
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
          <CModalTitle id="LiveDemoExampleLabel">Delete Page</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Confirm to Delete Page</p>
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

export default ListPage
