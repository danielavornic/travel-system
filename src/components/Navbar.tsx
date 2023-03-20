/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FiMenu } from "react-icons/fi";

const menuItems = [
  {
    name: "Routes",
    href: "/?tab=routes",
  },
  {
    name: "Tickets",
    href: "/?tab=tickets",
  },
  {
    name: "Hotels",
    href: "/?tab=hotels",
  },
];

export const Navbar = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  return (
    <header className="navbar bg-base-100">
      <div className="container mx-auto justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FiMenu className="text-2xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <img src="/images/marker-green.svg" alt="TopTrip" className="w-5 mr-1" />
            TopTrip
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end float-right">
              {user.user_metadata?.avatar_url ? (
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10">
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name}
                      className="rounded-full"
                      fill
                    />
                  </div>
                </label>
              ) : (
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar placeholder float-right"
                >
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                    <span className="text-xl">
                      {(user.user_metadata?.full_name || user.email)?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </label>
              )}
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={() => supabaseClient.auth.signOut()}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex space-x-2 float-right">
              <Link href="/register" className="btn btn-primary btn-link float-right btn-sm">
                Register
              </Link>
              <Link href="/login" className="btn btn-primary btn-outline float-right btn-sm">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
