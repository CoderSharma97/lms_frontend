import React from "react";
import { server } from "../../main";
import "./courseCard.css";
import { userData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const { fetchCourses } = CourseData();

  const { user, isAuth } = userData();

  const deleteHandler = async (id) => {
    if (confirm("are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        await fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt="" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor - {course.createdBy}</p>
      <p>Duration - {course.duration} hours</p>
      <p>Price - 💲{course.price}</p>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button
                  className="common-btn"
                  onClick={() => navigate(`/course/study/${course._id}`)}
                >
                  study
                </button>
              ) : (
                <button
                  className="common-btn"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  Get started
                </button>
              )}{" "}
            </>
          ) : (
            <button
              className="common-btn"
              onClick={() => navigate(`/course/study/${course._id}`)}
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button className="common-btn" onClick={() => navigate(`/login`)}>
          Get started
        </button>
      )}
      <br />
      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn"
          style={{ backgroundColor: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
