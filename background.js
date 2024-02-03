let regex = /^([^\/]+\/)*(\w+(\.\w+)+|[\w-]+)(:\d+)?$/;
let traceFrameTags = document.querySelectorAll('.trace-frames');
let codeTags = document.querySelectorAll('code');
let railsRoot = ""
codeTags.forEach(codeTag => {
  let codeTagText = codeTag.textContent;
  if (codeTagText.includes("Rails.root")) {
    railsRoot = codeTagText.split("Rails.root: ")[1].replace(/\s/g, "");
  }
})

traceFrameTags.forEach(traceFrameTag => {
  let traceFrameTagText = traceFrameTag.textContent;
  let path = traceFrameTagText.split(": ")[0].split(":in")[0].trim();
  if (!path.includes(" ") && regex.test(path) && railsRoot != "") {
    let linkTag = document.createElement('a');
    let filePath = `vscode://file/${railsRoot}/${path}`
    linkTag.href = filePath;
    linkTag.textContent = "Open in VSCode";
    linkTag.style.marginLeft = "10px";
    linkTag.style.color = "#0066B8";
    linkTag.style.fontWeight = "bold";
    linkTag.style.fontSize = "12px";
    traceFrameTag.parentNode.insertBefore(linkTag, traceFrameTag.nextSibling)
  }
})
