import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox";
import sendBtn from "../assets/send.svg";
import beans from "../assets/Beans-logos_black-1.png";
import analysis from "../assets/new_10785604.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Footer from "./Footer";
import Logs from "./Logs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Classified from "./Classified";

const Textgenerate = () => {
  const [taskSelected, setTaskSelected] = useState("Journo Assist");
  const [genreSelected, setGenreSelected] = useState("");
  const [writingStyleSelected, setWritingStyleSelected] = useState("");
  const [natureSelected, setNatureSelected] = useState("");
  const [editorialSelected, setEditorialSelected] = useState("");
  const [toneselected, setToneSelected] = useState("");
  const [characterLimitSelected, setCharacterLimitSelected] = useState("");
  const [generateTextLimit, setGenerateTextLimit] = useState("");
  const [titleLengthLimit, setTitleLengthLimit] = useState("");
  const [inputText, setInputText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatePrompt, setGeneratePrompt] = useState("");
  const [analysisPrompt, setAnalysisPrompt] = useState("");
  const [titlePrompt, setTitlePrompt] = useState("");
  const [rephrasePrompt, setRephrasePrompt] = useState("");
  const [source1, setSource1] = useState("");
  const [source2, setSource2] = useState("");
  const [source3, setSource3] = useState("");
  const [source4, setSource4] = useState("");
  const [source5, setSource5] = useState(null);
  const [source6, setSource6] = useState(null);
  const [source7, setSource7] = useState(null);
  const [source8, setSource8] = useState([]);
  const [source11, setSource11] = useState(null);
  const [source12, setSource12] = useState(null);
  const [inputAutoText, setInputAutoText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [claudLoading, setClaudLoading] = useState(false);
  const [palmLoading, setPalmLoading] = useState(false);
  const [gptLoading, setGptLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState("claud");
  const [selectedLog, setSelectedLog] = useState(null);
  const [logCreated, setLogCreated] = useState("");
  const [rephraseLogCreated, setRephraseLogCreated] = useState("");
  const [activeFunction, setActiveFunction] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState("option1");

  // const apiUrl = "https://beans.timesgroup.com/api";

  const apiUrl = "http://localhost:3001";
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["beansphone"]);
  useEffect(() => {
    console.log("useEffect triggered");
    console.log("Cookies:", cookies.beansphone);
    if (!cookies.beansphone) {
      navigate("/otp");
    }
  }, []);
  const handleSelectChange = (option, setterFunction) => {
    setterFunction(option);
  };

  // const taskOptions = [
  //   { value: "Journo Assist", label: "Journo Assist" },
  //   { value: "Generate", label: "Generate" },
  //   { value: "Profanity Check", label: "Profanity Check" },
  //   { value: "Jargon and Obscure Word", label: "Jargon and Obscure Word" },
  //   { value: "Buzzwords and Clichés", label: "Buzzwords and Clichés" },
  //   { value: "Proof Read", label: "Proof Read" },
  //   {
  //     value: "Reset the length of content",
  //     label: "Reset the length of content",
  //   },
  // ];
  const genreOptions = [
    { value: "", label: "Genres" }, // Note: You might want to consider an empty value for the default option
    { value: "Current Events", label: "Current Events" },
    { value: "Policy and Governance", label: "Policy and Governance" },
    { value: "Technology", label: "Technology" },
    { value: "Health and Wellness", label: "Health and Wellness" },
    { value: "Education", label: "Education" },
    { value: "Environment", label: "Environment" },
    { value: "Culture and Arts", label: "Culture and Arts" },
    { value: "Social Issues", label: "Social Issues" },
    { value: "Sports", label: "Sports" },
  ];
  const natureOptions = [
    { value: "Political", label: "Political" },
    { value: "Investigative", label: "Investigative" },
    { value: "Reporting in-depth", label: "Reporting in-depth" },
    { value: "Timeline", label: "Timeline" },
    { value: "Gossip", label: "Gossip" },
    { value: "Humorous", label: "Humorous" },
    { value: "Blog / Essay", label: "Blog / Essay" },
    { value: "Personality / Profile", label: "Personality / Profile" },
    { value: "Advice", label: "Advice" },
    { value: "Editorial", label: "Editorial" },
    {
      value: "Critical/Judgemental/Analysis",
      label: "Critical/Judgemental/Analysis",
    },
    { value: "Review - Book or Movie", label: "Review - Book or Movie" },
    { value: "Food Columns", label: "Food Columns" },
    {
      value: "View / Counter-View (Point)",
      label: "View / Counter-View (Point)",
    },
    {
      value: "Explanation or recommendation",
      label: "Explanation or recommendation",
    },
    { value: "Quotation and facts", label: "Quotation and facts" },
    { value: "Opening Remark/thesis", label: "Opening Remark/thesis" },
    { value: "Objective explanation", label: "Objective explanation" },
    {
      value: "Analogies/history/examples",
      label: "Analogies/history/examples",
    },
    { value: "Set up example", label: "Set up example" },
  ];
  const editorialOptions = [
    { value: "", label: "Editorial Will" }, // Consider an empty value for the default option
    { value: "Explain or Interpret", label: "Explain or Interpret" },
    {
      value: "Critical Analysis or review",
      label: "Critical Analysis or review",
    },
    { value: "Persuade or reform", label: "Persuade or reform" },
    { value: "Recommend", label: "Recommend" },
    { value: "Opinion", label: "Opinion" },
    { value: "Elaborate", label: "Elaborate" },
    {
      value: "Infer or deduce or conclude",
      label: "Infer or deduce or conclude",
    },
    { value: "List", label: "List" },
    { value: "Narrow down focus", label: "Narrow down focus" },
    { value: "Outline", label: "Outline" },
    { value: "Predict", label: "Predict" },
    { value: "Produce", label: "Produce" },
    { value: "Propose", label: "Propose" },
    { value: "Rephrase", label: "Rephrase" },
    { value: "Reword", label: "Reword" },
    { value: "Sum up", label: "Sum up" },
    { value: "Summarise", label: "Summarise" },
    { value: "Suggest", label: "Suggest" },
    { value: "Translate", label: "Translate" },
    { value: "Argue", label: "Argue" },
    { value: "Combine", label: "Combine" },
    { value: "Compare", label: "Compare" },
    { value: "Differentiate", label: "Differentiate" },
    { value: "Discuss", label: "Discuss" },
  ];
  const writingStyleOptions = [
    { value: "", label: "Preferred Writing Style" }, // Consider an empty value for the default option
    { value: "Narrative", label: "Narrative" },
    { value: "Descriptive", label: "Descriptive" },
    { value: "Expository", label: "Expository" },
    { value: "Persuasive", label: "Persuasive" },
    { value: "Creative", label: "Creative" },
    { value: "Objective", label: "Objective" },
    { value: "Subjective", label: "Subjective" },
    { value: "Review", label: "Review" },
    { value: "Poetic", label: "Poetic" },
    { value: "Technical", label: "Technical" },
  ];
  const toneOptions = [
    { value: "", label: "Tone of the Article" }, // Consider an empty value for the default option
    { value: "Positive", label: "Positive" },
    { value: "Negative", label: "Negative" },
    { value: "Neutral", label: "Neutral" },
  ];
  const characterLimitOptions = [
    { value: "", label: "Character limit" }, // Consider an empty value for the default option
    { value: "300", label: "300" },
    { value: "300-500", label: "300-500" },
    { value: "None", label: "None" },
  ];
  const titleLengthOptions = [
    { value: "", label: "length of the Title" },
    { value: "5", label: "5" },
    { value: "5-10", label: "5-10" },
    { value: "10", label: "10" },
    { value: "None", label: "None" },
  ];
  const generateTextLimitOptions = [
    { value: "", label: "Generated text Limit" },
    { value: "under 50", label: "Under 50" },
    { value: "50-100", label: "50-100" },
    { value: "100-150", label: "100-150" },
    { value: "150-200", label: "150-200" },
    { value: "200-250", label: "200-250" },
    { value: "250-300", label: "250-300" },
  ];

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*ALL FETCH FUNCTIONS */
  ///////////////////////////////////

  /*-----------OPENAI FETCH FUNCTION--------------------- */

  const handleGenerateText = async () => {
    let condition;

    if (characterLimitSelected.includes("-")) {
      // If range is provided
      const [lowerLimit, upperLimit] = characterLimitSelected
        .split("-")
        .map(Number);
      condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
    } else if (characterLimitSelected.toLowerCase().includes("under")) {
      // If the value is "under"
      const value = Number(characterLimitSelected.split(" ")[1]);
      condition = `less than ${value}`;
    } else if (characterLimitSelected.toLowerCase().includes("none")) {
      condition = `of n number of`;
    } else {
      // If a single value is provided
      const value = Number(characterLimitSelected);
      condition = `less than or equal to  ${value}`;
    }
    const prompt = ` consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.The output should be  ${condition} words`;
    const requestData = { prompt: prompt };

    try {
      setGptLoading(true);
      const response = await fetch(`${apiUrl}/generation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setGptLoading(false);
        const data = await response.json();

        // Your commented-out code
        // setOutput(summaryWithCheckboxes);

        setSource3(data.summary);
        console.log(data.summary); // Log the summary to the console
        return data.summary; // Return the summary
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  // ///////////////////////////////////////////////////////////////////////////////////////////////

  const handleImage = async () => {
    const prompt = `Generate the image according to the given input: ${inputText}`;
    const requestData = { prompt };

    try {
      const response = await fetch(`${apiUrl}/image-generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.image_url);
        setImageURL(data.image_url); // Assuming the API response has an "image_url" property
      } else {
        console.error("Error generating image");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleAutoCompletion = async () => {
    let condition;

    // if (generateTextLimit.includes("-")) {
    //   // If range is provided
    //   const [lowerLimit, upperLimit] = generateTextLimit.split("-").map(Number);
    //   condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
    // } else if (generateTextLimit.toLowerCase().includes("under")) {
    //   // If the value is "under"
    //   const value = Number(generateTextLimit.split(" ")[1]);
    //   condition = `less than ${value}`;
    // } else {
    //   // If a single value is provided
    //   const value = Number(generateTextLimit);
    //   condition = `less than or equal to ${value}`;
    // }
    if (!generateTextLimit) {
      condition = "without any limit";
    } else if (generateTextLimit.includes("-")) {
      // If range is provided
      const [lowerLimit, upperLimit] = generateTextLimit.split("-").map(Number);
      condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
    } else if (generateTextLimit.toLowerCase().includes("under")) {
      // If the value is "under"
      const value = Number(generateTextLimit.split(" ")[1]);
      condition = `less than ${value}`;
    } else {
      // If a single value is provided
      const value = Number(generateTextLimit);
      condition = `less than or equal to ${value}`;
    }
    const prompt = `Autocomplete the provided text, and the output should be ${condition} words. Input: ${inputAutoText}`;
    setGeneratePrompt(prompt);
    console.log(prompt);
    const requestData = { prompt: prompt };
    try {
      setAutoLoading(true);
      const response = await fetch(`${apiUrl}/autogenerate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setAutoLoading(false);
        const data = await response.json();
        setSource5(data.summary);
        source7(null);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleTitleGeneration = async () => {
    let condition;

    if (!titleLengthLimit) {
      condition = "without any limit";
    } else if (titleLengthLimit.includes("-")) {
      // If range is provided
      const [lowerLimit, upperLimit] = titleLengthLimit.split("-").map(Number);
      condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
    } else if (titleLengthLimit.toLowerCase().includes("under")) {
      // If the value is "under"
      const value = Number(titleLengthLimit.split(" ")[1]);
      condition = `less than ${value}`;
    } else if (titleLengthLimit.toLowerCase().includes("none")) {
      condition = `of n number of`;
    } else {
      // If a single value is provided
      const value = Number(titleLengthLimit);
      condition = `less than or equal to ${value}`;
    }

    const prompt = `Provide 5 title options for following input and the title should be  ${condition} words:${inputAutoText}.`;
    console.log(prompt);
    setTitlePrompt(prompt);
    const requestData = { prompt: prompt };
    try {
      const response = await fetch(`${apiUrl}/titlegenerate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setSource6(data.summary);
        source7(null);
        return data.summary;
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleOpenAITextGenerate = async () => {
    let condition;

    if (!generateTextLimit) {
      condition = "without any limit";
    } else if (generateTextLimit.includes("-")) {
      // If range is provided
      const [lowerLimit, upperLimit] = generateTextLimit.split("-").map(Number);
      condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
    } else if (generateTextLimit.toLowerCase().includes("under")) {
      // If the value is "under"
      const value = Number(generateTextLimit.split(" ")[1]);
      condition = `less than ${value}`;
    } else {
      // If a single value is provided
      const value = Number(generateTextLimit);
      condition = `less than or equal to ${value}`;
    }
    // const prompt = `Autocomplete the provided text, and the output should be ${condition} words. Input: ${inputAutoText}`;
    const prompt = `Elaborate or auto-complete the input text.
    The generated output text should be simple vocabulary in indian( or UK) english
    Sentences should be precise and not wayward. It should not produce extraneous material & remain within limit ${condition}
    Writing Stylistic preferences can be either Nut graph or Inverted Pyramid
    Do not convert or translate hindi words into english equivalent
    Do not manipulate or replace text within quotes
    Do not convert or replace proper noun or adjectives in original content:${inputAutoText}`;

    console.log("openAI prompt------------", prompt);
    const requestData = { prompt: prompt };
    setAnalysisPrompt(prompt);
    try {
      setAutoLoading(true);
      const response = await fetch(`${apiUrl}/autogenerate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setAutoLoading(false);
        const data = await response.json();
        setSource11(data.summary);
        source11(null);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleGeminiTextGenerate = async () => {
    let condition;
    if (!generateTextLimit) {
      condition = "without any limit";
    } else if (generateTextLimit.includes("-")) {
      // If range is provided
      const [lowerLimit, upperLimit] = generateTextLimit.split("-").map(Number);
      condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
    } else if (generateTextLimit.toLowerCase().includes("under")) {
      // If the value is "under"
      const value = Number(generateTextLimit.split(" ")[1]);
      condition = `less than ${value}`;
    } else {
      // If a single value is provided
      const value = Number(generateTextLimit);
      condition = `less than or equal to ${value}`;
    }

    // const prompt = `Autocomplete the provided text, and the output should be ${condition} words. Input: ${inputAutoText}`;
    const prompt = `Regenerate or auto-complete the input text.
    The generated output text should be simple vocabulary in indian english
    Sentences should be precise and not wayward. It should not produce extraneous material & remain within limit ${condition}
    Writing Stylistic preferences can be either Nut graph or Inverted Pyramid
    Do not convert or translate hindi words into english equivalent
    Do not manipulate or replace text within quotes
    Do not convert or replace proper noun or adjectives in original content:${inputAutoText}`;
    console.log("Gemini prompt--------------", prompt);
    const requestData = { prompt: prompt };
    setAnalysisPrompt(prompt);

    console.log(JSON.stringify(requestData));
    try {
      setPalmLoading(true);
      const response = await fetch(`${apiUrl}/generate-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setPalmLoading(false);
        const data = await response.json();

        setSource12(data.result);
        return data.result;

        // setOutput(data.summary);

        console.log(data.result);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };
  /////////////////////////////////////////////////////////////////////////////////////////////
  const handleTextGenerateCompletion = async () => {
    setActiveFunction("");
    setSource5(null);
    setSource6(null);
    setSource7(null);
    setSource11(null);
    setSource12(null);
    await Promise.all([handleOpenAITextGenerate(), handleGeminiTextGenerate()])
      .then(() => {
        console.log("Successfully fetched response");
        setActiveFunction("handleTextGenerateCompletion");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  const handleTextAutoCompletion = async () => {
    setActiveFunction("");

    setSource5(null);
    setSource6(null);
    setSource7(null);
    setSource11(null);
    setSource12(null);

    await Promise.all([handleAutoCompletion(), handleTitleGeneration()])
      .then(() => {
        console.log("Sucessfully fetched response");
        setActiveFunction("handleTextAutoCompletion");
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error:", error);
      })
      .finally(() => {});
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleTextRephrase = async () => {
    setActiveFunction("");
    const prompt = `Please rephrase following text.The output word count should be similar to input word count.: ${inputAutoText}`;
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
        setAutoLoading(false);
        const data = await response.json();

        setSource7(data.summary);
        setSource5(null);
        setSource6(null);
        setSource11(null);
        setSource12(null);
        setActiveFunction("handleTextRephrase");

        return data.summary;
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  // /////////////////////////////////////////////////////////////////////////
  // const handlePalmGenerateContent = async () => {
  //   let condition;

  //   if (characterLimitSelected.includes("-")) {
  //     // If range is provided
  //     const [lowerLimit, upperLimit] = characterLimitSelected
  //       .split("-")
  //       .map(Number);
  //     condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
  //   } else if (characterLimitSelected.toLowerCase().includes("under")) {
  //     // If the value is "under"
  //     const value = Number(characterLimitSelected.split(" ")[1]);
  //     condition = `less than ${value}`;
  //   } else if (characterLimitSelected.toLowerCase().includes("none")) {
  //     condition = `of n number of`;
  //   } else {
  //     // If a single value is provided
  //     const value = Number(characterLimitSelected);
  //     condition = `less than or equal to ${value}`;
  //   }
  //   const prompt = ` consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.The output should be  ${condition} words`;
  //   console.log(prompt);
  //   const requestData = { prompt: prompt };

  //   console.log(JSON.stringify(requestData));
  //   try {
  //     setPalmLoading(true);
  //     const response = await fetch(`${apiUrl}/generate-text`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (response.ok) {
  //       setPalmLoading(false);
  //       const data = await response.json();

  //       setSource2(data.summary);
  //       return data.summary;

  //       // setOutput(data.summary);

  //       console.log(data.summary);
  //     } else {
  //       console.error("Error generating content");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   } finally {
  //   }
  // };
  const handlePalmGenerateContent = async () => {
    let condition;

    if (characterLimitSelected.includes("-")) {
      // If range is provided
      const [lowerLimit, upperLimit] = characterLimitSelected
        .split("-")
        .map(Number);
      condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
    } else if (characterLimitSelected.toLowerCase().includes("under")) {
      // If the value is "under"
      const value = Number(characterLimitSelected.split(" ")[1]);
      condition = `less than ${value}`;
    } else if (characterLimitSelected.toLowerCase().includes("none")) {
      condition = `of n number of`;
    } else {
      // If a single value is provided
      const value = Number(characterLimitSelected);
      condition = `less than or equal to ${value}`;
    }
    const prompt = ` consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.The output should be  ${condition} words`;
    console.log(prompt);
    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setPalmLoading(true);
      const response = await fetch(`${apiUrl}/generate-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setPalmLoading(false);
        const data = await response.json();

        setSource2(data.result);
        return data.result;

        // setOutput(data.summary);

        console.log(data.result);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleClaudeGenerateContent = async () => {
    let condition;

    if (characterLimitSelected.includes("-")) {
      // If range is provided
      const [lowerLimit, upperLimit] = characterLimitSelected
        .split("-")
        .map(Number);
      condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
    } else if (characterLimitSelected.toLowerCase().includes("under")) {
      // If the value is "under"
      const value = Number(characterLimitSelected.split(" ")[1]);
      condition = `less than ${value}`;
    } else if (characterLimitSelected.toLowerCase().includes("none")) {
      condition = `of n number of`;
    } else {
      // If a single value is provided
      const value = Number(characterLimitSelected);
      condition = `less than or equal to ${value}`;
    }
    const prompt = ` consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.The output should be  ${condition} words`;

    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setClaudLoading(true);
      const response = await fetch(`${apiUrl}/invoke-model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setClaudLoading(false);
        const data = await response.json();

        setSource1(data.summary);
        return data.summary;

        console.log(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // FETCHING Google_API_RESPONSE
  const handleGoogleContent = async () => {
    const prompt = ` Provide detail information about the given input:${inputText}`;
    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setGoogleLoading(true);
      const response = await fetch(`${apiUrl}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setGoogleLoading(false);
        const data = await response.json();

        setSource8(data);
        return data;
        // console.log(data.searchResults);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const handleContent = async () => {
    try {
      setLoading(true);
      handleClaudeGenerateContent();
      handlePalmGenerateContent();
      handleGenerateText();
      handleGoogleContent();
      await handleImage();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("asd", source1, source2, source3);

    if ("" !== source1 && "" !== source2 && "" !== source3)
      handleSummary(
        `${JSON.stringify(source1)}${JSON.stringify(source2)}${JSON.stringify(
          source3
        )}`
      );
  }, [source1, source2, source3]);

  const handleSummary = async (allResponse) => {
    if (!allResponse) {
      console.log(allResponse);
      return "Please select the repsonse";
    }
    let condition;

    if (characterLimitSelected.includes("-")) {
      // If range is provided
      const [lowerLimit, upperLimit] = characterLimitSelected
        .split("-")
        .map(Number);
      condition = `higher than ${lowerLimit} and less than ${upperLimit}`;
    } else if (characterLimitSelected.toLowerCase().includes("under")) {
      // If the value is "under"
      const value = Number(characterLimitSelected.split(" ")[1]);
      condition = `less than ${value}`;
    } else if (characterLimitSelected.toLowerCase().includes("none")) {
      condition = `of n number of`;
    } else {
      // If a single value is provided
      const value = Number(characterLimitSelected);
      condition = `less than or equal to ${value}`;
    }

    const prompt = `Article: ${allResponse}

    You will generate increasingly concise entity-dense summaries of the above article. Repeat the following 5 times.Don't use the word summary in response.
    Guidelines:
    The first summary should be long (4-5 sentences, ~80 words), yet highly non-specific, containing little information beyond the entities marked as missing. Use overly verbose language and fillers (e.g., “this article discusses”) to reach ~80 words.
    Make every word count. Rewrite the previous summary to improve flow and make space for additional entities.
    Make space with fusion, compression, and removal of uninformative phrases like “the article discusses”.
    The summaries should become highly dense and concise, yet self-contained, e.g., easily understood without the article.
    Missing entities can appear anywhere in the new summary.
    Never drop entities from the previous summary. If space cannot be made, add fewer new entities.
    Remember: Use the exact same number of words for each summary.The output should be  ${condition} words`;

    // setPrompt(prompt);

    // setPrompt(prompt);
    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setSummaryLoading(true);
      const response = await fetch(`${apiUrl}/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSummaryLoading(false);
        const data = await response.json();

        setSource4(data.summary);
        console.log(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  const handleLinkClick = (engine) => {
    setSelectedEngine(engine);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*Storing data to dynamo db  */

  const sendDataToAPI = async (functionName) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let logData = {};

      if (functionName === "handleTextAutoCompletion") {
        logData = {
          channel_id: "beans",
          identification: String(cookies.beansphone),
          log: {
            input: {
              Journo_Assist_Auto_Prompt: generatePrompt,
              InputText: inputAutoText,
              Journo_Assist_Title_Prompt: titlePrompt,
              No_of_Title: titleLengthLimit,
              No_of_characters: generateTextLimit,
              User_Title: inputValue,
            },
            output: {
              Generated_Text: source5,
              Title_Text: source6,
            },
          },
        };
      } else if (functionName === "handleTextRephrase") {
        logData = {
          channel_id: "beans",
          identification: String(cookies.beansphone),
          log: {
            input: {
              Journo_Assist_Rephrase_Prompt: rephrasePrompt,
              InputText: inputAutoText,
              User_Title: inputValue,
            },
            output: {
              Rephrase_Text: source7,
            },
          },
        };
      } else if (functionName === "handleTextGenerateCompletion") {
        logData = {
          channel_id: "beans",
          identification: String(cookies.beansphone),
          log: {
            input: {
              Journo_Assist_Auto_Prompt: generatePrompt,
              InputText: inputAutoText,
              Journo_Assist_Title_Prompt: titlePrompt,
              No_of_Title: titleLengthLimit,
              No_of_characters: generateTextLimit,
              User_Title: inputValue,
            },
            output: {
              OpenAI_Text: source11,
              Gemini_Text: source12,
            },
          },
        };
      } else {
        // Handle unexpected function names appropriately
        console.error(
          "Invalid function name provided to sendDataToAPI:",
          functionName
        );
        return;
      }

      const raw = JSON.stringify(logData);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://wl40u76f77.execute-api.ap-south-1.amazonaws.com/dev",
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      setLogCreated([new Date()]);
    } catch (error) {
      console.log("error", error);
      // Handle errors appropriately, potentially informing the user
    }
  };
  //////////////////////////////////////////////////////////////////////////////////

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.trim().split(/\s+/);

    // Limit the input to 5 words
    if (words.length > 5) {
      // Truncate to the first 5 words
      setInputValue(words.slice(0, 5).join(" "));
    } else {
      setInputValue(inputValue);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div
          className="col-md-4 border-end border-dark left-side"
          style={{
            maxHeight: "100vh",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
          <div className="mb-5">
            <div className=" d-flex">
              <img
                src={beans}
                alt=""
                className="logo img-fluid"
                // style={{ maxWidth: "30%", maxHeight: "30%" }}
              ></img>
              <h1 className="heading-ai">.toi.ai</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-5">
              {" "}
              {/* <SelectBox
                options={taskOptions}
                onSelect={(value) => handleSelectChange(value, setTaskSelected)}
              /> */}
              <select
                className="form-select form-select-sm mb-4 test1 w-100 shadow-sm"
                aria-label="Default select example"
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
                onChange={(e) => {
                  setTaskSelected(e.target.value);
                  // setShowInputBox(e.target.value !== "Text Completion");
                }}
              >
                <option selected value="Journo Assist" className="text-dark">
                  Journo Assist
                </option>
                <option value="Classified Ads" className="text-dark">
                  Classified Ads
                </option>

                <option value="Generate" className="text-dark">
                  Generate
                </option>

                <option value="Profanity Check" className="text-dark">
                  Profanity Check
                </option>
                <option value="Jargon and Obscure Word" className="text-dark">
                  Jargon and Obscure Word
                </option>
                <option value="Buzzwords and Clichés" className="text-dark">
                  Buzzwords and Clichés
                </option>
                <option value="Proof Read" className="text-dark">
                  Proof Read
                </option>
                <option
                  value="Reset the length of content"
                  className="text-dark"
                >
                  Reset the length of content
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {taskSelected === "Journo Assist" &&
                taskSelected !== "Classified Ads" && (
                  <SelectBox
                    options={titleLengthOptions}
                    onSelect={(value) =>
                      handleSelectChange(value, setTitleLengthLimit)
                    }
                  />
                )}
              {taskSelected !== "Journo Assist" &&
                taskSelected !== "Classified Ads" && (
                  <SelectBox
                    options={genreOptions}
                    onSelect={(value) =>
                      handleSelectChange(value, setGenreSelected)
                    }
                  />
                )}
            </div>

            <div className="col-md-6">
              {taskSelected === "Journo Assist" &&
                taskSelected !== "Classified Ads" && (
                  <SelectBox
                    options={generateTextLimitOptions}
                    onSelect={(value) =>
                      handleSelectChange(value, setGenerateTextLimit)
                    }
                  />
                )}
              {taskSelected !== "Journo Assist" &&
                taskSelected !== "Classified Ads" && (
                  <SelectBox
                    options={natureOptions}
                    onSelect={(value) =>
                      handleSelectChange(value, setNatureSelected)
                    }
                  />
                )}
            </div>
          </div>
          {taskSelected !== "Journo Assist" &&
            taskSelected !== "Classified Ads" && (
              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <SelectBox
                    options={editorialOptions}
                    onSelect={(value) =>
                      handleSelectChange(value, setEditorialSelected)
                    }
                  />
                </div>

                <div className="col-md-6">
                  {" "}
                  <SelectBox
                    options={writingStyleOptions}
                    onSelect={(value) =>
                      handleSelectChange(value, setWritingStyleSelected)
                    }
                  />
                </div>
              </div>
            )}
          {taskSelected !== "Journo Assist" &&
            taskSelected !== "Classified Ads" && (
              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <SelectBox
                    options={toneOptions}
                    onSelect={(value) =>
                      handleSelectChange(value, setToneSelected)
                    }
                  />
                </div>
                <div className="col-md-6">
                  {" "}
                  <SelectBox
                    options={characterLimitOptions}
                    onSelect={(value) =>
                      handleSelectChange(value, setCharacterLimitSelected)
                    }
                  />
                </div>
              </div>
            )}
          {taskSelected == "Journo Assist" && (
            <Logs
              phone={cookies.beansphone}
              setSelectedLog={setSelectedLog}
              logCreated={logCreated}
            />
          )}
          {taskSelected !== "Journo Assist" &&
            taskSelected !== "Classified Ads" && (
              <div className="input-group mb-3  mt-5 position-relative">
                <input
                  className="input-box p-3 border-0"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  className="btn bg-white p-0 m-0 send-btn"
                  onClick={handleContent}
                >
                  <img src={sendBtn} alt="Send" className="send-logo" />
                </button>
              </div>
            )}
          {taskSelected !== "Journo Assist" &&
            taskSelected !== "Classified Ads" && (
              <div className="reset  d-flex justify-content-center ">
                <button
                  type="button"
                  className="btn-default btn-sm reset-btn rounded-3 w-25"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  R E S E T
                </button>
              </div>
            )}
          {taskSelected !== "Journo Assist" &&
            taskSelected !== "Classified Ads" && <Footer />}
        </div>

        {selectedLog && (
          <div className="col-md-8">
            <div className="mt-3">
              <div className="refresh-icon d-flex justify-content-between mb-2">
                {selectedLog.log.input.Journo_Assist_Auto_Prompt ? (
                  // <textarea
                  //   className="form-control"
                  //   id="exampleFormControlTextarea1"
                  //   placeholder="Please ingest your inputs here"
                  //   rows="5"
                  //   value={selectedLog.log.input.InputText}
                  //   onChange={(e) => setInputAutoText(e.target.value)}
                  //   disabled
                  // >
                  //   {/* {selectedLog.log.input.Journo_Assist_Auto_Prompt} */}
                  // </textarea>
                  <h4>{selectedLog.log.input.InputText}</h4>
                ) : (
                  // <textarea
                  //   className="form-control"
                  //   id="exampleFormControlTextarea1"
                  //   placeholder="Please ingest your inputs here"
                  //   rows="5"
                  //   value={selectedLog.log.input.InputText}
                  //   onChange={(e) => setInputAutoText(e.target.value)}
                  //   disabled
                  // >

                  // </textarea>
                  <h4>{selectedLog.log.input.InputText}</h4>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  height="16px"
                  width="16px"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                </svg>
              </div>
            </div>
            {selectedLog.log.output.Generated_Text &&
              selectedLog.log.output.Title_Text && (
                <div className="row">
                  <div className="col-md-6">
                    <div
                      className="custom-autotextarea overflow-auto mt-3"
                      contentEditable={false} // Set to true if you want to allow editing
                      suppressContentEditableWarning={true}
                    >
                      <p>
                        {" "}
                        {selectedLog.log.output.Generated_Text && (
                          <>
                            {selectedLog.log.output.Generated_Text.split(
                              "\n"
                            ).map((paragraph, index) => (
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
                    <div
                      className="custom-autotextarea-title overflow-auto mt-3"
                      contentEditable={false} // Set to true if you want to allow editing
                      suppressContentEditableWarning={true}
                    >
                      <p>
                        {" "}
                        {selectedLog.log.output.Title_Text && (
                          <>
                            {selectedLog.log.output.Title_Text.split("\n").map(
                              (paragraph, index) => (
                                <div
                                  key={index}
                                  style={{ marginBottom: "10px" }}
                                >
                                  {paragraph.trim() && (
                                    <>
                                      <span style={{ marginLeft: "5px" }}>
                                        {paragraph}
                                      </span>
                                    </>
                                  )}
                                </div>
                              )
                            )}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            {selectedLog.log.output.Rephrase_Text && (
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="custom-autotextarea overflow-auto mt-3"
                    contentEditable={false} // Set to true if you want to allow editing
                    suppressContentEditableWarning={true}
                  >
                    <p>
                      {" "}
                      {selectedLog.log.output.Rephrase_Text && (
                        <>
                          {selectedLog.log.output.Rephrase_Text.split("\n").map(
                            (paragraph, index) => (
                              <div key={index} style={{ marginBottom: "10px" }}>
                                {paragraph.trim() && (
                                  <>
                                    <span style={{ marginLeft: "5px" }}>
                                      {paragraph}
                                    </span>
                                  </>
                                )}
                              </div>
                            )
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedLog.log.output.OpenAI_Text &&
              selectedLog.log.output.Gemini_Text && (
                <div className="row">
                  <div className="col-md-6">
                    <div
                      className="custom-autotextarea overflow-auto mt-3"
                      contentEditable={false} // Set to true if you want to allow editing
                      suppressContentEditableWarning={true}
                    >
                      <p>
                        {" "}
                        {selectedLog.log.output.OpenAI_Text && (
                          <>
                            {selectedLog.log.output.OpenAI_Text.split("\n").map(
                              (paragraph, index) => (
                                <div
                                  key={index}
                                  style={{ marginBottom: "10px" }}
                                >
                                  {paragraph.trim() && (
                                    <>
                                      <span style={{ marginLeft: "5px" }}>
                                        {paragraph}
                                      </span>
                                    </>
                                  )}
                                </div>
                              )
                            )}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="custom-autotextarea-title overflow-auto mt-3"
                      contentEditable={false} // Set to true if you want to allow editing
                      suppressContentEditableWarning={true}
                    >
                      <p>
                        {" "}
                        {selectedLog.log.output.Gemini_Text && (
                          <>
                            {selectedLog.log.output.Gemini_Text.split("\n").map(
                              (paragraph, index) => (
                                <div
                                  key={index}
                                  style={{ marginBottom: "10px" }}
                                >
                                  {paragraph.trim() && (
                                    <>
                                      <span style={{ marginLeft: "5px" }}>
                                        {paragraph}
                                      </span>
                                    </>
                                  )}
                                </div>
                              )
                            )}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}

        {!selectedLog && (
          <>
            {" "}
            {taskSelected === "Journo Assist" && (
              <div className="col-md-8">
                <div>
                  <div class="mb-3">
                    {/* <label
                      for="exampleFormControlTextarea1"
                      className="form-label fw-bold fs-5"
                    >
                      File Your Report Here
                    </label> */}
                    {/* <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="Please ingest your inputs here"
                      rows="5"
                      value={inputAutoText}
                      onChange={(e) => setInputAutoText(e.target.value)}
                    ></textarea> */}
                    <div className="card">
                      <h5>File Your Report Here </h5>
                      <div className="d-flex align-items-center">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            className="form-control p-3 jurno-input"
                            placeholder="Please ingest your inputs here"
                            aria-label="Please ingest your inputs here"
                            aria-describedby="basic-addon1"
                            value={inputAutoText}
                            onChange={(e) => setInputAutoText(e.target.value)}
                          />
                        </div>
                        <button className="btn  bg-white mb-3 jurno-btn">
                          <img src={sendBtn} alt="Send" className="send-logo" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-primary me-3 optimise-btn"
                      onClick={handleTextRephrase}
                      id="test1"
                    >
                      Rephrase
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary optimise-btn me-3"
                      {...(generateTextLimit === ""
                        ? { "data-bs-toggle": "modal" }
                        : {})}
                      {...(generateTextLimit === ""
                        ? { "data-bs-target": "#exampleModalss" }
                        : {})}
                      onClick={() => {
                        if (generateTextLimit === "") {
                          setShowModal(true);
                        } else {
                          handleTextGenerateCompletion();
                        }
                      }}
                      id="test1"
                    >
                      <span className="d-flex align-items-center">
                        <span className=""> Analysis</span>
                        <img
                          src={analysis}
                          alt="Analysis Image"
                          className="ms-1"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary optimise-btn"
                      {...(generateTextLimit === ""
                        ? { "data-bs-toggle": "modal" }
                        : {})}
                      {...(generateTextLimit === ""
                        ? { "data-bs-target": "#exampleModalss" }
                        : {})}
                      onClick={() => {
                        if (generateTextLimit === "") {
                          setShowModal(true);
                        } else {
                          handleTextAutoCompletion();
                        }
                      }}
                      id="test1"
                    >
                      Generate
                    </button>
                    <div
                      className={`modal fade ${showModal ? "show" : ""}`}
                      id="exampleModalss"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden={!showModal}
                      data-bs-backdrop={showModal ? true : "static"} // Prevents modal from being closed when clicking outside
                      data-bs-keyboard={showModal ? true : false} // Prevents modal from being closed with the keyboard
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Warning
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <h6 className="modal-title" id="exampleModalLabel">
                              Please Select the text limit from the left panel
                            </h6>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

                  <div className="d-flex justify-content-center mt-3">
                    {!autoLoading && (source11 || source12) && (
                      <>
                        <div className="row">
                          <div className="d-flex justify-content-center mb-3">
                            <button
                              type="button"
                              className={`btn btn-primary  ${
                                activeButton === "option1" ? "active" : ""
                              }`}
                              style={{
                                backgroundColor:
                                  activeButton === "option1" ? "" : "white",
                                color: activeButton === "option1" ? "" : "blue",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                boxShadow: "none",
                              }}
                              onClick={() => handleButtonClick("option1")}
                            >
                              Option 1
                            </button>
                            <button
                              type="button"
                              className={`btn btn-primary ${
                                activeButton === "option2" ? "active" : ""
                              }`}
                              style={{
                                backgroundColor:
                                  activeButton === "option2" ? "" : "white",
                                color: activeButton === "option2" ? "" : "blue",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                boxShadow: "none",
                              }}
                              onClick={() => handleButtonClick("option2")}
                            >
                              Option 2
                            </button>
                          </div>
                          {activeButton === "option1" && (
                            <div className="col-md-12">
                              {/* <h3 className="title-text fs-5">OpenAI</h3> */}
                              <div
                                className="custom-autotextarea overflow-auto"
                                contentEditable={false} // Set to true if you want to allow editing
                                suppressContentEditableWarning={true}
                              >
                                <p>
                                  {" "}
                                  {source11 && (
                                    <>
                                      {source11
                                        .split("\n")
                                        .map((paragraph, index) => (
                                          <div
                                            key={index}
                                            style={{ marginBottom: "10px" }}
                                          >
                                            {paragraph.trim() && (
                                              <>
                                                <span
                                                  style={{ marginLeft: "5px" }}
                                                >
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
                          {activeButton === "option2" && (
                            <div className="col-md-12">
                              {/* <h3 className="title-text fs-5">Gemini</h3> */}
                              <div
                                className="custom-autotextarea-title overflow-auto"
                                contentEditable={false} // Set to true if you want to allow editing
                                suppressContentEditableWarning={true}
                              >
                                <p>
                                  {" "}
                                  {source12 ? (
                                    <>
                                      {source12
                                        .split("\n")
                                        .map((paragraph, index) => (
                                          <div
                                            key={index}
                                            style={{ marginBottom: "10px" }}
                                          >
                                            {paragraph.trim() && (
                                              <>
                                                <span
                                                  style={{ marginLeft: "5px" }}
                                                >
                                                  {paragraph}
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        ))}
                                    </>
                                  ) : (
                                    "Gemini AI did not find the response for the given input"
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  {/* <div>
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
                  </div> */}

                  <div className="d-flex justify-content-center mt-3">
                    {!autoLoading && (source5, source6) && (
                      <>
                        <div className="row">
                          <div className="d-flex justify-content-center mb-3">
                            <button
                              type="button"
                              className={`btn btn-primary  ${
                                activeButton === "option1" ? "active" : ""
                              }`}
                              style={{
                                backgroundColor:
                                  activeButton === "option1" ? "" : "white",
                                color: activeButton === "option1" ? "" : "blue",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                boxShadow: "none",
                              }}
                              onClick={() => handleButtonClick("option1")}
                            >
                              Option1
                            </button>
                            <button
                              type="button"
                              className={`btn btn-primary ${
                                activeButton === "option2" ? "active" : ""
                              }`}
                              style={{
                                backgroundColor:
                                  activeButton === "option2" ? "" : "white",
                                color: activeButton === "option2" ? "" : "blue",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                boxShadow: "none",
                              }}
                              onClick={() => handleButtonClick("option2")}
                            >
                              Option2
                            </button>
                          </div>
                          {activeButton === "option1" && (
                            <div className="col-md-12">
                              {/* <h3 className="title-text fs-5">
                                AutoComplete Text
                              </h3> */}
                              <div
                                className="custom-autotextarea overflow-auto"
                                contentEditable={false} // Set to true if you want to allow editing
                                suppressContentEditableWarning={true}
                              >
                                <p>
                                  {" "}
                                  {source5 && (
                                    <>
                                      {source5
                                        .split("\n")
                                        .map((paragraph, index) => (
                                          <div
                                            key={index}
                                            style={{ marginBottom: "10px" }}
                                          >
                                            {paragraph.trim() && (
                                              <>
                                                <span
                                                  style={{ marginLeft: "5px" }}
                                                >
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
                          {activeButton === "option2" && (
                            <div className="col-md-12">
                              {/* <h3 className="title-text fs-5">Title</h3> */}
                              <div
                                className="custom-autotextarea-title overflow-auto"
                                contentEditable={false} // Set to true if you want to allow editing
                                suppressContentEditableWarning={true}
                              >
                                <p>
                                  {" "}
                                  {source6 && (
                                    <>
                                      {source6
                                        .split("\n")
                                        .map((paragraph, index) => (
                                          <div
                                            key={index}
                                            style={{ marginBottom: "10px" }}
                                          >
                                            {paragraph.trim() && (
                                              <>
                                                <span
                                                  style={{ marginLeft: "5px" }}
                                                >
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
                        </div>
                      </>
                    )}
                  </div>
                  <div className="d-flex justify-content-center">
                    {!autoLoading && source7 && (
                      <div className="box">
                        <h3 className="title-text fs-5">Rephrased Text</h3>
                        <div
                          className="custom-autotextarea overflow-auto "
                          contentEditable={false} // Set to true if you want to allow editing
                          suppressContentEditableWarning={true}
                        >
                          <p>
                            {" "}
                            {source7 && (
                              <>
                                {source7.split("\n").map((paragraph, index) => (
                                  <div
                                    key={index}
                                    style={{ marginBottom: "10px" }}
                                  >
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
                  </div>
                  {activeFunction === "handleTextAutoCompletion" && (
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger save-btn mt-3"
                        onClick={() =>
                          sendDataToAPI("handleTextAutoCompletion")
                        }
                      >
                        Save
                      </button>
                      <div class="input-group mt-3 ms-5 w-50">
                        <input
                          type="text"
                          class="form-control"
                          placeholder={inputAutoText
                            .split(" ")
                            .slice(0, 5)
                            .join(" ")}
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={inputValue}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                  {activeFunction === "handleTextGenerateCompletion" && (
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger save-btn mt-3"
                        onClick={() =>
                          sendDataToAPI("handleTextGenerateCompletion")
                        }
                      >
                        Save Analysis
                      </button>
                      <div class="input-group mt-3 ms-5 w-50">
                        <input
                          type="text"
                          class="form-control"
                          placeholder={inputAutoText
                            .split(" ")
                            .slice(0, 5)
                            .join(" ")}
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={inputValue}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                  {activeFunction === "handleTextRephrase" && (
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger save-btn mt-3"
                        onClick={() => sendDataToAPI("handleTextRephrase")}
                      >
                        Save Rephrase
                      </button>
                      <div class="input-group mt-3 ms-5 w-50">
                        <input
                          type="text"
                          class="form-control"
                          placeholder={inputAutoText
                            .split(" ")
                            .slice(0, 5)
                            .join(" ")}
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          value={inputValue}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {taskSelected == "Classified Ads" && (
              <>
                <Classified
                // rephraseFunction={handleTextRephrase}
                // inputAutoText={inputAutoText}
                // handleInputChange={handleInputAutoText}
                // autoLoading={autoLoading}
                />
              </>
            )}
            {taskSelected !== "Journo Assist" &&
              taskSelected !== "Classified Ads" && (
                <div className="col-md-8">
                  <div className="container mt-2 border p-2 tab d-flex flex-column">
                    <div className="btn-group d-flex flex-wrap" role="group">
                      <button
                        type="button"
                        className={`btn   option-btn me-2 tab-btn fw-bold  ${
                          selectedEngine === "claud" && source1 ? "active" : ""
                        }`}
                        onClick={() => handleLinkClick("claud")}
                      >
                        Suggestion 1
                      </button>
                      <button
                        type="button"
                        className={`btn  option-btn me-2 tab-btn fw-bold ${
                          selectedEngine === "palm" ? "active" : ""
                        }`}
                        onClick={() => handleLinkClick("palm")}
                      >
                        Suggestion 2
                      </button>
                      <button
                        type="button"
                        className={`btn  option-btn me-2 tab-btn fw-bold ${
                          selectedEngine === "generate" ? "active" : ""
                        }`}
                        onClick={() => handleLinkClick("generate")}
                      >
                        Suggestion 3
                      </button>
                      <button
                        type="button"
                        className={`btn  option-btn  tab-btn fw-bold me-2 ${
                          selectedEngine === "summary" ? "active" : ""
                        }`}
                        onClick={() => handleLinkClick("summary")}
                      >
                        Suggestion 4
                      </button>

                      <button
                        type="button"
                        className={`btn  option-btn tab-btn fw-bold  ${
                          selectedEngine === "google" ? "active" : ""
                        }`}
                        onClick={() => handleLinkClick("google")}
                      >
                        Suggestion 5
                      </button>
                    </div>
                  </div>

                  <div>
                    {!claudLoading &&
                      selectedEngine === "claud" &&
                      !source1 && (
                        <div className="banner">
                          <h3>Hello editor! Welcome to BCCL AI console.</h3>
                          <h3>Over to You...</h3>
                        </div>
                      )}
                  </div>

                  <div className="d-flex justify-content-center  ">
                    <div>
                      {claudLoading && selectedEngine === "claud" && (
                        <div className="container mt-4">
                          <div className="row">
                            <div className="col-md-12">
                              <div
                                class="spinner-border text-dark"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {!claudLoading && selectedEngine === "claud" && source1 && (
                      <div
                        className="custom-textarea mt-5 w-75 overflow-auto"
                        contentEditable={false} // Set to true if you want to allow editing
                        suppressContentEditableWarning={true}
                      >
                        <p>
                          {" "}
                          {source1 && (
                            <>
                              {source1.split("\n").map((paragraph, index) => (
                                <div
                                  key={index}
                                  style={{ marginBottom: "10px" }}
                                >
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
                    )}

                    <div>
                      {palmLoading && selectedEngine === "palm" && (
                        <div className="container mt-4">
                          <div className="row">
                            <div className="col-md-12">
                              <div
                                class="spinner-border text-dark"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {!palmLoading && selectedEngine === "palm" && source2 && (
                      <div
                        className="custom-textarea mt-5 w-75 overflow-auto"
                        contentEditable={false} // Set to true if you want to allow editing
                        suppressContentEditableWarning={true}
                      >
                        <p>
                          {" "}
                          {source2 && (
                            <>
                              {source2.split("\n").map((paragraph, index) => (
                                <div
                                  key={index}
                                  style={{ marginBottom: "10px" }}
                                >
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
                    )}

                    <div>
                      {gptLoading && selectedEngine === "generate" && (
                        <div className="container mt-4">
                          <div className="row">
                            <div className="col-md-12">
                              <div
                                class="spinner-border text-dark"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {!gptLoading &&
                      selectedEngine === "generate" &&
                      source3 && (
                        <div
                          className="custom-textarea mt-5 w-75 overflow-auto"
                          contentEditable={false} // Set to true if you want to allow editing
                          suppressContentEditableWarning={true}
                        >
                          <p>
                            {" "}
                            {source3 && (
                              <>
                                {source3.split("\n").map((paragraph, index) => (
                                  <div
                                    key={index}
                                    style={{ marginBottom: "10px" }}
                                  >
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
                      )}

                    <div>
                      {summaryLoading && selectedEngine === "summary" && (
                        <div className="container mt-4">
                          <div className="row">
                            <div className="col-md-12">
                              <div
                                class="spinner-border text-dark"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {!summaryLoading &&
                      selectedEngine === "summary" &&
                      source4 && (
                        <div
                          className="custom-textarea mt-5 w-75 overflow-auto"
                          contentEditable={false} // Set to true if you want to allow editing
                          suppressContentEditableWarning={true}
                        >
                          <p>
                            {" "}
                            {source4 && (
                              <>
                                {source4.split("\n").map((paragraph, index) => (
                                  <div
                                    key={index}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    {paragraph.trim() && (
                                      <>
                                        <span style={{ marginLeft: "5px" }}>
                                          {paragraph}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                ))}
                                <div className="ai-img">
                                  <p>
                                    --------------------------------------------------------------------------
                                  </p>
                                  <h3>AI-IMAGE</h3>
                                  <img
                                    src={imageURL}
                                    alt="Generated "
                                    className="ai-image"
                                  />{" "}
                                </div>
                              </>
                            )}
                          </p>
                        </div>
                      )}

                    <div>
                      {googleLoading && selectedEngine === "google" && (
                        <div className="container mt-4">
                          <div className="row">
                            <div className="col-md-12">
                              <div
                                class="spinner-border text-dark"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {!googleLoading &&
                      selectedEngine === "google" &&
                      source8 && (
                        <div
                          className="custom-textarea mt-5 w-75 overflow-auto"
                          contentEditable={false}
                          suppressContentEditableWarning={true}
                        >
                          <p>
                            {" "}
                            {source8.length > 0 && (
                              <>
                                {source8.map((result, index) => (
                                  <div
                                    key={index}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    {result.title && (
                                      <>
                                        <span style={{ marginLeft: "5px" }}>
                                          {result.title}
                                          <p>{result.snippet}</p>
                                          <a
                                            href={result.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            Link
                                          </a>
                                        </span>
                                      </>
                                    )}
                                  </div>
                                ))}
                              </>
                            )}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default Textgenerate;
