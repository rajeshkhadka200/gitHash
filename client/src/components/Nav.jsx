import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";

import "../css/nav.css";
import { gapi } from "gapi-script";
import { useGoogleLogin } from "react-google-login";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;
  
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState();

  useEffect(() => {
    const getProfile = async () => {
      if (userId) {
        const res = await axios.get(`${api_url}/user/getuser/${userId}`);
        setUser(res.data.user);
      }
    };
    getProfile();
  }, []);

  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const clientId = import.meta.env.VITE_CLIENT_ID;
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onFailure = (err) => {
    console.log(err);
  };
  const onSuccess = async (data) => {
    const { profileObj } = data;
    const { email, name, imageUrl } = profileObj;
    try {
      const res = await axios.post(
        `${api_url}/user/auth`,
        {
          email,
          name,
          imageUrl,
        },
        header
      );
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("image", res.data.user.profilePic);
      alert(res.data.mesg);
      setUser(res.data.user);
      // send the user state to dashboard
      navigate("/dashboard", { state: { user: res.data.user } });
    } catch (error) {
      console.log(error);
    }
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId,
    onFailure,
  });
  const logout = () => {
    setUser(null);
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("image");
    navigate("/");
  };
  return (
    <nav>
      <NavLink to={"/"}>
        <div className="logo">GitHash</div>
      </NavLink>
      {user ? (
        <div className="img_logout_con">
          <MdLogout
            onClick={() => {
              logout();
            }}
            size={20}
            className="logout"
          />
          <img src={user.profilePic} alt="user" />
        </div>
      ) : (
        <button onClick={signIn}>Login</button>
      )}
    </nav>
  );
};

export default Nav;
