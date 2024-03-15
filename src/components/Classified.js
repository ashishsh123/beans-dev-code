import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
const Classified = () => {
  const [inputc, setInputc] = useState("");
  const [source9, setSource9] = useState("");
  const [source10, setSource10] = useState("");
  const [autoLoading, setAutoLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPhrase, setNewPhrase] = useState("matrimonial");
  const [rephrasePrompt, setRephrasePrompt] = useState("");
  const [selected, setSelected] = useState([]);

  //   const apiUrl = "http://localhost:3001";

  const apiUrl = "https://beans.timesgroup.com/api";
  const handleRephrase = async () => {
    const prompt = `Please rephrase following text.The output word count should be similar to input word count.: ${inputc}`;
    // setRephrasePrompt(prompt);
    const requestData = { prompt: prompt };

    try {
      setAutoLoading(true);
      const response = await fetch(`${apiUrl}/rephrase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setAutoLoading(false);

        setSource9(data.summary);

        return data.summary;
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  const handleNewRephrase = async () => {
    const selectedValues = selected.map((item) => item.label).join(", ");
    // const prompt = `Consider yourself as ad booking agent for india newspaper media group and rephrase following text with creativity for classified advertisement in newspaper for ${newPhrase}. Pls ensure the output word count should be similar to input word count. ${inputc}`;
    const prompt = `Consider yourself as ad booking agent for india newspaper media group and rephrase following text with creativity for classified advertisement in newspaper for matrimonial. The protagonist should be allocated adjectives such as ${selectedValues}. Pls ensure the output word count should be similar to input word count.${inputc}`;
    console.log(prompt);
    setRephrasePrompt(prompt);
    const requestData = { prompt: prompt };

    try {
      setAutoLoading(true);
      const response = await fetch(`${apiUrl}/rephrase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setAutoLoading(false);

        setSource10(data.summary);

        return data.summary;
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  const handleRephraseContent = async () => {
    try {
      setLoading(true);
      handleRephrase();
      handleNewRephrase();
    } finally {
      setLoading(false);
    }
  };
  const handleMultiSelectChange = (selectedOptions) => {
    // Check if "Select All" is selected
    const isSelectAllSelected = selectedOptions.length === options.length;

    // Limit the selection to a maximum of three options
    if (isSelectAllSelected) {
      setSelected(options.slice(0, 3));
    } else if (selectedOptions.length <= 3) {
      setSelected(selectedOptions);
    } else {
      // If more than 3 options are selected (excluding "Select All"), remove the last selected option
      setSelected(selectedOptions.slice(0, selectedOptions.length - 1));
    }
  };
  const options = [
    { label: "Hard working", value: "hardWorking" },
    { label: "Adventurous", value: "adventurous" },
    { label: "Traveller", value: "traveller" },
    { label: "Fitness freak", value: "fitnessFreak" },
    { label: "Career oriented", value: "careerOriented" },
    { label: "Dreamer", value: "dreamer" },
    { label: "Go getter", value: "goGetter" },
  ];
  const overrideStrings = {
    selectAll: "Select All (max 3)",
    allItemsAreSelected: "All items are selected",
    clearSearch: "Clear Search",
    noOptions: "No options",
    search: "Search",
    selectAllLabel: "Select All (max 3)",
  };

  return (
    // <div className="container">
    // <div className="row justify-content-center">
    <div className="col-md-8">
      <form className="w-50 m-auto">
        <div className="mb-3 mt-2">
          <label
            for="exampleFormControlTextarea1"
            class="form-label fw-bold fs-5 "
          >
            File Your Ad Here
          </label>
          <textarea
            className="form-control classfied"
            id="exampleTextarea"
            rows="4"
            value={inputc}
            onChange={(e) => setInputc(e.target.value)}
          ></textarea>
        </div>
      </form>
      <div className="d-flex justify-content-center">
        <select
          className="form-select mb-3 w-25 me-2 shadow-sm"
          //   style={{
          //     borderRadius: "8px",
          //     padding: "10px",
          //     fontSize: "12px",
          //   }}
          id="exampleSelect"
          value={newPhrase}
          onChange={(event) => setNewPhrase(event.target.value)}
        >
          <option value="matrimonial">Soulmate</option>
          {/* <option value="property">Property</option> */}
        </select>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <MultiSelect
          className="w-25 mb-3 shadow-sm rounded-5 "
          options={options}
          value={selected}
          // onChange={setSelected}
          onChange={handleMultiSelectChange}
          labelledBy="Select"
          overrideStrings={overrideStrings}
          selectAllLabel="Select All (max 3)"
          //   style={{
          //     borderRadius: "8px",
          //     padding: "10px",
          //     fontSize: "12px",
          //   }}
        />
      </div>

      {/* <div className="w-25 m-auto">
        <button type="button" className="btn btn-primary submit-btn">
          Submit
        </button>
      </div> */}
      <div className="d-flex justify-content-center mt-3">
        <button
          type="button"
          class="btn btn-primary optimise-btn"
          onClick={handleRephraseContent}
          id="test1"
        >
          Rephrase
        </button>
      </div>
      <div>
        {autoLoading && (
          <div className="container mt-4 d-flex justify-content-center">
            <div className="row">
              <div className="col-md-12">
                <div class="spinner-border text-dark" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="d-flex justify-content-center">
        {!autoLoading && source9 && (
          <div className="box">
            <div
              className="custom-autotextarea overflow-auto mt-5"
              contentEditable={false}
              suppressContentEditableWarning={true}
            >
              <p>
                {" "}
                {source9 && (
                  <>
                    {source9.split("\n").map((paragraph, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        {paragraph.trim() && (
                          <>
                            <span style={{ marginLeft: "5px" }}>
                              {paragraph}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div> */}

      <div className="d-flex justify-content-center mt-3">
        {!autoLoading && (source9, source10) && (
          <>
            <div className="row">
              <div className="col-md-6">
                <h3 className="title-text fs-4">Option1</h3>
                <div
                  className="custom-autotextarea overflow-auto"
                  contentEditable={false} // Set to true if you want to allow editing
                  suppressContentEditableWarning={true}
                >
                  <p>
                    {" "}
                    {source9 && (
                      <>
                        {source9.split("\n").map((paragraph, index) => (
                          <div key={index} style={{ marginBottom: "10px" }}>
                            {paragraph.trim() && (
                              <>
                                <span style={{ marginLeft: "5px" }}>
                                  {paragraph}
                                </span>
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <h3 className="title-text fs-4">Option2</h3>
                <div
                  className="custom-autotextarea-title overflow-auto"
                  contentEditable={false} // Set to true if you want to allow editing
                  suppressContentEditableWarning={true}
                >
                  <p>
                    {" "}
                    {source10 && (
                      <>
                        {source10.split("\n").map((paragraph, index) => (
                          <div key={index} style={{ marginBottom: "10px" }}>
                            {paragraph.trim() && (
                              <>
                                <span style={{ marginLeft: "5px" }}>
                                  {paragraph}
                                </span>
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default Classified;
