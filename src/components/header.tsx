import Link from "next/link";
import Favorites from "./favorites";

export const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-base-200 shadow-xl">
        <nav className="container mx-auto flex justify-between p-6">
          <Link className="text-xl" href="/">
            Users Management
          </Link>

          <ul className="flex items-center gap-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Favorites />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
