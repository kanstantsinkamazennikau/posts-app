"use client";
import NavigationButtons from "@/components/Header/NavigationButtons";
import SkeletonPulseButton from "@/components/SkeletonPulseButton";
import close from "@/images/close.svg";
import menu from "@/images/menu.svg";
import useLoginModal from "@/store/useLoginModal";
import useRegisterModal from "@/store/useRegisterModal";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const [isShowSideMenu, setIsShowSideMenu] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  useEffect(() => {
    const handleClickOutsideSideMenu = (event: MouseEvent) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current!.contains(event.target as HTMLElement)
      ) {
        setIsShowSideMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutsideSideMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideSideMenu);
    };
  }, []);

  return (
    <header className="flex justify-between items-center p-2 relative">
      <Link href="/" className="flex justify-center items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <span className="text-center head_text">Posts App</span>
      </Link>

      {!session?.user && status === "loading" && <SkeletonPulseButton />}
      {!session?.user && status === "unauthenticated" && (
        <div className="flex gap-2">
          <button
            type="button"
            className="outline_btn"
            onClick={() => loginModal.setOpen()}
          >
            Sign In
          </button>
          <button
            type="button"
            className="outline_btn"
            onClick={() => registerModal.setOpen()}
          >
            Sign Up
          </button>
        </div>
      )}

      {/* //Desktop */}
      {session?.user && (
        <div className="sm:flex gap-1 hidden">
          <NavigationButtons signOutFunction={signOut} />
        </div>
      )}

      {/* //Mobile */}
      {session?.user && (
        <div className="sm:hidden gap-1 flex" ref={sideMenuRef}>
          <Image
            src={isShowSideMenu ? close : menu}
            alt="logo"
            width={40}
            height={40}
            onClick={() => {
              setIsShowSideMenu(!isShowSideMenu);
            }}
            className="z-10 cursor-pointer"
          />
          {isShowSideMenu && (
            <div className="sidemenu animate-slide">
              <NavigationButtons signOutFunction={signOut} isSideMenu />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
