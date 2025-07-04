import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileCard from "../components/FileCard";

export default function FilesPage() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "File Manager | Your Files";
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          "https://filekeep-backend-production.up.railway.app/files",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const data = await res.json();

        setFiles(data.files || []);
      } catch (err) {
        console.error("Error fetching files:", err.message);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (fileId) => {
    try {
      const res = await fetch(
        `https://filekeep-backend-production.up.railway.app/files/${fileId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      if (res.ok) {
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
      }
    } catch (err) {
      console.error("Error deleting file:", err.message);
    }
  };

  return (
    <div className="mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 bg-blue-50 border-b border-blue-200 py-6 px-6 mb-6 shadow-lg">
        All Files
      </h1>

      {files.length === 0 ? (
        <div>
          <p className="text-gray-500 text-center">
            You haven't uploaded any files yet.
          </p>
          <p className="text-center">
            {" "}
            Go to{" "}
            <a className="text-blue-600 hover:text-blue-300" href="/folders">
              Folders
            </a>{" "}
            to upload files.{" "}
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 px-2 mx-2">
          {files.map((file) => (
            <FileCard key={file.id} file={file} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
