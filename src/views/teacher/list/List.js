/* eslint-disable prettier/prettier */
import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'

import {API} from '../../../api/service'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-body-secondary">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-body-secondary">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const List = () => {
  const [teacher, setTeacher] = useState()
  useEffect(() => {
    const teacher = async () => {
      try {
        const response = await API.get("/teachers");
        setTeacher(response.data.data);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    teacher();
  }, [setTeacher]);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Teacher List</CCardHeader>
          <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Fullname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Subject</th>
                      <th scope="col" className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacher && Array.isArray(teacher) && teacher.map((item, index)=>(
                      <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item?.fullname}</td>
                            <td>{item?.email}</td>
                            <td>{item?.phone}</td>
                            <td>{item?.class?.name}</td>
                            <td className="text-center"> {/* Menempatkan tombol aksi di tengah */}
                              <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-outline-success px-3 mx-1">Edit</button> {/* Memberikan padding */}
                                <button type="button" className="btn btn-outline-danger px-3 mx-1">Delete</button> {/* Memberikan padding */}
                              </div>
                            </td>  
                      </tr>
                    ))}
                  </tbody>
          </table>
      </CCard>
    </>
  )
}

export default List
