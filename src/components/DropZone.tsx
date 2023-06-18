import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone: React.FC<{setFile:Dispatch<SetStateAction<File | null>>}> = ({setFile}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [setFile]);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
  });

  return (
    <div className="w-full p-4">
      <div {...getRootProps()} >
        <input {...getInputProps()} />
        <div
          className={
            "p-2 flex flex-col justify-center items-center border-dashed border-teal-950 h-full border-2 rounded-lg " +
            (isDragAccept === true ? "border-green-800 rounded-lg" : "") +
            (isDragReject === true ? "border-red-800" : "")
          }
          style={{
            borderWidth: isDragAccept || isDragReject ? "4px" : "2px",
          }}
        >
          <img src="../assets/folder.png" alt="folder" className="w-16 h-16" />
          {isDragReject ? (
            <p className="font-mono text-lg">
              "Sorry! This File Format is Not supported"
            </p>
          ) : (
            <div>
              <p className="font-mono text-lg">Drag & Drop Files</p>
              <span className="font-mono text-sm">Only specific file types allowed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropZone;
