import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../../context/CourseContext";
import CourseCard from "../../coursecard/CourseCard";
import "./adminCourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../../main";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const { courses, fetchCourses } = CourseData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const categories =[
    "Web development",
    "App Development",
    "Game Development",
    "Data Science",
    "Artificial Intelligence"
  ];

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async(e)=>{
    e.preventDefault();
    setBtnLoading(true);

    const myform = new FormData();

    myform.append("title",title);
    myform.append("description",description);
    myform.append("category",category);
    myform.append("price",price);
    myform.append("createdBy",createdBy);
    myform.append("duration",duration);
    myform.append("file",image);
    for (let pair of myform.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    

    try {
      
      const {data} = await axios.post(`${server}/api/course/new`,myform,{
        headers:{
          token:localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCategory("");
      setCategory("");
      setPrice("");
    } catch (error) {
      toast.error(error.response.data.message);
    }


  }

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((e) => <CourseCard key={e._id} course={e} />)
            ) : (
              <p>No Courses yet wait</p>
            )}
          </div>
        </div>
        <div className="right">
          <div className="add-course">
            <div className="course-form">
              <h2>Add Course</h2>
              <form action="" onSubmit={submitHandler}>
                <label htmlFor="text">Title</label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                  <label htmlFor="text">Description</label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                  <label htmlFor="text">Price</label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                  <label htmlFor="text">Created By</label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                />
                <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                  <option value={""}>Select Category</option>
                  {
                    categories.map(
                      (e)=>(
                        <option value={e} key={e}>{e}</option>
                      )
                    )
                  }
                </select>
                <label htmlFor="text">Duration</label>
                <input
                  type="number"
                  name=""
                  id=""
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                  <label htmlFor="text">Title</label>
                <input
                  type="file"
                  name=""
                  id=""
                  required
                  onChange={changeImageHandler}
                />

                {imagePrev && <img src={imagePrev} alt="" width={300} />}
                <button type="submit" className="common-btn" disabled ={btnLoading}>Add Course</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
