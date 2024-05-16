import {
  CCollapse,
  CContainer,
  CNavLink,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
} from '@coreui/react'
import React, { useState } from 'react'
import AddEnrollment from './AddEnrollment'
import AddVisitor from './AddVisitor'
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
  const [visible, setVisible] = useState(false)
  const [addData, setAddData] = useState()
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <div className="wrapper d-flex flex-column min-vh-100">
        <CNavbar expand="lg" colorScheme="dark" className="bg-body-tertiary bg-dark">
          <CContainer fluid>
            <CNavbarBrand style={{ cursor: 'pointer' }} onClick={() => setAddData('')}>
              Navbar
            </CNavbarBrand>
            <CNavbarToggler
              aria-label="Toggle navigation"
              aria-expanded={visible}
              onClick={() => setVisible(!visible)}
            />
            <CCollapse className="navbar-collapse" visible={visible}>
              <CNavbarNav as="nav">
                <CNavLink to="/login" as={NavLink}>
                  Login Admin
                </CNavLink>
                <CNavLink to="/register" as={NavLink}>
                  Register Admin
                </CNavLink>
                <CNavLink style={{ cursor: 'pointer' }} onClick={() => setAddData('enrollment')}>
                  Add Enrollment
                </CNavLink>
                <CNavLink style={{ cursor: 'pointer' }} onClick={() => setAddData('visitor')}>
                  Add Visit Schedule
                </CNavLink>
              </CNavbarNav>
            </CCollapse>
          </CContainer>
        </CNavbar>
        <AddEnrollment display={addData} />
        <AddVisitor display={addData} />
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default LandingPage
