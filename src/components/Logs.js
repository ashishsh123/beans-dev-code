import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sends from "../assets/send.svg";

const Logs = ({ phone, setSelectedLog, logCreated }) => {
  const [logs, setLogs] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const apiUrl = `https://wl40u76f77.execute-api.ap-south-1.amazonaws.com/dev/getlog/${phone}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update state with fetched logs
        setLogs(data.logs);

        // Save logs to localStorage
        localStorage.setItem("logs", JSON.stringify(data.logs));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Load logs from localStorage on component mount
    const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(storedLogs);

    // Fetch data when the component mounts
    fetchData();
  }, [logCreated]);

  const handleViewClick = (ele) => {
    setSelectedLog(ele);
    setClicked(!clicked);
  };
  const handleSendClick = () => {
    const logText = ""; // Add your logic to construct the log text here
    sendMail(recipientEmail, logText);
  };

  const sendMail = async (recipientEmail, logText) => {
    try {
      await fetch("/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: recipientEmail,
          content: logText,
        }),
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="mt-3">
      <ul>
        {logs.map((element, index) => (
          <>
            <span className="created-at">{element.created_at}</span>
            <div className="row me-2">
              <div className="col-md-10">
                <Link
                  className="link-style"
                  onClick={() => handleViewClick(element)}
                  style={{
                    color: clicked ? "white" : "black",
                    backgroundColor: clicked ? "black" : "#e6e6f0",
                    textDecoration: "none",
                  }}
                >
                  <li
                    key={index}
                    className="list-group-item  mt-1 mb-2 d-flex justify-content-between logs "
                  >
                    <span className="identification">
                      {element.log.input.User_Title
                        ? element.log.input.User_Title
                        : element.log.input.InputText.split(" ")
                            .slice(0, 5)
                            .join(" ")}
                    </span>
                  </li>
                </Link>
              </div>
              <div className="col-md-2 mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="60%"
                  height="60%"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                  className="send-mail"
                >
                  <path d="M215.4 96H144 107.8 96v8.8V144v40.4 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3V96c0-26.5 21.5-48 48-48h76.6l49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48H416c26.5 0 48 21.5 48 48v44.3l22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4v-89V144 104.8 96H404.2 368 296.6 215.4zM0 448V242.1L217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1V448v0c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64v0zM176 160H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                </svg>
                {/* <img
                  src={sends}
                  className="send-mail"
                  onClick={() => {
                    const { output } = element.log;
                    const input = element.log.input.InputText;

                    if (output.Rephrase_Text) {
                      console.log(
                        "Rephrase_Text:",
                        input,
                        output.Rephrase_Text
                      );
                    }

                    if (output.Generated_Text && output.Title_Text) {
                      console.log(
                        "Generated_Text:",
                        input,
                        output.Generated_Text,
                        input,
                        output.Title_Text
                      );
                    }

                    if (output.OpenAI_Text && output.Gemini_Text) {
                      console.log(
                        "OpenAI_Text:",
                        input,
                        output.OpenAI_Text,
                        output.Gemini_Text
                      );
                    } */}

                {/* // console.log(
                    //   element.log.input.InputText,
                    //   element.log.output.Rephrase_Text
                    // )
                  // }}
                  // data-bs-toggle="modal"
                  // data-bs-target="#exampleModal"
                  // data-bs-whatever="@mdo"
                // ></img> */}

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          New message
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="mb-3">
                            <label
                              for="recipient-name"
                              className="col-form-label"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="recipient-name"
                            />
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
