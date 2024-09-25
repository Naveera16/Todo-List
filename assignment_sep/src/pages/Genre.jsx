import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap";
const Genre = () => {
  //--------------------------- Show Genre
  const [Genre, setGenre] = useState([]);
  useEffect(() => {
    // Function for fetching fgenre
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
    fetchingGenre();
  }, [Genre]);
  // ------------------------

  //----------------------- Add Genre
  const [Genrename, setGenrename] = useState("");
  const [Genrestatus, setGenrestatus] = useState("");
  const addGenre = async (e) => {
    e.preventDefault();
    if (Genrename.length > 0) {
      if (Genrestatus != "") {
        try {
          const Data = {
            name: Genrename,
            status: Genrestatus,
          };

          const Response = await fetch(
            "https://66f2d22571c84d805876de7e.mockapi.io/genre",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(Data),
            }
          );

          if (Response.status === 201) {
            const modalElement = document.getElementById("addgenre");
            const modal = Modal.getInstance(modalElement);
            modal.hide();
            toast.success(`${Genrename} Added in Genre`, {
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
        toast.error("Select Status!!", {
          autoClose: 1000,
          theme: "dark",
        });
      }
    } else {
      // setError("Name!!");
      toast.error("Enter Genre Name!!", {
        autoClose: 1000,
        theme: "dark",
      });
    }
  };
  //-----------------------

  //----------------------Delete genre
  const Deletegenre = async (id, Genre) => {
    try {
      const deleteGenre = await fetch(
        `https://66f2d22571c84d805876de7e.mockapi.io/genre/${id}`,
        { method: "DELETE" }
      );
      if (deleteGenre.status === 200) {
        Delete(Genre);
      } else {
        toast.error(`Error ${deleteGenre.statusText}`, {
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
    toast.success(`Genre ${message} deleted`, {
      autoClose: 1000,
      theme: "dark",
    });
  };
  //-----------------

  //---------------------- Update Genre states
  const [UpdateId, setUpdateId] = useState("");
  const [Updatename, setUpdatename] = useState("");
  const [Updatestatus, setUpdatestatus] = useState("");

  const Edit_genre = (id, name, status) => {
    setUpdateId(id);
    setUpdatename(name);
    setUpdatestatus(status);
    const modalElement = new Modal(document.getElementById("editModal"));
    modalElement.show();
  };
  const updateGenre = async (e) => {
    e.preventDefault();
    if (Updatename.length > 0) {
      if (Updatestatus != "") {
        try {
          const Data = {
            name: Updatename,
            status: Updatestatus,
          };

          const Response = await fetch(
            `https://66f2d22571c84d805876de7e.mockapi.io/genre/${UpdateId}`,
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
            toast.success("Genre Updated", {
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
        toast.error("Select Status!!", {
          autoClose: 1000,
          theme: "dark",
        });
      }
    } else {
      // setError("Name!!");
      toast.error("Enter Genre Name!!", {
        autoClose: 1000,
        theme: "dark",
      });
    }
  };
  //-------------------------------

  //---------------Filter
  const [Filter, setFilter] = useState(["All"]);
  const changefilter = (filter_) => {
    setFilter(filter_)
  }
  //---------------------
  return (
    <>
      <div className="container mt-5">
        <div className="row ">
          <div className="col-md-9 ">
            <h2 className="top_heading text-start" >
              Genre
            </h2>
          </div>

          <div className="col-md-3 d-flex  justify-content-evenly">
            <div className="dropdown w-75 ">
              <button className="btn btn-danger dropdown-toggle w-75 h-75 " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Filter
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <button onClick={() => changefilter("All")} className="dropdown-item">All</button>
                </li>
                <li>
                  <button onClick={() => changefilter("Active")} className="dropdown-item">Active</button>
                </li>
                <li>
                  <button onClick={() => changefilter("Inactive")} className="dropdown-item" >Inactive

                  </button>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-danger w-50  h-75 "
              data-bs-toggle="modal"
              data-bs-target="#addgenre"
            >
              Add Genre
            </button>

          </div>

        </div>
        <div className="mt-5">
          {Genre.map((data, index) => (
            Filter == "Active" ? (
              data.status == "Active" ?
                <div className="card mb-3">
                  <div className="card-body ">
                    <div className="container">
                      <div className="float-end ">
                        <button
                          onClick={() => Edit_genre(data.id, data.name, data.status)}
                          className="btn btn-primary d-block mt-2 p-1"
                        >
                          <i className="fa-solid fa-pen-to-square  "></i>
                        </button>
                        <button
                          className="btn btn-danger d-block mt-2 p-1"
                          onClick={() => Deletegenre(data.id, data.name)}
                        >
                          <i className="fa-solid fa-trash "></i>
                        </button>
                      </div>
                      <blockquote className="blockquote mb-0">
                        <p>{data.name}</p>
                        <footer className="blockquote-footer">
                          {" "}
                          <cite title="Source Title">{data.status}</cite>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
                : null
            ) :
              Filter == "Inactive" ? (
                data.status == "Inactive" ?
                  <div className="card mb-3">
                    <div className="card-body ">
                      <div className="container">
                        <div className="float-end ">
                          <button
                            onClick={() => Edit_genre(data.id, data.name, data.status)}
                            className="btn btn-primary d-block mt-2 p-1"
                          >
                            <i className="fa-solid fa-pen-to-square  "></i>
                          </button>
                          <button
                            className="btn btn-danger d-block mt-2 p-1"
                            onClick={() => Deletegenre(data.id, data.name)}
                          >
                            <i className="fa-solid fa-trash "></i>
                          </button>
                        </div>
                        <blockquote className="blockquote mb-0">
                          <p>{data.name}</p>
                          <footer className="blockquote-footer">
                            {" "}
                            <cite title="Source Title">{data.status}</cite>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                  : null
              )
                : (
                  <div className="card mb-3">
                    <div className="card-body ">
                      <div className="container">
                        <div className="float-end ">
                          <button
                            onClick={() => Edit_genre(data.id, data.name, data.status)}
                            className="btn btn-primary d-block mt-2 p-1"
                          >
                            <i className="fa-solid fa-pen-to-square  "></i>
                          </button>
                          <button
                            className="btn btn-danger d-block mt-2 p-1"
                            onClick={() => Deletegenre(data.id, data.name)}
                          >
                            <i className="fa-solid fa-trash "></i>
                          </button>
                        </div>
                        <blockquote className="blockquote mb-0">
                          <p>{data.name}</p>
                          <footer className="blockquote-footer">
                            {" "}
                            <cite title="Source Title">{data.status}</cite>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                )
          ))}
        </div>
      </div>
      <div
        className="modal fade"
        id="addgenre"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={addGenre}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Genre
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
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Genre Name
                    </label>
                    <input
                      onChange={(e) => setGenrename(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Select Status
                    </label>
                    <select
                      onChange={(e) => setGenrestatus(e.target.value)}
                      className="form-control"
                      name=""
                      id=""
                    >
                      <option value="" selected>
                        Select Status{" "}
                      </option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
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
                <button
                  type="submit"
                  className="btn btn-primary"
                >
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={updateGenre}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Genre
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
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Genre Name
                    </label>
                    <input
                      onChange={(e) => setUpdatename(e.target.value)}
                      value={Updatename}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Select Status
                    </label>
                    <select
                      onChange={(e) => setUpdatestatus(e.target.value)}
                      value={Updatestatus}
                      className="form-control"
                      name=""
                      id=""
                    >
                      <option value="" selected>
                        Select Status{" "}
                      </option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
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

export default Genre;
