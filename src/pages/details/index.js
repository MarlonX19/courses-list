import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Button } from 'react-bootstrap';
import moment from 'moment';


import Header from '../../components/header';

import './styles.css';

import api from '../../services/api';

function Details() {
  const location = useLocation();
  moment().locale('pt-br');
  const courseId = location.state.courseId;

  const [courseData, setCourseData] = useState(null);

  console.log(courseId)

  useEffect(() => {
    api.get(`/courses/${courseId}`)
      .then(({ status, data }) => {
        setCourseData(data);
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    console.log('courseData')
    console.log(courseData)
  }, [courseData])

  return (
    <div>
      <Header pageName='Detalhes do curso' btnText='Voltar' btnNav='/' iconName='back' />
      {courseData ?
        <div className='card-style'>
          <div className='card-header'>
            <div>
              <p className='card-title-style'>{courseData[0].title}</p>
              <p className='card-subtitle-style'>{courseData[0].subtitle}</p>
            </div>
            <div className='course-status'>
              <p>status:</p>
              <p className={true ? 'active-course' : 'inactive-course'}> ativo</p>
            </div>
          </div>
          <div>
            <p className='course-description'>{courseData[0].description}</p>
          </div>
          <div>
            <p className='course-date'>{`Iniciado em ${moment(courseData[0].startedAt).format('DD/MM/YYYY HH:MM')}`}</p>
          </div>
          <div className='option-buttons'>
            <Button variant="info">Editar dados</Button>
            <Button variant="danger">Deletar curso</Button>
          </div>
        </div> : null}

    </div>
  )
}

export default Details;