export default function deleteSearchHistory() {
  // first we need to get the recentSearchs from the localStorage of the user
  const recentSearches = localStorage.getItem("recentSearchs")
  if (!recentSearches) {
    return
  }

  // then we can deleted the recentSearches from the localStorage
  localStorage.removeItem("recentSearchs")
}
