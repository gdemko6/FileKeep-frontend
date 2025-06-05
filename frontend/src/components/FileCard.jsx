import React from "react";
import formatFilename from "../utils/formatText";
import { FiTrash2, FiDownload } from "react-icons/fi";

export default function FileCard({ file, onDelete }) {
  return (
    <li className="flex justify-between items-center border border-blue-200 px-3 py-2 rounded-lg shadow-sm bg-white">
      <span
        title={file.filename}
        className="text-gray-800 font-medium italic truncate max-w-[60%]"
      >
        {formatFilename(file.filename)}
      </span>

      <div className="flex items-center space-x-4">
        {/* Download button */}
        <a
          href={`https://filekeep-backend-production.up.railway.app/files/${file.id}/download`}
          title="Download"
          className="text-blue-500 hover:text-blue-700"
        >
          <FiDownload size={18} />
        </a>

        {/* Delete button */}
        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this file?"
            );
            confirmed ? onDelete(file.id) : null;
          }}
          title="Delete"
          className="text-red-500 hover:text-red-700"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </li>
  );
}
