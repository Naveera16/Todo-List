import React from "react";
import banner from "../images/banner1.png";
const Home = () => {
  return (
    <div className=" mt-3">
    <div className="row ">
      <div className="col-md-2"></div>
      <div className="col-md-6">
      <img
        src={banner}
        alt=""
        
        className="w-100"
      />
      </div>
      <div className="col-md-4"></div>
    </div>
      <div className="container mt-5" style={{fontSize : "30px"}}>
        <h1 className="top_heading">
        Welcome to Todoist: Your Ultimate To-Do List Manager!
        </h1>
        <p className="mt-4">
          Organize your day, boost productivity, and stay on top of your tasks
          with <strong>Todoist</strong>, the ultimate tool to manage your daily to-do list.
          Whether you're planning your work schedule, personal errands, or big
          projects, TaskMaster helps you:
        </p>
        <ul>
          <li>
            <strong style={{color:"red"}}>Create Tasks:</strong> Quickly add tasks, set deadlines, and assign
            priorities to stay focused.
          </li>
          <li>
            <strong style={{color:"red"}}>Organize Effortlessly:</strong> Group tasks into categories or projects, and track your progress in one place.
          </li>
          <li>
            <strong style={{color:"red"}}>Stay on Schedule:</strong> Set reminders to ensure you never miss a deadline.
          </li>
          <li>
            <strong style={{color:"red"}}>Simple & Efficient:</strong> Designed with a clean and user-friendly interface for ease of use, whether you're at home or on the go.
          </li>
        </ul>
        <p className="mt-4">
          Start managing your day with confidence. Sign up now to streamline your life with TaskMaster!
        </p>
      </div>
    </div>
  );
};

export default Home;
