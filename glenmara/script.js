var styleIndex = 0;
var styleImages = ["1", "2", "3", "4", "5", "6"]

var paint = document.getElementById("paint");
var backgrounds = document.getElementsByClassName("background");
var curBackground = 0
var targetBackground = 0

paint.addEventListener("click", paintClicked);

var fading = false;

for(i = 0; i < backgrounds.length; i++)
{
	backgrounds[i].style.backgroundImage="url('glenmara/styles/" + styleImages[styleIndex] + ".png')"
	
	backgrounds[i].style.zIndex = -i - 1;
}

function paintClicked(e)
{
	if(fading != false)
	{
		return;
	}
	
	fading = true;
	
	backgrounds[curBackground].addEventListener("animationend", backgroundFadedOut);
	
	backgrounds[curBackground].classList.toggle("fadeOut");

	styleIndex += 1;

	if (styleIndex >= styleImages.length)
	{
		styleIndex = 0;
	} 
	
	targetBackground = curBackground + 1;
	if (targetBackground >= backgrounds.length)
	{
		targetBackground = 0;
	} 
	backgrounds[curBackground].style.zIndex = -1;
	backgrounds[targetBackground].style.zIndex = -2;
	
	backgrounds[targetBackground].style.backgroundImage = "url('glenmara/styles/" + styleImages[styleIndex] + ".png')";
	backgrounds[targetBackground].style.opacity = 1.0;
}

function backgroundFadedOut()
{	
	fading = false;

	backgrounds[curBackground].removeEventListener("animationend", backgroundFadedOut);
	backgrounds[curBackground].style.opacity = 0.0;
	backgrounds[curBackground].classList.remove("fadeOut");
	
	curBackground = targetBackground;
}