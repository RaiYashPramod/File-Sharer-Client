
interface DownloadFileProps {
  downloadPageLink: string;
}

const DownloadFile: React.FC<DownloadFileProps> = ({ downloadPageLink }) => {
  return (
    <div className="p-1">
      <h1 className="my-2 text-lg font-mono">Share the Link below</h1>
      <div className="flex space-x-3">
        <a className="break-all">{downloadPageLink}</a>
        <img
          src="\assets\copy.png"
          alt=""
          className="w-8 h-8 object-contain cursor-pointer"
          onClick={()=>navigator.clipboard.writeText(downloadPageLink)}
        />
      </div>
    </div>
  );
};

export default DownloadFile;
