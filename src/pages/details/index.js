import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Button, Modal, Row, Col, Form, FormLabel } from 'react-bootstrap';
import swal from 'sweetalert';
import moment from 'moment';


import Header from '../../components/header';

import './styles.css';

import api from '../../services/api';

function Details() {
  const location = useLocation();
  const courseId = location.state.courseId;

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [desc, setDesc] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [isActive, setIsActive] = useState(true);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [courseData, setCourseData] = useState(null);


  function setStates(data) {
    setStartedAt(data[0].startedAt);
    setTitle(data[0].title);
    setSubtitle(data[0].subtitle);
    setDesc(data[0].description);
  }

  useEffect(() => {
    api.get(`/courses/${courseId}`)
      .then(({ status, data }) => {
        setCourseData(data);
        setStates(data)
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    console.log('courseData')
    console.log(courseData)
  }, [courseData])


  function handleEdit() {
    api.put(`/courses/${courseId}`, {
      title,
      subtitle,
      startedAt,
      description: desc,
    })
      .then(response => {
        handleClose();
        swal({
          title: "Successo!",
          text: "Dados alterados!",
          icon: "success",
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error)
        swal({
          title: "Oops!",
          text: "Erro ao tentar alterar dados!",
          icon: "error",
        });
      })
  }

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
            <Button variant="info" onClick={handleShow}>Editar dados</Button>
            <Button variant="danger">Deletar curso</Button>
          </div>
        </div> : null}

      {
        courseData ?
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar dados do curso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className='row'>
                  <Col>
                    <FormLabel>Título</FormLabel>
                    <Form.Control value={title} onChange={e => setTitle(e.target.value)} placeholder={courseData[0]?.title} required />
                  </Col>
                  <Col>
                    <FormLabel>Subtítulo</FormLabel>
                    <Form.Control value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder={courseData[0]?.subtitle} required />
                  </Col>
                </Row>
                <Row className='row'>
                  <Col>
                    <FormLabel>Data de início</FormLabel>
                    <Form.Control type="datetime-local" value={startedAt.substring(0, 16)} onChange={e => setStartedAt(e.target.value)} />
                  </Col>
                </Row>
                <Row className='row'>
                  <Col>
                    <FormLabel>Descrição do curso</FormLabel>
                    <Form.Control as="textarea" rows="3" value={desc} onChange={e => setDesc(e.target.value)} placeholder={courseData[0]?.description} required />
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
          </Button>
              <Button variant="primary" onClick={handleEdit}>
                Salvar alterações
          </Button>
            </Modal.Footer>
          </Modal> : null
      }


    </div>
  )
}

export default Details;
