import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login({ onPlayerLoad }) 
{
  const navigate = useNavigate();
  let [data, setData] = useState({
    username: "",
    password: "",
  });

  const [resp, setResp] = useState({});

  let creden = (e) => {
    let newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  };

  function submit() {
    // console.log(data)
    axios
      .post("https://api-mq.dev2prod.tech/v1/pharma/login", {
        username: data.username,
        password: data.password,
      })
      .then(
        (res) => {
          // if (res.status === 200)
          {
            // console.log(res.data)
            setResp(res.data);
            navigate("/home");
            onPlayerLoad(res.data);
          }
        },
        (error) => {
          toast.error("Wrong Credentials!");
          // console.log(res.status)
        }
      );
  }

  return (
    <div>
      <ToastContainer />
      <div id="maindiv">
        <div id="username">
          <img
            src="https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
            height={"20px"}
          />
          <input
            type="text"
            id="username"
            placeholder="John Smith"
            onChange={(e) => creden(e)}
            value={data.username}
          />
        </div>

        <div id="password">
          <img src="https://img.icons8.com/sf-ultralight-filled/25/null/key-security.png" />
          <input
            type="text"
            id="password"
            placeholder="**********"
            onChange={(e) => creden(e)}
            value={data.password}
          />
        </div>

        <div id="login">
          <button onClick={submit}>Login</button>
        </div>
      </div>
      <h1>{resp?.data?.fullname}</h1>

      {/* <h5>{resp}</h5> */}
    </div>
  );
}

export default Login;
