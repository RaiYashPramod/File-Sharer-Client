import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import UploadedFiles from "../components/UploadedFiles";
import fileDownloadImage from "../assets/filedownload.png";
import fileDownload from "js-file-download";
const apiUrl = import.meta.env.VITE_API_BASE_URL;


const fetchDownloadData = async (id: string) => {
  const { data } = await axios(`${apiUrl}/api/files/${id}`);
  console.log(apiUrl);
  const file = data;
  console.log(file);
  return file;

};

const DownloadPage = () => {
  const { id } = useParams<{id: string}>();
  const { data, isLoading, error } = useQuery(["download", id], () =>
    fetchDownloadData(id || '')
  );

  const handleDownload = async () => {
    const { data: fileData }  = await axios.get(
      `${apiUrl}/api/files/${id}/download`,{
        responseType: 'blob'
      }
    );

    fileDownload(fileData, data.name);
  };

  if (isLoading) {
    return (
      <div
        style={{ backgroundColor: "#0b3948" }}
        className="h-screen flex flex-col justify-center items-center"
      >
        <h2
          style={{ color: "#689689" }}
          className="font-extrabold text-8xl -mt-60 h-32 transition-all duration-300 ease-in-out hover:text-9xl animate-pulse delay-100"
        >
          Loading
          <span className="inline-flex">
            <span className="dot animate-pulse delay-100">.</span>
            <span className="dot animate-pulse delay-200">.</span>
            <span className="dot animate-pulse delay-300">.</span>
          </span>
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ backgroundColor: "#0b3948" }}
        className="h-screen flex flex-col justify-center items-center"
      >
        <h2
          style={{ color: "#689689" }}
          className="font-extrabold text-6xl -mt-60 h-32 transition-all duration-300 ease-in-out hover:text-7xl"
        >
          Opps!! This Link is broken.
        </h2>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#0b3948" }}
      className="h-screen flex flex-col justify-center items-center"
    >
      <img src={fileDownloadImage} alt="" className="w-28 h-28" />
      <h3
        style={{ color: "#e5dada" }}
        className="font-mono text-center mt-4 text-xl m-5"
      >
        Click Download to Download the below file
      </h3>
      <div className="flex flex-col items-center justify-center py-3 space-y-4 w-96 rounded-lg p-4 bg-teal-600">
        <UploadedFiles
          file={{
            name: data.name,
            format: data.format,
            sizeInBytes: data.sizeInBytes,
          }}
        />
        <button className="button" onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default DownloadPage;
