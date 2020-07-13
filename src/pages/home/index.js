import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Form, FormLabel, Spinner } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { FiSearch } from 'react-icons/fi'

import Header from '../../components/header'
import './styles.css';

import api from '../../services/api'

function Home() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [emptySearch, setEmptySearch] = useState(false);

  let history = useHistory();

  useEffect(() => {
    api.get('/courses')
      .then(response => {
        setLoading(false);
        setCourses(response.data)
      })
      .catch(error => {
        setLoading(false);
        console.log(error)
      })

  }, [])


  function handleSearch(e) {
    setLoading(true);
    e.preventDefault();

    api.get('/courses/find', {
      params: {
        q: search
      }
    })
      .then(response => {
        setLoading(false);
        if (response.data.message) {
          setCourses([]);
          setEmptySearch(true);
        }

        if (response.data.length > 0) {
          setLoading(false);
          setEmptySearch(false);
          console.log(response.data)
          setCourses(response.data);
        }


      })
      .catch(error => {
        setLoading(false);
        setEmptySearch(false);
        console.log(error.response)
      })
  }

  function handleNavigation(course) {
    console.log(course)
    history.push('/details', { courseId: course._id });
  }


  return (
    <Container>
      <Header pageName='Bem vindo' btnText='Cadastrar curso' btnNav='add' />
      <Row className='row'>
        <Form className='search-container'>
          <Form.Control value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar" required />
          <button
            onClick={handleSearch}
            className='searchBtn'
          >
            <FiSearch size={22} color='grey' />
          </button>
        </Form>
      </Row>
      <Row className="justify-content-md-center">
        {emptySearch ? <h2>Nada encontrado :(</h2> : null}
        {loading ? <Spinner variant="primary" animation="border" />
          :
          courses.map((course, index) => (
            <Card key={index} style={{ width: '18rem', marginLeft: 5, marginRight: 5, marginBottom: 10 }}>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  {course.subtitle}
                </Card.Text>
                <Button onClick={() => handleNavigation(course)} variant="primary">Ver detalhes</Button>
              </Card.Body>
            </Card>
          ))
        }
      </Row>
    </Container>
  )
}

export default Home;
