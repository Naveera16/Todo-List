import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const Todo = () => {
  //--------------------------- Show Todo and Genre
  const [Todo, setTodo] = useState([]);
  const [Genre, setGenre] = useState([]);
  useEffect(() => {
    // Function for fetching Todo
    const fetchingTodo = async () => {
      try {
        const Response = await fetch(
          "https://66f2d22571c84d805876de7e.mockapi.io/todo"
        );
        if (Response.status === 200) {
          const fetchData = await Response.json();
          setTodo(fetchData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // Function for fetching genre
    const fetchingGenre = async () => {
      try {
        const Response = await fetch(
          "https://66f2d22571c84d805876de7e.mockapi.io/genre"
        );
        if (Response.status === 200) {
          const fetchData = await Response.json();
          setGenre(fetchData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    //function invoKing ing useEffect
    fetchingGenre();
    fetchingTodo();
  }, [Todo]);
  // ------------------------

  //----------------------- Add Todo
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Date, setDate] = useState("");
  const [Status, setStatus] = useState("");
  const [Gen_name, setGen_name] = useState("");
  const addTodo = async (e) => {
    e.preventDefault();
    if (Title.length > 0) {
      if (Desc.length > 0) {
        if(Date.length >0){
          if (Status != "") {
            if (Gen_name != "") {
              try {
                const Data = {
                  name:Title ,
                  desc: Desc,
                  date:Date,
                  gen_name : Gen_name,
                  todo_status: Status,
                };
  
                const Response = await fetch(
                  "https://66f2d22571c84d805876de7e.mockapi.io/todo",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(Data),
                  }
                );
  
                if (Response.status === 201) {
                  const modalElement = document.getElementById("addTodo");
                  const modal = Modal.getInstance(modalElement);
                  modal.hide();
                  toast.success(`${Title} Added in Todo`, {
                    autoClose: 1000,
                    theme: "dark",
                  });
                }
              } catch (error) {
                toast.error(`Error ${error}`, {
                  autoClose: 1000,
                  theme: "dark",
                });
              }
            } else {
              toast.error("Select Genre!!", {
                autoClose: 1000,
                theme: "dark",
              });
            }
          } else {
            toast.error("Select Status !!", {
              autoClose: 1000,
              theme: "dark",
            });
          }
        }
        else{
          toast.error("Select Date!!", {
            autoClose: 1000,
            theme: "dark",
          });
        }
        
      } else {
        toast.error("Enter Todo Description!!", {
          autoClose: 1000,
          theme: "dark",
        });
      }
    } else {
      toast.error("Enter Todo Title !!", {
        autoClose: 1000,
        theme: "dark",
      });
    }
  };
  //-----------------------

  //----------------------Delete genre
  const DeleteTodo = async (id, todoName) => {
    try {
      const deleteTodo = await fetch(
        `https://66f2d22571c84d805876de7e.mockapi.io/todo/${id}`,
        { method: "DELETE" }
      );
      if (deleteTodo.status === 200) {
        Delete(todoName);
      } else {
        toast.error(`Error ${deleteTodo.statusText}`, {
          autoClose: 1000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`Error ${error}`, {
        autoClose: 1000,
        theme: "dark",
      });
    }
  };
  // delete toast
  const Delete = (message) => {
    toast.success(`Todo ${message} deleted`, {
      autoClose: 1000,
      theme: "dark",
    });
  };
  //-----------------

   //---------------------- Update Genre states
   const [UpdateId, setUpdateId] = useState("");
   const [Updatename, setUpdatename] = useState("");
   const [Updatestatus, setUpdatestatus] = useState("");
   const [Updatedesc, setUpdatedesc] = useState("");
   const [Updatedate, setUpdatedate] = useState("");
   const [UpdateGenname, setUpdateGenname] = useState("");
 
   const Edit_Todo = (id, name, status , desc , date , gen_name ) => {
     setUpdateId(id);
     setUpdatename(name);
     setUpdatestatus(status);
     setUpdatedesc(desc);
     setUpdatedate(date);
     setUpdateGenname(gen_name);
     const modalElement = new Modal(document.getElementById("editModal"));
     modalElement.show();
   };
   const updateTodo = async (e) => {
     e.preventDefault();
     if (Updatename.length > 0) {
      if (Updatedesc.length > 0) {
        if(Updatedate.length >0){
          if (Updatestatus != "") {
            if (UpdateGenname != "") {
              try {
                const Data = {
                  name:Updatename ,
                  desc: Updatedesc,
                  date:Updatedate,
                  gen_name : UpdateGenname,
                  todo_status: Updatestatus,
                };
  
                const Response = await fetch(
                  `https://66f2d22571c84d805876de7e.mockapi.io/todo/${UpdateId}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(Data),
                  }
                );
  
                if (Response.status === 200) {
                  const modalElement = document.getElementById("editModal");
                  const modal = Modal.getInstance(modalElement);
                  modal.hide();
                  toast.success(`${Updatename} updated`, {
                    autoClose: 1000,
                    theme: "dark",
                  });
                }
              } catch (error) {
                toast.error(`Error ${error}`, {
                  autoClose: 1000,
                  theme: "dark",
                });
              }
            } else {
              // setError("Select Status!!");
              toast.error("Select Genre!!", {
                autoClose: 1000,
                theme: "dark",
              });
            }
          } else {
            toast.error("Select Status !!", {
              autoClose: 1000,
              theme: "dark",
            });
          }
        }
        else{
          toast.error("Select Date!!", {
            autoClose: 1000,
            theme: "dark",
          });
        }
        
      } else {
        toast.error("Enter Todo Description!!", {
          autoClose: 1000,
          theme: "dark",
        });
      }
    } else {
      toast.error("Enter Todo Title !!", {
        autoClose: 1000,
        theme: "dark",
      });
    }
   };
   //-------------------------------

   //---------------Filter
   const [Filter, setFilter] = useState(["All"]);
   const changefilter = (filter_) =>{
setFilter(filter_)
   }
   //---------------------
  return (
    <>
      <div className="container mt-5">

      <div className="row ">
          <div className="col-md-9 ">
            <h2 className="top_heading text-start" >
              Todo List
            </h2>
            </div>
           
            <div className="col-md-3 d-flex  justify-content-evenly">
            <div className="dropdown w-75 ">
                <button className="btn btn-danger dropdown-toggle w-75 h-75 " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Filter
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                    <button onClick={()=> changefilter("All")} className="dropdown-item">All</button>
                    </li>
                  <li>
                    <button  onClick={()=> changefilter("Complete")}   className="dropdown-item">Complete</button>
                    </li>
                  <li>
                    <button onClick={()=> changefilter("InComplete")}    className="dropdown-item" >Incomplete

                    </button>
                    </li>
                </ul>
              </div>
              <button
                className="btn btn-danger w-50  h-75 "
                data-bs-toggle="modal"
                data-bs-target="#addTodo"
              >
                Add Todo
              </button>
              
            </div>
        
        </div>
        <div className="mt-5">
          {Todo.map((data, index) => (
            Filter == "Complete" ? (
            data.todo_status =="Complete"?
            <div className="card mb-5">
              <div className="card-header">{data.gen_name}</div>
              <div className="card-body">
                <div className="row container">
                  {/* <div className="col-md-1">
                    <i className="fa-solid fa-check"></i>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div> */}
                  {/* <div className="col-md-1"></div> */}
                  <div className="col-md-6">
                    <div style={{ display: "inline-flex" }}>
                      <h2 className="card-title">{data.name} </h2>
                      {/* <span className="ms-5" style={{ color: "grey" }}>
            Completed
          </span> */}
                    </div>

                    <p className="card-text mb-3">{data.desc}</p>
                   
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "grey" }} >Date:  {data.date}</p>
                    <p style={{ color: "grey" }} >Staus: {data.todo_status}</p>
                  </div>
                  <div className="col-md-1"></div>
                  <div className="col-md-1 mt-3">
                  <button
                    onClick={() => Edit_Todo(data.id, data.name, data.todo_status , data.desc , data.date , data.gen_name)}
                    className="btn btn-primary me-2 p-2"
                  >
                    <i className="fa-solid fa-pen-to-square  "></i>
                  </button>
                  <button
                    className="btn btn-danger   p-2"
                    onClick={() => DeleteTodo(data.id, data.name)}
                  >
                    <i className="fa-solid fa-trash "></i>
                  </button>
                  </div>
                </div>
              </div>
            </div>
            :null
            )
            :  Filter == "InComplete" ?
            (
              data.todo_status =="Incomplete"?
              <div className="card mb-5">
                <div className="card-header">{data.gen_name}</div>
                <div className="card-body">
                  <div className="row container">
                    {/* <div className="col-md-1">
                      <i className="fa-solid fa-check"></i>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div> */}
                    {/* <div className="col-md-1"></div> */}
                    <div className="col-md-6">
                      <div style={{ display: "inline-flex" }}>
                        <h2 className="card-title">{data.name} </h2>
                        {/* <span className="ms-5" style={{ color: "grey" }}>
              Completed
            </span> */}
                      </div>
  
                      <p className="card-text mb-3">{data.desc}</p>
                     
                    </div>
                    <div className="col-md-4">
                      <p style={{ color: "grey" }} >Date:  {data.date}</p>
                      <p style={{ color: "grey" }} >Staus: {data.todo_status}</p>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-1 mt-3">
                    <button
                      onClick={() => Edit_Todo(data.id, data.name, data.todo_status , data.desc , data.date , data.gen_name)}
                      className="btn btn-primary me-2 p-2"
                    >
                      <i className="fa-solid fa-pen-to-square  "></i>
                    </button>
                    <button
                      className="btn btn-danger   p-2"
                      onClick={() => DeleteTodo(data.id, data.name)}
                    >
                      <i className="fa-solid fa-trash "></i>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
              :null

            )
            :
            (
              <div className="card mb-5">
              <div className="card-header">{data.gen_name}</div>
              <div className="card-body">
                <div className="row container">
                  {/* <div className="col-md-1">
                    <i className="fa-solid fa-check"></i>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div> */}
                  {/* <div className="col-md-1"></div> */}
                  <div className="col-md-6">
                    <div style={{ display: "inline-flex" }}>
                      <h2 className="card-title">{data.name} </h2>
                      {/* <span className="ms-5" style={{ color: "grey" }}>
            Completed
          </span> */}
                    </div>

                    <p className="card-text mb-3">{data.desc}</p>
                   
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "grey" }} >Date:  {data.date}</p>
                    <p style={{ color: "grey" }} >Staus: {data.todo_status}</p>
                  </div>
                  <div className="col-md-1"></div>
                  <div className="col-md-1 mt-3">
                  <button
                    onClick={() => Edit_Todo(data.id, data.name, data.todo_status , data.desc , data.date , data.gen_name)}
                    className="btn btn-primary me-2 p-2"
                  >
                    <i className="fa-solid fa-pen-to-square  "></i>
                  </button>
                  <button
                    className="btn btn-danger   p-2"
                    onClick={() => DeleteTodo(data.id, data.name)}
                  >
                    <i className="fa-solid fa-trash "></i>
                  </button>
                  </div>
                </div>
              </div>
            </div>
              
            )
          ))}
        </div>
      </div>
      <div
        className="modal fade"
        id="addTodo"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <form onSubmit={addTodo}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Todo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="form-floating mb-3">
                    <input
                      id="floatingtitle"
                      placeholder="title"
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                    <label for="floatingtitle" className="form-label">
                      Todo Title
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      onChange={(e) => setDesc(e.target.value)}
                      style={{ height: "100px" }}
                      id="floatingdecs"
                      aria-label="With textarea"
                      placeholder="Description"
                    ></textarea>
                    <label for="floatingdecs" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setDate(e.target.value)}
                      type="date"
                      className="form-control"
                      id="floatingdate"
                      aria-describedby="emailHelp"
                      placeholder="date"
                    />
                    <label for="floatingdate" className="form-label">
                      Todo Date
                    </label>
                  </div>
                  <div className="mb-3">
                    <select
                      onChange={(e) => setGen_name(e.target.value)}
                      className="form-control"
                      name=""
                      id=""
                    >
                      <option value="" selected>
                        Select Genre
                      </option>
                      {Genre.map((data) =>
                        data.status == "Active" ? (
                          <option value={data.name}>{data.name}</option>
                        ) : null
                      )}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      className="form-control"
                      name=""
                      id=""
                    >
                      <option value="" selected>
                        Select Status
                      </option>
                      <option value="Complete">Complete</option>
                      <option value="Incomplete">Incomplete</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <form onSubmit={updateTodo}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Data
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="form-floating mb-3">
                    <input
                      id="floatingtitle"
                      placeholder="title"
                      value={Updatename}
                      onChange={(e) => setUpdatename(e.target.value)}
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                    <label for="floatingtitle" className="form-label">
                      Todo Title
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      value={Updatedesc}
                      onChange={(e) => setUpdatedesc(e.target.value)}
                      style={{ height: "100px" }}
                      id="floatingdecs"
                      aria-label="With textarea"
                      placeholder="Description"
                    ></textarea>
                    <label for="floatingdecs" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                    value={Updatedate}
                      onChange={(e) => setUpdatedate(e.target.value)}
                      type="date"
                      className="form-control"
                      id="floatingdate"
                      aria-describedby="emailHelp"
                      placeholder="date"
                    />
                    <label for="floatingdate" className="form-label">
                      Todo Date
                    </label>
                  </div>
                  <div className="mb-3">
                    <select
                    value={UpdateGenname}
                      onChange={(e) => setUpdateGenname(e.target.value)}
                      className="form-control"
                      name=""
                      id=""
                    >
                      <option value="" selected>
                        Select Genre
                      </option>
                      {Genre.map((data) =>
                        data.status == "Active" ? (
                          <option value={data.name}>{data.name}</option>
                        ) : null
                      )}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                    value={Updatestatus}
                      onChange={(e) => setUpdatestatus(e.target.value)}
                      className="form-control"
                      name=""
                      id=""
                    >
                      <option value="" selected>
                        Select Status
                      </option>
                      <option value="Complete">Complete</option>
                      <option value="Incomplete">Incomplete</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Todo;
