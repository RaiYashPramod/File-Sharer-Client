import { useState } from "react";
import DropZone from "../components/DropZone";
import UploadedFiles from "../components/UploadedFiles";
import axios from "axios";
import DownloadFile from "../components/DownloadFile";

axios.defaults.baseURL = "http://localhost:8080/";

const Index = () => {
  const [file, setFile] = useState(null) as any;
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
  >("Upload");

  const handleUpload = async () => {
    if (uploadState === "Uploading") return;
    setUploadState("Uploading");
    const formData = new FormData();
    formData.append("myfile", file);
    try {
      const { data } = await axios({
        method: "post",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setId(data.id);
      setDownloadPageLink(data.downloadPageLink);
      setUploadState("Uploaded");
    } catch (error: any) {
      console.log(error.response.data);
      setUploadState("Upload Failed");
    }
  };

  const handleUploadNewFile = () => {
    setFile(null);
    setDownloadPageLink(null);
  };
  return (
    <div
      style={{ backgroundColor: "#0b3948" }}
      className="h-screen flex flex-col justify-center items-center"
    >
      <h2
        style={{ color: "#689689" }}
        className="font-extrabold text-8xl -mt-60 h-32 transition-all duration-300 ease-in-out hover:text-9xl"
      >
        File Sharer
      </h2>
      <h3
        style={{ color: "#e5dada" }}
        className="font-mono text-center mt-4 text-xl m-5"
      >
        Select the file from below
      </h3>
      <div className="flex flex-col items-center justify-center w-96 h-96 rounded-lg p-4 bg-teal-600">
        {!downloadPageLink && <DropZone setFile={setFile} />}
        {file && (
          <>
            <UploadedFiles
              file={{
                format: file.type.split("/")[1],
                name: file.name,
                sizeInBytes: file.size,
              }}
            />
            {!downloadPageLink && file && (
              <button
                onClick={handleUpload}
                className="w-44 bg-teal-800 text-yellow-50 focus:outline-none p-2 my-5 rounded-md items-center"
              >
                {uploadState}
              </button>
            )}
            {downloadPageLink && (
              <div className="">
                <DownloadFile downloadPageLink={downloadPageLink} />
                <button
                  onClick={handleUploadNewFile}
                  className="w-44 bg-teal-800 text-yellow-50 focus:outline-none p-2 my-5 rounded-md items-center"
                >
                  Upload New File
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
