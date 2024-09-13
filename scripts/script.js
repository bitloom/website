var fullscreenImage = null;

var hiddenContainer = document.getElementById('hiddenContent');
var displayContainer = document.getElementById('displayContent');
var taglineContainer = document.getElementById('tagline');
var navigationContainer = document.getElementById('navigation');

const slideTimeSeconds = 5;

var games = [
  "Games",
  "Interactives"
 ]

 var adjectivesB =[
  "Surprise",
  "Move"
 ]

 var adjectivesB = [
  "Delight",
  "Shake"
 ]

var slidePositions = []

function randomiseCaption()
{
  console.log("setting caption");
  document.getElementById("tag2").innerHTML = games[Math.floor(Math.random() * games.length)];
  document.getElementById("tag4").innerHTML = adjectivesA[Math.floor(Math.random() * adjectivesA.length)];
  document.getElementById("tag6").innerHTML = adjectivesB[Math.floor(Math.random() * adjectivesB.length)];
}

function swapContent(contentId, clickedButton)
{
  for(var i = 0; i < navigationContainer.children.length; i++)
  {
    if(navigationContainer.children[i] == clickedButton)
    {
      navigationContainer.children[i].className = "selected";
    }
    else
    {
      navigationContainer.children[i].className = "";
    }
  }

  while(displayContainer.childNodes.length > 0)
  {
    hiddenContainer.appendChild(displayContainer.childNodes[0]);
  }

  displayContainer.appendChild(document.getElementById(contentId));
}
/*
function advanceSlides()
{
  console.log("Advance!");

  let slideContent = document.getElementsByClassName("slideshow");
  for (let slideshow = 0; slideshow < slideContent.length; slideshow++) 
  {
    const element = slideContent[slideshow];
    var lastSlide = 0
    if(slidePositions.length <= slideshow)
    {
      slidePositions.push(0);
    }
    else
    {
      lastSlide = slidePositions[slideshow]
      slidePositions[slideshow]++;
    }

    var slides = element.getElementsByClassName("screenshot");
    if(slides.length <= slidePositions[slideshow])
    {
      slidePositions[slideshow] = 0;
    }
    
    if(slides.length == 0)
    {
      console.log("no slides!")
      continue;
    }

    console.log(slidePositions[slideshow]);

    for(let slide = 0; slide < slides.length; slide++)
    {
      console.log(slide);
      if(slide == slidePositions[slideshow])
      {
        console.log("Fade in!");
        slides[slide].className += " fadeInScreenshot";
        slides[slide].style.display = "inherit";  
      }
      else if(slide == lastSlide)
      {
        console.log("Fade out!")
        slides[slide].className += " fadeOutScreenshot";
        slides[slide].style.display = "inherit";
      }
      else
      {
        console.log("hide!")
        slides[slide].className = slides[slide].className.replace(" fadeOutScreenshot", "");
        slides[slide].className = slides[slide].className.replace(" fadeInScreenshot", "");
        slides[slide].display = "none";
      }
    }

    setTimeout(advanceSlides, slideTimeSeconds*1000);
  }
}
*/
//advanceSlides()