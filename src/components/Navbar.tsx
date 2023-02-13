import Link from "next/link";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FiChevronDown, FiChevronRight, FiMenu } from "react-icons/fi";

const menuItems = [
  {
    name: "Item 1",
    href: "/",
  },
  {
    name: "Item 2",
    items: [
      {
        name: "Item 2.1",
        href: "/",
      },
      {
        name: "Item 2.2",
        href: "/",
      },
    ],
  },
  {
    name: "Item 3",
    href: "/",
  },
];

export const Navbar = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  console.log("user", user);

  return (
    <header className="navbar bg-base-100">
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
              <li tabIndex={item.items ? 0 : undefined} key={item.name}>
                {item.items ? (
                  <a className="justify-between">
                    {item.name}
                    <FiChevronRight />
                  </a>
                ) : (
                  <Link href={item.href}>{item.name}</Link>
                )}
                {item.items && (
                  <ul className="p-2">
                    {item.items.map((subItem) => (
                      <li key={subItem.name}>
                        <Link href={subItem.href}>{subItem.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          app name
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <li tabIndex={item.items ? 0 : undefined} key={item.name}>
              {item.items ? (
                <a>
                  {item.name}
                  <FiChevronDown />
                </a>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
              {item.items && (
                <ul className="p-2">
                  {item.items.map((subItem) => (
                    <li key={subItem.name}>
                      <Link href={subItem.href}>{subItem.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
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
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
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
          <Link href="/login" className="btn btn-primary">
            Get started
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
