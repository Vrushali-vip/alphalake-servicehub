import React from "react";

const ArticleCardSkeleton = () => {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white max-w-sm">
      <div className="text-gray-700 font-semibold mb-2">These might help</div>
      <div className="flex items-center space-x-2 mb-2">
        <div className="bg-blue-100 p-2 rounded-full">
          <span role="img" aria-label="article">
            📘
          </span>
        </div>
        <p className="text-gray-500 text-sm">Help article</p>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Register fixed assets
      </h3>
      <p className="text-gray-700 text-sm mb-2">
        Assets can be registered individually or in bulk. ... We recommend you
        have no more than 500 registered fixed assets in Xero.
      </p>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
          For small businesses
        </span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
          Xero
        </span>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
