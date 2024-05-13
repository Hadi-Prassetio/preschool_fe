import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAddressBook,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
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
        name: 'List',
        to: '/teacher/list',
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
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/class/list',
      },
      {
        component: CNavItem,
        name: 'Add Class',
        to: '/class/add-teacher',
      },
    ],
  },
]

export default _nav
