import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Form, FormLabel } from 'react-bootstrap';
import swal from 'sweetalert';

import './styles.css';
import Header from '../../components/header'

import api from '../../services/api'

function Add() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [desc, setDesc] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [isActive, setIsActive] = useState(false);


  function clearStates() {
    setTitle('');
    setSubtitle('');
    setStartedAt('');
    setDesc('')
  }


  function handleSend(e) {
    e.preventDefault();

    api.post('/courses', {
      title,
      subtitle,
      isActive,
      startedAt,
      description: desc,
    })
      .then(response => {
        console.log(response.data);
        clearStates();
        swal({
          title: "Successo!",
          text: "novo curso cadastrado!",
          icon: "success",
        });
      })
      .catch(error => {
        console.log(error.response);
        swal({
          title: "Oops!",
          text: "Erro ao tentar cadastrar curso!",
          icon: "error",
        });
      })

  }



  return (
    <Container>
      <Header pageName='Cadastrar novo curso' btnText='Voltar' btnNav='/' iconName='back' />
      <Row className="justify-content-md-center">
        <div className='form-container'>
          <Form>
            <Row className='row'>
              <Col>
                <FormLabel>Título</FormLabel>
                <Form.Control value={title} onChange={e => setTitle(e.target.value)} placeholder="ex: Curso de Python" required />
              </Col>
              <Col>
                <FormLabel>Subtítulo</FormLabel>
                <Form.Control value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="ex: aprenda Python de maneira fácil" required />
              </Col>
            </Row>
            <Row className='row'>
              <Col>
                <FormLabel>Data de início</FormLabel>
                <Form.Control type="datetime-local" value={startedAt} onChange={e => setStartedAt(e.target.value)} />
              </Col>
            </Row>
            <Row className='row'>
              <Col>
                <FormLabel>Descrição do curso</FormLabel>
                <Form.Control as="textarea" rows="3" value={desc} onChange={e => setDesc(e.target.value)} placeholder="ex: o curso lhe ensinará a maneira correta de desenvolver usando Python!" required />
              </Col>
            </Row>
            <Row>
              <Col>
                <input id='Check1' value={isActive} type="checkbox" onChange={() => setIsActive(!isActive)}/>
                {"  "}
                <label class="form-check-label" for="Check1">Ativo</label>
              </Col>
            </Row>
          </Form>
          <Button as='button' onClick={handleSend} variant="primary">
            Cadastrar
          </Button>
        </div>
      </Row>
    </Container>
  )
}

export default Add;
