import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-sky-400 border-b shadow-md sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <p className="text-2xl font-medium">
            <Link href={"/"}>Student Management System</Link>
          </p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[3px] border-b-transparent`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[3px] border-b-transparent first-letter`}
            >
              <Link href="/add-student">Add Students</Link>
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[3px] border-b-transparent`}
            >
              <Link href="/student-details">Student Details</Link>
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[3px] border-b-transparent`}
            >
              <Link href="/sign-in">Sign in</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
