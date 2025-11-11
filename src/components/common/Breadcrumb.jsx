import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span
            className={`${
              index === items.length - 1
                ? "font-semibold text-blue-600 dark:text-blue-400"
                : "hover:text-blue-500 cursor-pointer"
            }`}
            onClick={item.onClick}
          >
            {item.label}
          </span>
          {index < items.length - 1 && (
            <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
