import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsC,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'

import { cilChild, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useParams } from 'react-router-dom'
import { API } from '../../api/service'

const DetaiClass = () => {
  const [classes, setClass] = useState()
  const { id } = useParams()
  const [visible, setVisible] = useState(false)
  const [detailList, setDetailList] = useState({
    detail: '',
    data: [],
  })

  useEffect(() => {
    const classes = async () => {
      try {
        const response = await API.get(`/class/${id}`)
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

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>Class Detail</CCardHeader>
        <CCardBody>
          <CCardText>
            <b>Class Name :</b> {classes?.name}
          </CCardText>
          <CCardText>
            <b>Class Total Capacity :</b> {classes?.capacity} children
          </CCardText>
          <CCardText>
            <b>Class Available Capacity :</b>{' '}
            {classes?.capacity - countAcceptedItems(classes?.enroll)} children
          </CCardText>
          <CRow>
            <CCol
              xs={6}
              onClick={() => {
                setDetailList({ detail: 'teachers', data: classes?.teacher })
                setVisible(!visible)
              }}
            >
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilPeople} height={36} />}
                progress={{ color: 'light', value: classes?.teacher.length == 0 ? 0 : 100 }}
                color="primary"
                inverse
                text="Widget helper text"
                title="Techers"
                value={classes?.teacher.length + ' Guru'}
              />
            </CCol>
            <CCol
              xs={6}
              onClick={() => {
                setDetailList({ detail: 'students', data: classes?.enroll })
                setVisible(!visible)
              }}
            >
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilChild} height={36} />}
                progress={{
                  color: 'light',
                  value: (countAcceptedItems(classes?.enroll) / classes?.capacity) * 100,
                }}
                color="success"
                inverse
                text="Widget helper text"
                title="Students"
                value={countAcceptedItems(classes?.enroll) + ' Siswa'}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">{detailList?.detail}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable responsive className="table">
            {detailList?.detail == 'teachers' ? (
              <>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Teacher Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {detailList?.data?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item?.fullname}</CTableDataCell>
                      <CTableDataCell>{item?.phone}</CTableDataCell>
                      <CTableDataCell>{item?.email}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </>
            ) : (
              <>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Student Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {detailList?.data
                    ?.filter((data) => data?.status == 'Accept')
                    .map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item?.child_name}</CTableDataCell>
                        <CTableDataCell>{item?.phone}</CTableDataCell>
                        <CTableDataCell>{item?.email}</CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </>
            )}
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DetaiClass
