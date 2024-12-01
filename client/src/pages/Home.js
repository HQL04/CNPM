
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import homwpage from "../assets/img/lms.jpg";
import baotri from "../assets/img/baotri.png";
import '../assets/styles/home.css'
import {  Container, Card, Row, Col } from 'react-bootstrap';
const AnnouncementCard = ({ title, content, imageUrl }) => (
  <Card className="h-100 shadow-sm">
    <div style={{ height: '300px', overflow: 'hidden' }}>
      <Card.Img 
        variant="top" 
        src={imageUrl} 
        style={{ 
          width: '100%', 
          height: '300px', 
          objectFit: 'cover',
           objectPosition: 'center'
        }}
        alt={content}
      />
    </div>
    <Card.Body>
      <div className="text-secondary mb-2">{title}</div>
      <Card.Title>
        <a href="#" className="text-primary text-decoration-none">
          {content}
        </a>
      </Card.Title>
    </Card.Body>
  </Card>
);

function Home() {
  const announcements = [
    {
      id: 1,
      title: "Thông báo:",
      content: "Nội dung chỉnh sửa hệ thống ngày 20/10",
      imageUrl: homwpage  // Replace with actual image path
    },
    {
      id: 2,
      title: "Thông báo",
      content: "Tạm dừng cung cấp hệ thống từ 20h 19/10",
      imageUrl: baotri // Replace with actual image path
    }
  ];
  return (
    <div className="min-vh-100 d-flex flex-column my-5">
    
      <Container className="flex-grow-1">
        <h1 className="text-primary mb-5 pb-2 border-bottom border-3">
        Dịch vụ in ấn thông minh cho sinh viên Bách Khoa
        </h1>
        <Row className="g-4">
          {announcements.map(announcement => (
            <Col key={announcement.id} md={6}>
              <AnnouncementCard {...announcement} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
