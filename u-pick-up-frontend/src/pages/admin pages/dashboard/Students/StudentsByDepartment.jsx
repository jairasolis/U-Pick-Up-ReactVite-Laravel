import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentsByDepartment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const StudentsByDepartment = () => {
  const [regStudentsPerDeptCount, setRegStudentsPerDeptCount] = useState({});

  useEffect(() => {
    const fetchRegisteredStudentsCount = async () => {
      try {
        const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/dashboard/registered-students-per-department-count');
        console.log(response.data)
        setRegStudentsPerDeptCount(response.data.counts);
      } catch (error) {
        console.error('Error fetching registered students count:', error);
      }
    };

    fetchRegisteredStudentsCount();
  }, []);

  const departments = Object.keys(regStudentsPerDeptCount);

  return (      
    <div className='by-department'>
      <Container fluid>
        <Row className='dash-nav'>
          <ul>
            <Link to="/admin/dashboard" className='dash-navig'> <li> Dashboard </li> </Link>
            <div className="divider"></div>
            <Link to="/admin/dashboard-department" className='dash-navig'> <li> Students Per Department </li> </Link>
            <div className="divider"></div>
            <Link to="/admin/dashboard-program" className='dash-navig'> <li> Students Per Program </li> </Link>
          </ul>
        </Row>
        <Row xs={1} md={4} className="g-4">
          {departments.map((dept, index) => (
            <Col key={index}>
              <Card  className="student-card">
                  <Card.Header className='card-header'>
                      <img src={`/images/departments/${dept}.png`} alt="" style={{width: "35px", height: "35px"}} className='department-image'/>
                      <p className='dept-name'>{dept}</p>
                  </Card.Header>
                <Card.Body>
                  <Card.Text>
                      {regStudentsPerDeptCount[dept]}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default StudentsByDepartment;
