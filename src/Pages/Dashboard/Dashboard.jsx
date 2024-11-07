import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../Dashboard/Navbar';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: import.meta.env.VITE_REGION, 
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS,
    secretAccessKey: import.meta.env.VITE_ACCESS
  }
});

const Dashboard = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [courses, setCourses] = useState([]);

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const command = new ScanCommand({ TableName: 'course' }); 
        const data = await client.send(command);
        
        const coursesData = data.Items.map((item) => ({
          courseName: item.courseName.S,
          author: item.Author.S,
          coverImage: item.coverimage.S,
          price: item.Price.S,
          rating: item.Rating.N,
        }));

        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

 
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Dashboard_container>
      <div className="nav_container">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="d_container">
        <h2>Trending Courses</h2>
        <CourseList>
          {courses.map((course, index) => (
            <CourseCard key={index}>
              <img src={course.coverImage} alt={course.courseName} />
              <div>
                <h3>{course.courseName}</h3>
                <p>by {course.author}</p>
                <p>Rating: {course.rating}</p>
                <p>Price: {course.price}</p>
              </div>
            </CourseCard>
          ))}
        </CourseList>
      </div>
    </Dashboard_container>
  );
};

export default Dashboard;

const Dashboard_container = styled.div`
  position: relative;
  width: 100vw;

`;

const CourseList = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const CourseCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  padding: 15px;
  text-align: center;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }

  h3 {
    font-size: 16px;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
  }
`;
