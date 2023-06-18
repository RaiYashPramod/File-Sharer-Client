import { fileSizeFormatter } from "../libs/fileSizeFormatter";
import { IFile } from "../libs/types";

const UploadedFiles: React.FC<{ file: IFile }> = ({
  file: { format, name, sizeInBytes },
}) => {
  return (
    <div className="flex items-center p-4 my-2 w-full">
      <img src={`../assets/${format}.png`} alt="" className="h-14 w-14 mx-2" />
      <div className="flex items-start flex-col">
        <span className="text-lg font-mono">{name}</span>
        <span>{fileSizeFormatter(sizeInBytes)}</span>
      </div>
    </div>
  );
};

export default UploadedFiles;
