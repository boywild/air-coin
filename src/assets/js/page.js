window.onload = function () {
  const gsapTimeline = gsap.timeline({ paused: !0 });
  const intro = document.querySelector(".home_intro");
  const videoBg = intro.querySelector(".video-background");
  const introVideo = intro.querySelector(".intro");
  const introLoop = intro.querySelector(".intro-loop");

  const BigTitle = Array.from(intro.querySelectorAll(".title span"));
  const titleWord1 = new SplitText(BigTitle[0], { type: "words" });
  const titleWord2 = new SplitText(BigTitle[1], { type: "words" });
  console.log(BigTitle);
  introVideo.addEventListener("ended", function (t) {
    introLoop.style.opacity = 1;
    introLoop.style.zIndex = 2;
    introLoop.play();
  });

  gsapTimeline.set(videoBg, { scale: 0.5, autoAlpha: 0 });
  // gsapTimeline.set(".baseline", { autoAlpha: 0 });
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

  titleWord1.words.forEach(function (t, i) {
    TweenLite.set(t, {
      scale: 0.7,
      transformOrigin: "50% 80%",
      autoAlpha: 0,
    });
    gsapTimeline.to(t, 0, { autoAlpha: 1 }, 0.55 + 0.15 * i);
    gsapTimeline.to(
      t,
      0.15,
      { scale: 1, ease: Expo.easeInOut },
      0.65 + 0.15 * i
    );
  });
  titleWord2.words.forEach(function (t, i) {
    TweenLite.set(t, {
      scale: 0.7,
      transformOrigin: "50% 80%",
      autoAlpha: 0,
    });
    gsapTimeline.to(t, 0, { autoAlpha: 1 }, 2.98 + 0.15 * i);
    gsapTimeline.to(
      t,
      0.15,
      { scale: 1, ease: Expo.easeInOut },
      3.08 + 0.15 * i
    );
  });

  new SplitText(document.querySelectorAll(".baseline"), {
    type: "words,chars",
  }).words.forEach(function (t, i) {
    console.log(t);
    TweenLite.set(t, { autoAlpha: 0 });
    gsapTimeline.to(t, 0, { autoAlpha: 1 }, 2.98 + 0.7 + 0.09 * i);
  });
  // gsapTimeline.from(".home_titles .title span", { duration: 3, text: "" });
  // gsapTimeline.from(".baseline", { duration: 3, text: "" });
  // .to(".baseline", 0, { autoAlpha: 1 });

  gsapTimeline.play();
};
