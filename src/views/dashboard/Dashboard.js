import React, { useEffect, useState } from 'react'

import { cilCalendar, cilContact, cilEducation, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCol, CRow, CWidgetStatsC } from '@coreui/react'
import { API } from '../../api/service'

const Dashboard = () => {
  const [teacher, setTeacher] = useState()
  const [classes, setClasses] = useState()
  const [enrollment, setEnrollment] = useState({
    All: [],
    Waiting: [],
    Accept: [],
    Cancel: [],
  })
  const [visitor, setVisitor] = useState({
    All: [],
    Accept: [],
    Cancel: [],
    Waiting: [],
  })

  useEffect(() => {
    const featchAllData = async () => {
      const [
        teacherResponse,
        classesResponse,
        enrollmentWaiting,
        enrollmentAcc,
        enrollmentCancel,
        visitorWaiting,
        visitorAcc,
        visitorCancel,
      ] = await Promise.all([
        API.get('/teachers'),
        API.get('/classes'),
        API.get('/enrollment-wait'),
        API.get('/enrollment-accept'),
        API.get('/enrollment-cancel'),
        API.get('/visitor-wait'),
        API.get('/visitor-accept'),
        API.get('/visitor-cancel'),
      ])
      setTeacher(teacherResponse?.data?.data)
      setClasses(classesResponse?.data?.data)
      setEnrollment({
        All: '',
        Waiting: enrollmentWaiting?.data?.data,
        Accepted: enrollmentAcc?.data?.data,
        Canceled: enrollmentCancel?.data?.data,
      })
      setVisitor({
        All: '',
        Waiting: visitorWaiting?.data?.data,
        Accepted: visitorAcc?.data?.data,
        Canceled: visitorCancel?.data?.data,
      })
    }
    featchAllData()
  }, [])

  const colorMap = {
    All: 'primary',
    Waiting: 'warning',
    Accepted: 'success',
    Canceled: 'danger',
  }

  return (
    <CCard className="mb-4">
      <CRow xs={{ gutter: 4 }} className="p-3">
        <CCol xs={12} sm={6} xl={6} xxl={6}>
          <CWidgetStatsC
            color="info"
            icon={<CIcon icon={cilPeople} height={36} />}
            value={teacher?.length}
            title="Teacher"
            inverse
            progress={{ value: 75 }}
          />
        </CCol>
        <CCol xs={12} sm={6} xl={6} xxl={6}>
          <CWidgetStatsC
            color="warning"
            icon={<CIcon icon={cilCalendar} height={36} />}
            value={classes?.length}
            title="Class"
            inverse
            progress={{ value: 75 }}
          />
        </CCol>
        {Object.keys(enrollment).map((key) => (
          <CCol xs={12} sm={6} xl={4} xxl={3} key={key}>
            <CWidgetStatsC
              color={colorMap[key]}
              icon={<CIcon icon={cilEducation} height={36} />}
              value={
                key == 'All'
                  ? Object.values(enrollment).reduce((sum, array) => sum + array.length, 0)
                  : enrollment[key].length.toString()
              }
              title={key + ' Enrollments'}
              inverse
              progress={{
                value:
                  (key == 'All'
                    ? Object.values(enrollment).reduce((sum, array) => sum + array.length, 0)
                    : enrollment[key].length /
                      Object.values(enrollment).reduce((sum, array) => sum + array.length, 0)) *
                  100,
              }}
            />
          </CCol>
        ))}
        {Object.keys(visitor).map((key) => (
          <CCol xs={12} sm={6} xl={4} xxl={3} key={key}>
            <CWidgetStatsC
              color={colorMap[key]}
              icon={<CIcon icon={cilContact} height={36} />}
              value={
                key == 'All'
                  ? Object.values(visitor).reduce((sum, array) => sum + array.length, 0)
                  : visitor[key].length.toString()
              }
              title={key + ' Visitors'}
              inverse
              progress={{
                value:
                  (key == 'All'
                    ? Object.values(visitor).reduce((sum, array) => sum + array.length, 0)
                    : visitor[key].length /
                      Object.values(visitor).reduce((sum, array) => sum + array.length, 0)) * 100,
              }}
            />
          </CCol>
        ))}
      </CRow>
    </CCard>
  )
}

export default Dashboard
