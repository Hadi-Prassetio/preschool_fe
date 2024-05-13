import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Teacher
const ListTeacher = React.lazy(() => import('./views/teacher/listTeacher/ListTeacher'))
const AddTeacher = React.lazy(() => import('./views/teacher/addTeacher/AddTeacher'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/teacher', name: 'Teacher', element: ListTeacher, exact: true },
  { path: '/teacher/list-teacher', name: 'List Teacher', element: ListTeacher, exact: true },
  { path: '/teacher/add-teacher', name: 'Add Teacher', element: AddTeacher, exact: true },
]

export default routes
