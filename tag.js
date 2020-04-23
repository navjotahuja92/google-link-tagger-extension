const sites = [
  {
    link: "medium.com",
    contains: "get unlimited access",
    tag: "Paid",
    textColor: "#FFFFFF",
    backgroundColor: "#E53E3E",
  },
];

const DEFAULT_BACKGROUND_COLOR = "#38A169";
const DEFAULT_TEXT_COLOR = "#ffffff";

const PROXY = "https://api.allorigins.win/get?url=";
const LINK_TAGGER_CONTAINER_CLASS = "link-tagger-container";
const LINK_TAGGER_TAG_CLASS = "link-tagger-tag";

const resultsElem = Array.from(document.getElementsByClassName("g"));

const insertAfter = (newNode, existingNode) => {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
};

resultsElem.map(async (resultElem) => {
  const linkElementElem = resultElem.querySelector("a");
  // 'rc' is full link 'r' is link and 's' is the description
  const linkHeadingElem = resultElem.querySelector(".r");
  const tagContainerElem = document.createElement("div");
  tagContainerElem.className = LINK_TAGGER_CONTAINER_CLASS;
  let hasTags = false;
  sites.forEach(async (site) => {
    if (linkElementElem && linkElementElem.href.includes(site.link)) {
      const tagElem = document.createElement("span");
      const response = await fetch(
        `${PROXY}${encodeURIComponent(linkElementElem.href)}`
      );
      const json = await response.json();
      if (json.contents.includes(site.contains)) {
        tagElem.className = LINK_TAGGER_TAG_CLASS;
        tagElem.innerText = site.tag;
        tagElem.style.backgroundColor =
          site.backgroundColor || DEFAULT_BACKGROUND_COLOR;
        tagElem.style.color = site.textColor || DEFAULT_TEXT_COLOR;
        tagContainerElem.appendChild(tagElem);
        hasTags = true;
      }
    }
  });
  if (hasTags) {
    insertAfter(tagContainerElem, linkHeadingElem);
  }
});
