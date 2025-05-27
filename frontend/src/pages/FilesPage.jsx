import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileCard from "../components/FileCard";

export default function FilesPage() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "FileKeep | Your Files";
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch("http://localhost:3000/files", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

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
      const res = await fetch(`http://localhost:3000/files/${fileId}`, {
        method: "DELETE",
        credentials: "include",
      });

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
    <div className="p-6 mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        All Files
      </h1>

      {files.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven't uploaded any files yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6">
          {files.map((file) => (
            <FileCard key={file.id} file={file} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
