"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm text-gray-400 p-4">
      <ol className="flex space-x-2">
        {/* Home Link */}
        <li>
          <Link href="/" className="hover:underline text-white">Home</Link>
          {segments.length > 0 && <span className="mx-2">/</span>}
        </li>

        {/* Dynamic Breadcrumbs */}
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const path = "/" + segments.slice(0, index + 1).join("/");

          return (
            <li key={path} className="flex items-center">
              {!isLast ? (
                <Link href={path} className="hover:underline text-white">
                  {decodeURIComponent(segment)}
                </Link>
              ) : (
                <span className="text-gray-300">{decodeURIComponent(segment)}</span>
              )}
              {!isLast && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumbs;
