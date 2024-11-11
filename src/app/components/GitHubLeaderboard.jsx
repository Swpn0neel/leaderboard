"use client";

import React, { useState, useEffect } from "react";
import Card from "./ui/Card";
import CardContent from "./ui/CardContent";
import CardHeader from "./ui/CardHeader";
import CardTitle from "./ui/CardTitle";
import { User, GitBranch, Mail, BookOpen, Layout } from "lucide-react";
import contributorsData from "../data/contributors.json";
import { sortContributors } from "../utils/sortContributors";

const GitHubLeaderboard = () => {
  const [sortedContributors, setSortedContributors] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("total_contributions");

  useEffect(() => {
    const sorted = sortContributors(
      Object.entries(contributorsData),
      sortCriteria
    );
    setSortedContributors(sorted);
  }, [sortCriteria]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Keploy Contributors Leaderboard
          </h1>
          <p className="text-gray-600">
            Celebrating our amazing open source contributors
          </p>
        </div>

        <div className="mb-6 flex justify-end space-x-2">
          <button
            onClick={() => setSortCriteria("total_contributions")}
            className={`px-4 py-2 rounded ${
              sortCriteria === "total_contributions"
                ? "bg-[#FF914D] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Sort by Contributions
          </button>
          <button
            onClick={() => setSortCriteria("followers")}
            className={`px-4 py-2 rounded ${
              sortCriteria === "followers"
                ? "bg-[#FF914D] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Sort by Followers
          </button>
          <button
            onClick={() => setSortCriteria("public_repos")}
            className={`px-4 py-2 rounded ${
              sortCriteria === "public_repos"
                ? "bg-[#FF914D] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Sort by Repos
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedContributors.map(([username, contributor], index) => (
            <Card
              key={username}
              className="bg-white shadow hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-[#FF914D25] rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-800">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {contributor.name || username}
                      </CardTitle>
                      <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-[#FF914D]"
                      >
                        @{username}
                      </a>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {contributor.bio && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {contributor.bio}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {contributor.total_contributions} contributions
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {contributor.followers} followers
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Layout className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {contributor.public_repos} repos
                    </span>
                  </div>
                  {contributor.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 truncate">
                        {contributor.email}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Project Contributions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {contributor.contributions &&
                      Object.entries(contributor.contributions).map(
                        ([project, count]) => (
                          <span
                            key={project}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FF914D25] text-gray-600"
                          >
                            {project}: {count}
                          </span>
                        )
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubLeaderboard;
