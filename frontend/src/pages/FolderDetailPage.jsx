import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FileCard from "../components/FileCard";
import { toast } from "react-hot-toast";

export default function FolderDetailPage() {
  const { folderId } = useParams();
  const navigate = useNavigate();

  const [folder, setFolder] = useState({});
  const [files, setFiles] = useState([]);
  const [fileUpload, setFileUpload] = useState(null); // Is there a file waiting to be uploaded?
  const [uploading, setUploading] = useState(false); // Is there a file being uploaded?
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (folder.name) {
      document.title = `File Manager | ${folder.name}`;
    }
  }, [folder.name]);

  useEffect(() => {
    // Retrieve all folders and files already stored in the database
    // for this user
    const fetchFolder = async () => {
      try {
        const res = await fetch(
          `https://filekeep-backend-production.up.railway.app/folders/${folderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        // Check authentication
        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setFolder(data.folder);
        setFiles(data.folder.files || []);
      } catch (err) {
        setErrorMsg("Upload failed. Please try again.");
        console.error("Error fetching folder:", err.message);
      }
    };

    fetchFolder();
  }, [folderId]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async (e) => {
    // Dont reload page
    e.preventDefault();

    // Dont attempt upload if no file has been selected
    if (!fileUpload) {
      setErrorMsg("Please select a file to upload.");
      return;
    }

    setUploading(true);

    // If no folder id is found dont try to upload file
    if (!folderId) {
      setErrorMsg("Missing folder ID. Try refreshing the page.");
      return;
    }

    const formData = new FormData();
    formData.append("file-upload", fileUpload);
    formData.append("folderId", folderId);

    try {
      const res = await fetch(
        "https://filekeep-backend-production.up.railway.app/upload",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (res.status === 401) {
        navigate("/login");
        return;
      }
      if (res.status === 413) {
        const { error, message } = await res.json();
        toast.error(error || message || "File too large");
        return;
      }
      if (res.status === 429) {
        toast.error("Daily Upload Limit Reached.");
        return;
      }

      const data = await res.json();

      // All files + the new file
      setFiles((prev) => [...prev, data.file]);
      setFileUpload(null);
      toast.success("File uploaded!");
    } catch (err) {
      console.error("Error uploading file:", err.message);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const res = await fetch(
        `https://filekeep-backend-production.up.railway.app/folders/${folderId}/${fileId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      // Returns all files except the one that was deleted
      if (res.ok) {
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
        toast.success("File deleted.");
      } else {
        toast.error("Failed to delete file.");
      }
    } catch (err) {
      toast.error("Failed to delete file.");
      console.error("Error deleting file:", err.message);
    }
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="w-full">
      <div className="flex flex-wrap justify-center items-center text-nowrap w-full bg-blue-50 border-b border-blue-200 py-6 px-6 mb-6 shadow-lg">
        <h1 className="text-lg sm:text-2xl md:text-3xl text-center font-bold text-gray-800 mx-1 sm:mx-4 lg:mx-10">
          Folder: {folder.name}
        </h1>
        {errorMsg && (
          <div className="text-red-500 font-medium text-center">{errorMsg}</div>
        )}
        <form
          onSubmit={handleUpload}
          className="flex items-center justify-center gap-4 mx-1 sm:mx-4 lg:mx-10"
        >
          <label className="px-1 sm:px-4 py-1 md:py-2 rounded cursor-pointer border border-black">
            <span className="ml-1 mr-4 italic text-sm md:text-md text-gray-600">
              {fileUpload ? fileUpload.name : "No file chosen"}
            </span>
            <span className="bg-gray-200 rounded px-1 sm:px-2 py-.5 md:py-1 text-sm">
              Choose File
            </span>
            <input
              type="file"
              onChange={(e) => {
                setFileUpload(e.target.files[0]);
                setErrorMsg(""); // Clear error on new input
              }}
              className="hidden"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-1 sm:px-4 py-1 md:py-2 rounded hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      {files.length === 0 ? (
        <p className="text-gray-500">This folder has no files yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 px-2 mx-2">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              folderId={folderId}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
