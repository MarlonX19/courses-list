import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FiPower, FiTrash2, FiActivity, FiPlus } from 'react-icons/fi'

import './styles.css';
import Header from '../../components/header'

import api from '../../services/api'

function Add() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.log(error))

  }, [])

  return (
    <Container>
      <Header pageName='Cadastrar novo curso' btnText='Voltar' btnNav='/' />
      <Row className="justify-content-md-center">
        {
          courses.map(course => (
            <Card style={{ width: '18rem', marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  {course.description}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))
        }
        {
          courses.map(course => (
            <Card style={{ width: '18rem', marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  {course.description}
                </Card.Text>
                <Button variant="primary">Ver detalhes</Button>
              </Card.Body>
            </Card>
          ))
        }
      </Row>
    </Container>
  )
}

export default Add;