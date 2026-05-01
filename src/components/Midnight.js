import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import './Midnight.scss';

// 표시될 코드 조각들
const CODE_SNIPPETS = [
  'const', 'let', 'function()', '=>', '{', '}', '[ ]', 'if', 'else', 'return', 
  'async', 'await', 'useEffect', 'useState', 'useRef', '<div/>', '&&', '||', '===',
  'map()', 'filter()', 'import', 'export', 'gsap.to()', 'ScrollTrigger', 'Math.random()',
  'opacity', 'y: 100', 'scrub: 1', 'ease: "power2"', 'timeline()', 'console.log()'
];

// 랜덤 파티클 생성 함수
const generateParticles = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
    top: Math.random() * 100, // 0~100%
    left: Math.random() * 100, // 0~100%
    depth: Math.random() * 2 + 0.5, // 0.5 ~ 2.5 (깊이에 따른 패럴랙스 속도 차이)
    scale: Math.random() * 0.8 + 0.4, // 0.4 ~ 1.2
  }));
};

const Midnight = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  // 컴포넌트 리렌더링 시 파티클 위치가 초기화되지 않도록 useMemo 사용 (파티클 84개로 축소)
  const particles = useMemo(() => generateParticles(84), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 파티클들이 상하좌우로 무작위하게 둥둥 떠다니는 기본 애니메이션
      particlesRef.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          y: `+=${Math.random() * 30 + 20}`, // Y축 상하 진동 범위 설정
          x: `+=${Math.random() * 20 - 10}`, // X축 좌우 진동 범위 설정
          rotation: Math.random() * 20 - 10,
          duration: Math.random() * 3 + 2, // 2~5초마다 반복
          repeat: -1,
          yoyo: true, // 갔다가 다시 되돌아오는 효과
          ease: "sine.inOut",
        });
      });

      // 2. 하단 스크롤 인디케이터 상하 바운스 애니메이션
      gsap.to(".scroll-indicator", {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut"
      });

      // 3. 스크롤 시 스크롤 인디케이터 부드럽게 페이드아웃
      gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // 맨 위에서 스크롤을 시작하자마자
          end: "+=300", // 300px 정도 스크롤하는 동안
          scrub: true, // 스크롤에 동기화되어 서서히 사라짐
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 마우스 이동 시 깊이(depth)에 따라 움직이는 속도가 다른 패럴랙스 효과 계산
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // 화면 중심 기준 마우스 좌표 (-1 ~ 1)
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    // 파티클 패럴랙스 효과
    particlesRef.current.forEach((el, i) => {
      if (!el) return;
      const depth = particles[i].depth;
      gsap.to(el, {
        x: xPos * -30 * depth,
        y: yPos * -30 * depth,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  };

  return (
    <section 
      className="midnight-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* 코드 파티클 레이어 */}
      <div className="particles-layer">
        {particles.map((p, i) => (
          <span
            key={p.id}
            className="code-particle"
            ref={(el) => (particlesRef.current[i] = el)}
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              transform: `scale(${p.scale})`,
              opacity: p.scale / 2, // 멀리 있을수록 더 투명하게
            }}
          >
            {p.text}
          </span>
        ))}
      </div>

      {/* 중앙 메인 텍스트 */}
      <div className="text-content">
        <h1>Code is like Stars</h1>
        <p>밤하늘을 수놓는 끝없는 로직의 조각들</p>
      </div>

      {/* 하단 스크롤 인디케이터 */}
      <div className="scroll-indicator">
        <span className="mouse-shape">
          <span className="wheel"></span>
        </span>
        <span className="scroll-text">Scroll Down</span>
      </div>
    </section>
  );
};

export default Midnight;
