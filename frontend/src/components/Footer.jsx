import formatText from "../utils/formatText";

export default function Footer({ user }) {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-blue-600 text-white py-4 px-6 text-sm flex justify-between items-center z-50">
      <span>© 2025 FileKeep</span>
      {user && (
        <span className="italic" title={user.email}>
          Logged in as: {formatText(user.email, 20)}
        </span>
      )}
    </footer>
  );
}
