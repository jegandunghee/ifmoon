import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Midnight from './components/Midnight';
import Dawn from './components/Dawn';
import Morning from './components/Morning';
import './App.scss';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // 화면에 보일 요소들을 제어하기 위한 참조(Ref) 객체들
  const bgRef = useRef(null);
  const moonRef = useRef(null);
  const sunRef = useRef(null);

  useEffect(() => {
    // 1. 브라우저의 기본 스크롤 복구 동작을 끄고 강제로 맨 위로 올림
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 2. React 18+ strict mode 버그 및 리렌더링 중복 방지를 위한 gsap.context()
    const ctx = gsap.context(() => {
      // 1. 글로벌 배경색 전환 (전체 구간)
      const bgTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".content-wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        }
      });

      bgTl.to(bgRef.current, {
        "--bg-color-1": "#4c1d95", 
        "--bg-color-2": "#8b5cf6", 
        ease: "none",
      })
      .to(bgRef.current, {
        "--bg-color-1": "#87ceeb", 
        "--bg-color-2": "#e0f6ff", 
        ease: "none",
      });

      // 2. 글로벌 달 애니메이션 (0% ~ 50% 구간)
      gsap.to(moonRef.current, {
        x: "-70vw", 
        y: "30vh",
        rotation: -30,
        opacity: 0,
        scrollTrigger: {
          trigger: ".content-wrapper",
          start: "top top",
          end: "50% center", // 전체 스크롤의 50% 지점에서 종료
          scrub: 1,
        }
      });

      // 3. 글로벌 해 애니메이션 (40% ~ 100% 구간)
      gsap.fromTo(sunRef.current, 
        { y: 0, x: 0, opacity: 0 },
        {
          y: "calc(-50vh - 150px)", // 화면 정중앙 (가운데 카드 뒤)으로 이동
          x: "-40vw",
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".content-wrapper",
            start: "70% center", // Morning 카드가 나타날 즈음 시작하도록 늦춤
            end: "bottom bottom",
            scrub: 1,
          }
        }
      );
    });

    // 3. 가끔 브라우저 렌더링이 늦어지며 스크롤 위치를 잘못 잡는 현상을 방지
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="App">
      <div className="global-background" ref={bgRef}>
        <div className="stars"></div>
        <div className="crescent-moon" ref={moonRef}></div>
        <div className="sun" ref={sunRef}></div>
      </div>
      
      <div className="content-wrapper">
        <Midnight />
        <Dawn />
        <Morning />
      </div>
    </div>
  )
}

export default App;