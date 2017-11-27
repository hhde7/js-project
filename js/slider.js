var boutonPrevious = document.getElementById("previous");
var boutonNext = document.getElementById("next");
var bandeau = document.getElementById("bandeau");
var saut = 150;

boutonPrevious.addEventListener("click", function () {
  bandeau.style.left = saut +"px";
  saut = saut + parseFloat(getComputedStyle(bandeau).left);
  console.log(saut);
});

boutonNext.addEventListener("click", function () {
  bandeau.style.left = - saut +"px";
  saut = saut - parseFloat(getComputedStyle(bandeau).left);
  console.log(saut);
});
