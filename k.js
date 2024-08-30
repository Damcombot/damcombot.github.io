const musicToggle = document.getElementById("musicToggle");
const backgroundMusic = document.getElementById("backgroundMusic");

let isPlaying = false;

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    backgroundMusic.pause();
    musicToggle.textContent = "Aura";
  } else {
    backgroundMusic.play();
    musicToggle.textContent = "Void";
  }
  isPlaying = !isPlaying;
});
// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Create the custom cursor element
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  // Update the position of the cursor based on mouse movement
  document.addEventListener("mousemove", function (e) {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursor.style.opacity = "1"; // Show cursor when moving
  });

  // Hide cursor when it leaves the webpage
  document.addEventListener("mouseleave", function () {
    cursor.style.opacity = "0"; // Hide the custom cursor
  });

  // Show cursor when it enters the webpage
  document.addEventListener("mouseenter", function () {
    cursor.style.opacity = "1"; // Show the custom cursor
  });

  // Smooth scrolling behavior for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});
document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    let progress = 0;
    const progressBar = document.getElementById("progressBar");
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = progress + "%";
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100); // Adjust the speed here if necessary
  }

  if (document.readyState === "complete") {
    document.getElementById("loader").style.transform = "translateY(-100%)";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 1000);
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
