function readMoreFirst() {
    var dots = document.getElementById("dots-first");
    var moreText = document.getElementById("more-first");
    var btnText = document.getElementById("firstBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

function readMoreSecond() {
    var dots = document.getElementById("dots-second");
    var moreText = document.getElementById("more-second");
    var btnText = document.getElementById("secondBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

function readMoreThird() {
    var dots = document.getElementById("dots-third");
    var moreText = document.getElementById("more-third");
    var btnText = document.getElementById("thirdBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}