import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Folder from "../components/Folder";

export default function FoldersPage() {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    document.title = "FileKeep | Your Folders";
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch("http://localhost:3000/folders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setFolders(data.folders);
      } catch (err) {
        console.error("Error fetching folders:", err.message);
      }
    };
    fetchFolders();
  }, []);

  const handleModalStatus = () => {
    setShowForm((prev) => !prev);
    setNewFolderName("");
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: newFolderName }),
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();

      // Add new folder to state
      setFolders((prev) => [...prev, data.folder]);
      handleModalStatus(); // hide form
    } catch (err) {
      console.error("Error creating folder:", err.message);
    }
  };

  const handleDeleteFolder = async (folderIdToDelete) => {
    try {
      const res = await fetch(
        `http://localhost:3000/folders/${folderIdToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      setFolders((prev) =>
        prev.filter((folder) => folder.id !== folderIdToDelete)
      );
    } catch (err) {
      console.error("Error deleting folder:", err.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-6 pt-5">
        <h1 className="text-3xl font-bold text-gray-800">Folders</h1>
        <button
          onClick={handleModalStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          New Folder
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Folder</h2>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <input
                type="text"
                maxLength={20}
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                placeholder="Enter folder name"
                required
              />

              <p className="text-sm text-gray-500 mt-1">
                {newFolderName.length} / 20 characters
              </p>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleModalStatus}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between w-full gap-10 px-6 pt-10 pb-30">
        {folders &&
          folders.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              deleteFolder={handleDeleteFolder}
            />
          ))}
      </div>
    </div>
  );
}
