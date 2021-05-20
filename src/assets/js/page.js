window.onload = function () {
  // 初始化时间线
  const gsapTimeline = gsap.timeline({ paused: !0 });
  // 初始化元素获取
  const intro = document.querySelector(".home_intro");
  const videoBg = intro.querySelector(".video-background");
  const introVideo = intro.querySelector(".intro");
  const introLoop = intro.querySelector(".intro-loop");

  // 文字分隔特效
  const BigTitle = Array.from(intro.querySelectorAll(".title span"));
  const titleWord1 = new SplitText(BigTitle[0], { type: "words" });
  const titleWord2 = new SplitText(BigTitle[1], { type: "words" });
  const subTitle = new SplitText(document.querySelectorAll(".baseline"), {
    type: "words,chars",
  });
  // 视频播放完成
  introVideo.addEventListener("ended", function (t) {
    introLoop.style.opacity = 1;
    introLoop.style.zIndex = 2;
    introLoop.play();
  });

  gsapTimeline.set(videoBg, { scale: 0.5, autoAlpha: 0 });
  gsapTimeline.add(function () {
    introVideo.play();
  }, 0.3);

  // 视频背景动画
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
    .to(".header", { autoAlpha: 1 }, "+=2")

    .fromTo(
      ".left-title",
      { duration: 1, autoAlpha: 0, ease: "bounce.out", top: 0 },
      { duration: 1, autoAlpha: 1, ease: "bounce.out", top: "30%" }
    )
    .fromTo(
      ".right-title",
      { duration: 1, autoAlpha: 0, ease: "bounce.out", top: 0 },
      { duration: 1, autoAlpha: 1, ease: "bounce.out", top: "30%" }
    )
    .fromTo(
      ".coin",
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1,
      }
    )
    .fromTo(
      ".cloud",
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1,
      }
    )
    .fromTo(
      ".bird",
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1,
      }
    )
    .to(".cloud", {
      transformOrigin: "bottom center",
      y: -15,
      rotation: 1,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

  // 标题动画ƒ
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

  // 文字描述动画
  subTitle.words.forEach(function (t, i) {
    console.log(t);
    TweenLite.set(t, { autoAlpha: 0 });
    gsapTimeline.to(t, 0, { autoAlpha: 1 }, 2.98 + 0.7 + 0.09 * i);
  });
  // gsapTimeline.from(".home_titles .title span", { duration: 3, text: "" });
  // gsapTimeline.from(".baseline", { duration: 3, text: "" });
  // .to(".baseline", 0, { autoAlpha: 1 });

  gsapTimeline.play();
};
