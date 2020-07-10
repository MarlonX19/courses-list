import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Header from '../../components/header'
import './styles.css';

import api from '../../services/api'

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.log(error))

  }, [])

  return (
    <Container>
        <Header pageName='Bem vindo' btnText='Cadastrar curso' btnNav='add' />
      <Row className="justify-content-md-center">
        {
          courses.map(course => (
            <Card style={{ width: '18rem', marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  {course.subtitle}
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

export default Home;