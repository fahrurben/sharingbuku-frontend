import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

function ProfileSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname;
  const linkStyle = clsx(['block', 'p-2', 'border-b', 'w-full', 'bg-gray-200']);
  const linkActiveStyle = clsx(['block', 'p-2', 'border-b', 'w-full']);

  let links = [
    { to: "/profile", label: t("Profile"), className: (pathname === "/profile" ? linkActiveStyle: linkStyle)},
  ];

  return (
    <ul className="px-2">
      {links.map((link) => {
        return <li><Link to={link.to} className="block p-2 border-b bg-gray-200 w-full">{link.label}</Link></li>
      })}
    </ul>
  )
}

export default ProfileSidebar;