import { alternativeLinks } from "@/utils/constants";
import React from "react";

const AlternativeLinks = () => {
  return (
    <ul className="mb-5 divide-x-reverse flex-wrap h-[100%] w-[100%] flex justify-start sm:justify-evenly flex-col sm:flex-row items-center gap-4">
      {alternativeLinks.map((item, idx) => (
        <li key={idx} className="flex gap-x-4 p-6">
          <div className="flex-none w-14 h-14 bg-indigo-50 rounded-full text-indigo-600 flex items-center justify-center">
            {item.icon}
          </div>
          <div className="space-y-1">
            <h4>{item.title}</h4>
            <p className="text-gray-800 font-medium">{item.desc}</p>
            <a
              href={item.href}
              className="text-sm  text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1"
            >
              Llevame allá
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AlternativeLinks;
