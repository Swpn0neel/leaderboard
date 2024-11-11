export const sortContributors = (contributors, sortBy) => {
  return [...contributors].sort((a, b) => {
    if (sortBy === "total_contributions") {
      return b[1].total_contributions - a[1].total_contributions;
    }
    if (sortBy === "followers") {
      return b[1].followers - a[1].followers;
    }
    return b[1].public_repos - a[1].public_repos;
  });
};
