import React from "react";
import { CourseData } from "../../../context/CourseContext";
import CourseCard from "../../coursecard/CourseCard";
import "./courses.css";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <div className="courses">
      <h2>Available Courses</h2>
      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No courses yet</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
