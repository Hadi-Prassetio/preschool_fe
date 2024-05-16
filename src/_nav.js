import {
  cilAddressBook,
  cilCalendar,
  cilContact,
  cilEducation,
  cilLayers,
  cilSpeedometer,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Features',
  },
  {
    component: CNavGroup,
    name: 'Teacher',
    to: '/teacher',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List Teacher',
        to: '/teacher/list-teacher',
      },
      {
        component: CNavItem,
        name: 'Add Teacher',
        to: '/teacher/add-teacher',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Class',
    to: '/class',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List Class',
        to: '/class/list-class',
      },
      {
        component: CNavItem,
        name: 'Add Class',
        to: '/class/add-class',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Enrollment',
    to: '/enrollment',
    icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List Enrollment',
        to: '/enrollment/list-enrollment',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Visitor',
    to: '/visitor',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List Visitor',
        to: '/visitor/list-visitor',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Page',
    to: '/page',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List Page',
        to: '/page/list-page',
      },
      {
        component: CNavItem,
        name: 'Add Page',
        to: '/page/add-page',
      },
    ],
  },
]

export default _nav
