import {
  CCollapse,
  CContainer,
  CHeaderNav,
  CImage,
  CNavLink,
  CNavbar,
  CNavbarBrand,
  CNavbarToggler,
} from '@coreui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import auladi from '../../../assets/auladi/logo 1.png'
import AppFooter from '../../../components/AppFooter'
import AddEnrollment from './AddEnrollment'
import AddVisitor from './AddVisitor'
import Content from './Content'
import ImageCarousel from './ImageCarousel'

const LandingPage = () => {
  const [visible, setVisible] = useState(false)
  const [addData, setAddData] = useState('')
  return (
    <div className="wrapper d-flex flex-column min-vh-100">
      <CNavbar expand="lg" colorScheme="light">
        <CContainer fluid>
          <CNavbarBrand style={{ cursor: 'pointer' }} onClick={() => setAddData('')}>
            <CImage src={auladi} width={50} height={50} />
          </CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CHeaderNav as="nav">
              <CNavLink className="px-2" to="/login" as={NavLink}>
                Login Admin
              </CNavLink>
              <CNavLink
                className="px-2"
                style={{ cursor: 'pointer' }}
                onClick={() => setAddData('enrollment')}
              >
                Add Enrollment
              </CNavLink>
              <CNavLink
                className="px-2"
                style={{ cursor: 'pointer' }}
                onClick={() => setAddData('visitor')}
              >
                Add Visit Schedule
              </CNavLink>
            </CHeaderNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
      {addData == '' ? <ImageCarousel /> : ''}
      {addData == '' ? <Content /> : ''}
      <AddEnrollment display={addData} />
      <AddVisitor display={addData} />
      <AppFooter />
    </div>
  )
}

export default LandingPage
