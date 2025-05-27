import React from "react";
import formatFilename from "../utils/formatText";

export default function FileCard({ file, onDelete }) {
  return (
    <li className="flex justify-between items-center border border-blue-200 py-1 px-1.5 rounded shadow-sm bg-white">
      <span
        title={file.filename}
        className="text-gray-800 font-bold italic mr-5 pl-1"
      >
        {formatFilename(file.filename)}
      </span>

      <div className="space-x-4">
        {/* Download file */}
        <a
          href={`http://localhost:3000/files/${file.id}/download`}
          className="text-blue-500 hover:underline"
        >
          Download
        </a>

        {/* Delete function is made and passed as a prop from FolderDetailPage */}
        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this file?"
            );
            confirmed ? onDelete(file.id) : null;
          }}
          className="text-red-500 cursor-pointer hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
