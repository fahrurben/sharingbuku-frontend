import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

function ProfileSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname;
  const linkStyle = clsx(['block', 'p-2', 'border-b', 'w-full']);
  const linkActiveStyle = clsx(['block', 'p-2', 'border-b', 'w-full', 'bg-gray-200']);

  let links = [
    { to: "/my_listings", label: t("My Books"), className: (pathname === "/my_listings" ? linkActiveStyle: linkStyle)},
    { to: "/my_request_list", label: t("My Request"), className: (pathname === "/my_request_list" ? linkActiveStyle: linkStyle)},
    { to: "/profile", label: t("My Profile"), className: (pathname === "/profile" ? linkActiveStyle: linkStyle)},
    { to: "/change_password", label: t("Change Password"), className: (pathname === "/change_password" ? linkActiveStyle: linkStyle)},
  ];

  return (
    <ul className="px-2">
      {links.map((link) => {
        return <li><Link to={link.to} className={link.className}>{link.label}</Link></li>
      })}
    </ul>
  )
}

export default ProfileSidebar;