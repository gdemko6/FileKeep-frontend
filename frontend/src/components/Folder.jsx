import { FaFolder } from "react-icons/fa";
import { Trash2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Folder({ folder, deleteFolder }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/folders/${folder.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="min-h-16 rounded-md border border-gray-200 shadow-sm flex flex-col pl-4 justify-center hover:shadow-md transition transform hover:scale-105 hover:cursor-pointer"
    >
      <div className="flex items-center gap-4 text-blue-500 text-2xl">
        <FaFolder />
        <span className="text-gray-800 text-lg font-medium">{folder.name}</span>
        <Trash2
          className="w-5 h-5 mr-5 ml-auto text-red-500 hover:text-red-700"
          onClick={(e) => {
            e.stopPropagation();
            const confirmed = window.confirm(
              `Are you sure you want to delete "${folder.name}"?`
            );
            confirmed ? deleteFolder(folder.id) : null;
          }}
        />
      </div>
    </div>
  );
}
