import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Dawn.scss';

const Dawn = () => {
  const containerRef = useRef(null);
  const wireframeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Midnight 섹션의 파티클들이 스크롤 진입 시 중앙 코드로 조립되는(쏟아져 내리는) 모션
      gsap.from(".p-code", {
        x: () => Math.random() * 1200 - 600, // 좌우 무작위 위치에서 시작
        y: () => (Math.random() * -1000) - 500, // 위쪽(자정 섹션)에서 떨어지도록 Y축을 음수로 설정
        rotation: () => Math.random() * 360,
        opacity: 0,
        stagger: 0.02, // 조각들이 0.02초 간격으로 순차적으로 떨어짐
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%", // 카드가 화면 중앙(40% 지점)에 왔을 때부터 조립 시작
          end: "center 40%", // 중앙에서 완전히 조립 완료됨
          scrub: 1, // 스크롤에 맞춰 애니메이션이 진행됨
        }
      });

      // 파티클 조립이 완료된 후 카드 전체가 입체적으로 둥둥 떠다니는 효과
      gsap.to(".code-card", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="dawn-container" ref={containerRef}>
      <div className="title-area">
        <h2 className="section-title">Logic Unfolds</h2>
        <p>무질서했던 파티클들이 구조를 이루기 시작합니다</p>
      </div>
      
      <div className="code-card" ref={wireframeRef}>
        {/* 이 프로젝트의 실제 GSAP ScrollTrigger 타임라인 코드를 보여줌 */}
        <div className="code-line">
          <span className="p-code keyword">const</span> <span className="p-code var">bgTl</span> <span className="p-code symbol">=</span> <span className="p-code func">gsap.timeline</span><span className="p-code bracket">(&#123;</span>
        </div>
        <div className="code-line indent">
          <span className="p-code var">scrollTrigger</span><span className="p-code symbol">:</span> <span className="p-code bracket">&#123;</span>
        </div>
        <div className="code-line indent-double">
          <span className="p-code var">trigger</span><span className="p-code symbol">:</span> <span className="p-code keyword">".content-wrapper"</span><span className="p-code symbol">,</span>
        </div>
        <div className="code-line indent-double">
          <span className="p-code var">start</span><span className="p-code symbol">:</span> <span className="p-code keyword">"top top"</span><span className="p-code symbol">,</span>
        </div>
        <div className="code-line indent-double">
          <span className="p-code var">scrub</span><span className="p-code symbol">:</span> <span className="p-code var">1</span><span className="p-code symbol">,</span>
        </div>
        <div className="code-line indent">
          <span className="p-code bracket">&#125;</span>
        </div>
        <div className="code-line">
          <span className="p-code bracket">&#125;)</span><span className="p-code symbol">;</span>
        </div>
      </div>
    </section>
  );
};

export default Dawn;
