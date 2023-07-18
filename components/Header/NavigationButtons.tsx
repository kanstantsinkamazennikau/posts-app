import { headerNavigationLinks } from "@/constants";
import Link from "next/link";

interface NavigationButtonsProps {
  isSideMenu?: boolean;
  signOutFunction: Function;
}

export default function NavigationButtons({
  isSideMenu = false,
  signOutFunction,
}: NavigationButtonsProps) {
  return (
    <>
      {headerNavigationLinks.map(({ title, link }) => {
        return link ? (
          <Link
            href={link}
            className={isSideMenu ? "sidemenu_item" : "black_btn"}
            key={title}
          >
            {title}
          </Link>
        ) : (
          <button
            className={isSideMenu ? "sidemenu_item" : "outline_btn"}
            key={title}
            onClick={() => signOutFunction()}
          >
            {title}
          </button>
        );
      })}
    </>
  );
}
