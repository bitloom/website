var captionId = 0;
var fullscreenImage = null;

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

function gifStart(image)
{
    image.src = image.src.replace(".jpg", ".gif");
}

function gifStop(image)
{
    image.src = image.src.replace(".gif", ".jpg");
}

function enterFullscreen(image)
{
  if (fullscreenImage != null)
  {
    fullscreenImage.parentNode.removeChild(fullscreenImage);
    fullscreenImage = null;
  }

  fullscreenImage = document.createElement("div");
  var fullscreenImageChild = document.createElement("img");
  fullscreenImageChild.src =  "full" + image.src;
  fullscreenImageChild.classList.add("fullscreenImageChild");
  fullscreenImage.appendChild(fullscreenImageChild);

  fullscreenImage.onclick = exitFullscreen;
  fullscreenImage.classList.add("fullscreenImage");

  document.body.appendChild(fullscreenImage);
}

function enterFullscreenGif(image)
{
  if (fullscreenImage != null)
  {
    fullscreenImage.parentNode.removeChild(fullscreenImage);
    fullscreenImage = null;
  }

  fullscreenImage = document.createElement("div");
  var fullscreenImageChild = document.createElement("img");
  fullscreenImageChild.src = image.src;
  fullscreenImageChild.classList.add("fullscreenImageChild");
  fullscreenImage.appendChild(fullscreenImageChild);

  fullscreenImage.onclick = exitFullscreen;
  fullscreenImage.classList.add("fullscreenImage");

  document.body.appendChild(fullscreenImage);
}

function exitFullscreen()
{
    if (fullscreenImage != null)
    {
      fullscreenImage.parentNode.removeChild(fullscreenImage);
      fullscreenImage = null;
    }
}
