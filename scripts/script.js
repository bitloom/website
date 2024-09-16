var fullscreenImage = null;

var hiddenContainer = document.getElementById('hiddenContent');
var displayContainer = document.getElementById('displayContent');
var taglineContainer = document.getElementById('tagline');
var navigationContainer = document.getElementById('navigation');

var slidePositions = []
var slideshowElements = []
const slideTimeSeconds = 5;

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

function setup()
{
	slideshowElements = document.getElementsByClassName("slideshow");
	
	for(let i = 0; i < slideshowElements.length; i++)
	{
		slidePositions.push(-1);
	}
	
	advanceSlides();
}

function advanceSlides()
{
	for(let slideshow = 0; slideshow < slideshowElements.length; slideshow++)
	{
		let slides = slideshowElements[slideshow].getElementsByClassName("screenshot");
		let lastSlide = slidePositions[slideshow];
		slidePositions[slideshow]++;
		if(slidePositions[slideshow] >= slides.length)
		{
			slidePositions[slideshow] = 0;
		}
		
		//revert last slide to -1 to avoid operating on the same slide
		if(slidePositions[slideshow] == lastSlide)
		{
			lastSlide = -1;
		}
		
		for(let slide = 0; slide < slides.length; slide++)
		{
			if(slide == slidePositions[slideshow])
			{
				//console.log("Fade in!");
				slides[slide].className += " fadeInScreenshot";
				slides[slide].className = slides[slide].className.replace(" fadeOutScreenshot", "");
				slides[slide].style.display = "inherit";
				slides[slide].style.zIndex = 2;
			}
			else if(slide == lastSlide)
			{
				//console.log("Fade out!")
				slides[slide].className += " fadeOutScreenshot";
				slides[slide].className = slides[slide].className.replace(" fadeInScreenshot", "");
				slides[slide].style.display = "inherit";
				slides[slide].opacity = "100%";
				slides[slide].style.zIndex = 1;
			}
			else
			{
				//console.log("hide!")
				slides[slide].className = slides[slide].className.replace(" fadeInScreenshot", "");
				slides[slide].className = slides[slide].className.replace(" fadeOutScreenshot", "");
				slides[slide].style.display = "none";
				slides[slide].opacity = "0";
				slides[slide].style.zIndex = 0;
			}
		}
	}
    setTimeout(advanceSlides, slideTimeSeconds*1000);
}

setup();