import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Teacher
const ListTeacher = React.lazy(() => import('./views/teacher/ListTeacher'))
const AddTeacher = React.lazy(() => import('./views/teacher/AddTeacher'))
const UpdateTeacher = React.lazy(() => import('./views/teacher/UpdateTeacher'))

//Class
const ListClass = React.lazy(() => import('./views/class/ListClass'))
const AddClass = React.lazy(() => import('./views/class/AddClass'))
const UpdateClass = React.lazy(() => import('./views/class/UpdateClass'))
const DetailClass = React.lazy(() => import('./views/class/DetailClass'))

//Enrollment
const ListEnrollment = React.lazy(() => import('./views/enrollment/ListEnrollment'))

//Visitor
const ListVisitor = React.lazy(() => import('./views/visitor/ListVisitor'))

//Page
const ListPage = React.lazy(() => import('./views/page/ListPage'))
const AddPage = React.lazy(() => import('./views/page/AddPage'))
const UpdatePage = React.lazy(() => import('./views/page/UpdatePage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/teacher', name: 'Teacher', element: ListTeacher, exact: true },
  { path: '/teacher/list-teacher', name: 'List Teacher', element: ListTeacher, exact: true },
  { path: '/teacher/add-teacher', name: 'Add Teacher', element: AddTeacher, exact: true },
  {
    path: '/teacher/update-teacher/:id',
    name: 'Update Teacher',
    element: UpdateTeacher,
    exact: true,
  },
  { path: '/class', name: 'Class', element: ListClass, exact: true },
  { path: '/class/list-class', name: 'List Class', element: ListClass, exact: true },
  { path: '/class/add-class', name: 'Add Class', element: AddClass, exact: true },
  { path: '/class/update-class/:id', name: 'Update Class', element: UpdateClass, exact: true },
  { path: '/class/detail-class/:id', name: 'Detail Class', element: DetailClass, exact: true },
  {
    path: '/enrollment/list-enrollment',
    name: 'List Enrollment',
    element: ListEnrollment,
    exact: true,
  },
  {
    path: '/visitor/list-visitor',
    name: 'List Visitor',
    element: ListVisitor,
    exact: true,
  },
  {
    path: '/page/list-page',
    name: 'List Page',
    element: ListPage,
    exact: true,
  },
  {
    path: '/page/add-page',
    name: 'Add Page',
    element: AddPage,
    exact: true,
  },
  {
    path: '/page/update-page/:id',
    name: 'Update Page',
    element: UpdatePage,
    exact: true,
  },
]

export default routes
