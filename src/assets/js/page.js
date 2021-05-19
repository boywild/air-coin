window.onload = function () {
  const gsapTimeline = gsap.timeline({ paused: !0 });
  const intro = document.querySelector(".home_intro");
  const videoBg = intro.querySelector(".video-background");
  const introVideo = intro.querySelector(".intro");
  const introLoop = intro.querySelector(".intro-loop");
  introVideo.addEventListener("ended", function (t) {
    introLoop.style.opacity = 1;
    introLoop.style.zIndex = 2;
    introLoop.play();
  });

  gsapTimeline.set(videoBg, { scale: 0.5, autoAlpha: 0 });
  gsapTimeline.add(function () {
    introVideo.play();
  }, 0.3);
  gsapTimeline
    .to(
      videoBg,
      0.4,
      {
        scale: 1,
        ease: Power1.easeIn,
        onComplete: function () {
          document.body.style.background = "#151515";
        },
      },
      0.3
    )
    .to(videoBg, 0.2, { autoAlpha: 1 }, 0.3)
    .to(".header", { autoAlpha: 1 }, "+=2");

  gsapTimeline.play();
};
