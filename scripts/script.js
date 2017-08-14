var captionId = 0;

var captions = [
  "creating cyber surprises",
  "collaborating on cool content",
  "interactive goop",
  "that tickles",
  "stop it",
  "I said stop.",
  "I will just leave if you keep doing that.",
  "Please, I am asking nicely.",
  "Okay have it your way.",
  "Goodbye.",
  "" ]

function setCaption()
{
  console.log("setting caption");
  document.getElementById("caption").innerHTML = captions[Math.min(captionId, captions.length - 1)];
  captionId += 1;
}
