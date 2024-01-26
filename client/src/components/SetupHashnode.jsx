import React, { useEffect, useState } from "react";
import "../css/setuphashnode.css";
import axios from "axios";
import toast from "react-hot-toast";

const SetupHashnode = () => {
  const userId = localStorage.getItem("userId");
  const api_url = import.meta.env.VITE_API_URL;

  const [config, setConfig] = useState({
    pubId: "",
    apiKey: "",
  });

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

  const addPub = async () => {
    if (config.pubId === "") {
      toast.error("Publication Id is required");
      return;
    }
    try {
      const res = await axios.patch(`${api_url}/user/addpub`, {
        pubId: config.pubId,
        userId: userId,
      });
      toast.success("Publication Added");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Unable to add Publication Id ");
    }
  };

  const addkey = async () => {
    if (config.apiKey === "") {
      toast.error("API Key is required");
      return;
    }
    try {
      const res = await axios.patch(`${api_url}/user/addApiKey`, {
        apiKey: config.apiKey,
        userId: userId,
      });
      window.location.reload();
      toast.success("API Key Added");
    } catch (error) {
      console.log(error);
      toast.error("Unable to add API Key");
    }
  };

  return (
    <>
      <div className="setup_con">
        <div className="setup_viewer">
          <div className="heading">
            <h2>Hashnode Configuration ⚙️ </h2>
            <p>
              Add your <b>publication ID </b> and <b>Hashnode API key</b> token
              obtained from your Hashnode account. It will be safe with GitHash.
            </p>
          </div>
          <div className="con_input">
            <div className="input_box">
              {user?.hashnodeApiKey ? (
                <input
                  style={{
                    cursor: user?.hashnodeApiKey ? "not-allowed" : "pointer",
                  }}
                  type="text"
                  disabled
                  value={user?.hashnodeApiKey}
                  placeholder="Hashnode API Key"
                />
              ) : (
                <input
                  onChange={(e) => {
                    setConfig({ ...config, apiKey: e.target.value });
                  }}
                  type="text"
                  placeholder="hashnode API Key"
                />
              )}

              <button
                onClick={() => {
                  addkey();
                }}
              >
                {user?.hashnodeApiKey
                  ? "API key Added ✅"
                  : "Add Hashnode Api Key"}
              </button>
            </div>
            <div className="input_box">
              {user?.publication ? (
                <input
                  style={{
                    cursor: user?.publication ? "not-allowed" : "pointer",
                  }}
                  type="text"
                  disabled
                  value={user?.publication}
                  placeholder="Publication Id"
                />
              ) : (
                <input
                  onChange={(e) => {
                    setConfig({ ...config, pubId: e.target.value });
                  }}
                  type="text"
                  placeholder="Publication Id"
                />
              )}
              <button
                disabled={user?.publication ? true : false}
                style={{
                  cursor: user?.publication ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  addPub();
                }}
              >
                {user?.publication ? "Publication Added ✅" : "Add Publication"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupHashnode;
