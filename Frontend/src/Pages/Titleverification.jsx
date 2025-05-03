import React, { useState } from "react";
import axios from "axios";
import upload from '../../public/assets/upload.png'
const Titleverification = () => {
  const [files, setFiles] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Handle file upload and submission
  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await axios.post("http://localhost:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the state with the extracted text from the response
      setExtractedData(response.data.data);

      // Open the modal automatically with the extracted text
      setCurrentText(response.data.data[0].extracted_text);
      setTranslatedText(""); // Reset translated text 
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  
  const handleTranslate = async () => {
    try {
      const response = await axios.post("http://localhost:8000/translate/", {
        text: currentText,
      });

      console.log(response.data);  // Add this to inspect the response structure

      if (response.data.translated) {
        let formattedTranslation = "";

        if (typeof response.data.translated === "object") {
          // Convert object to string format (e.g. key: value)
          for (const [key, value] of Object.entries(response.data.translated)) {
            formattedTranslation += `${key}: ${value}\n`;
          }
        } else {
          formattedTranslation = response.data.translated;
        }

        setTranslatedText(formattedTranslation);
      } else {
        setTranslatedText("Translation failed.");
      }
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("An error occurred during translation.");
    }
  };



  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentText("");
  };

  // Copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentText);
    alert("Text copied to clipboard!");
  };

  return (
    <>
    <div className=" h-220 flex flex-col items-center gap-11 pt-3">
        <h1><span className="text-red-600 text-5xl">U</span>pload your images according to the following instructions</h1>
      <div className=" w-250">
        <span className="text-[20px] font-extralight">Instructions:</span>
        <ol className=" p-1">
          <li>1.You can upload multiple images.</li>
          <li>2.Only upload images of jpeg,jpg and png format.</li>
          <li>3.Try to upload clear images, handwritten texts will be readed partially.</li>
          <li>4.Rotated images can be uploaded since auto rotation is enabled. </li>
          <li>5.Only upload the important pages of the Deed. </li>
        </ol>
      </div>  
        <div className="border  rounded-2xl w-250 h-60 flex items-center justify-center gap-6" >
          <img className="w-19" src={upload}></img>
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >Click to upload your images</label>
          <input className="hidden" id="file-upload" type="file" multiple onChange={handleFileChange} />
          {files.length > 0 && (
            <p>Selected: {Array.from(files).map((file) => file.name).join(", ")}</p>
          )}
        </div>
    
        <button className=" w-40  cursor-pointer h-12 px-4 py-2 bg-blue-600/80 text-white rounded-3 shadow hover:bg-blue-700 transition duration-300" onClick={handleUpload}>Upload</button>

      {/* Modal for displaying extracted text */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <center><h2>Extracted Text</h2></center>
            <textarea readOnly value={currentText || translatedText}  rows="19" cols="60" className="border text-center"/>
            <br />
              <button onClick={copyToClipboard} className="border hover:bg-black/5 rounded-2 ">Copy</button>
              <button onClick={handleTranslate}  className="border  bg-blue-600 text-[white] rounded-2 hover:bg-blue-600/90">Translate</button>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 15px;
          width: 90%;
          max-width: 650px;
        }
        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 30px;
          cursor: pointer;
        }
        button {
          margin-top: 10px;
          padding: 10px;
          border: none;
          cursor: pointer;
        }
        textarea {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          font-family: Arial, sans-serif;
        }
      `}</style>
    </div>
    </>
  );
};

export default Titleverification;
