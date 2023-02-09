/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"KNNXFaRChUgmhBBl","label":"reddit","bookmarks":[{"id":"mLza2HCUj0yGeRm9","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"xfVjmhdovC4ocsyP","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"FU1zzw9ow44EAiMG","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"},{"id":"OEM6yOnmnDFKgVaO","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"}]},{"id":"Yz8LNtUsEEexZtXm","label":"design tools","bookmarks":[{"id":"yQo1hImpXLgDGX3z","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"ANwthWOPTv3MKQC6","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"i16rl7sgk7KzVfkj","label":"haikei","url":"https://app.haikei.app/"},{"id":"kSZuCkhcKjHaJFli","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"d0x2MK3xtEk6vKSf","label":"sources","bookmarks":[{"id":"sXg9ANJ3zaNwPHEk","label":"icons","url":"https://feathericons.com/"},{"id":"bIioFY7cWbxILbN8","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"wwqBtfFNDZAIRz3z","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"sBYR3DyCFAjOz95x","label":"author","url":"https://prettycoffee.github.io/"}]},{"id":"rFRGlkChCFNU7oAv","label":"Social Media","bookmarks":[{"id":"VcwREsr73076z2xo","label":"Youtube","url":"https://www.youtube.com"},{"id":"jAmjopwlMHqtmAGE","label":"Facebook","url":"https://www.facebook.com/"},{"id":"hpyZsGFOH2ngy3ID","label":"Spotify","url":"https://open.spotify.com/"},{"id":"XOUE8yA6ozI2VCne","label":"Github","url":"https://github.com/LegendRawnak"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
