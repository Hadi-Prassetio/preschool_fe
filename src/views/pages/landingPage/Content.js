import React, { useEffect, useState } from 'react'
import { API } from '../../../api/service'
import { CCard, CCardBody, CCardText, CCol, CHeader, CRow } from '@coreui/react'

const Content = () => {
  const [content, setContent] = useState()

  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await API.get('/pages')
        setContent(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getContent()
  }, [])
  return (
    <main>
      <CCard className="m-4">
        <CCardBody>
          <h1>Misi</h1>
          {content
            ?.filter((data) => data?.title === 'Misi')
            .map((item, index) => (
              <CCardText key={index}>{item.desc}. </CCardText>
            ))}
        </CCardBody>
      </CCard>
      <CCard className="m-4">
        <CCardBody>
          <h1>Visi</h1>
          <CRow className="p-3">
            {content
              ?.filter((data) => data?.title === 'Visi')
              .map((item, index) => (
                <CCol
                  className="bg-success rounded text-light m-4 p-4"
                  key={index}
                  xs={12}
                  sm={6}
                  xl={4}
                  xxl={3}
                >
                  <CCardText>{item.desc}. </CCardText>
                </CCol>
              ))}
          </CRow>
        </CCardBody>
      </CCard>
    </main>
  )
}

export default Content
