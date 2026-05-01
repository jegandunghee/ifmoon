import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiCopy, FiCheck } from 'react-icons/fi'; // react-icons 불러오기
import './Morning.scss';

const Morning = () => {
  const containerRef = useRef(null);

  // 이메일 주소 상태 관리 (직접 수정할 부분)
  const emailAddress = "jeahee3161@gmail.com";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 카드가 아래에서 위로 통통 튀며 등장하는 애니메이션 (Spring 효과)
      // 버그 수정: scrub 대신 일반 play 애니메이션(toggleActions)을 사용하여 호버(transform) 트윈과 충돌하는 현상을 원천 차단
      gsap.from(".ui-card", {
        y: 200,
        opacity: 0,
        rotationX: 30, // 살짝 누워있다가 일어나는 입체적 연출
        stagger: 0.15, // 카드들이 순차적으로 등장
        duration: 1, // 등장하는 데 걸리는 시간
        ease: "back.out(1.5)", // 통통 튀는 스프링 효과
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // 아침 섹션이 화면의 60%쯤 보일 때 시작
          toggleActions: "play none none reverse", // 스크롤을 내리면 재생, 위로 올리면 역재생
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 마우스 호버 시 카드에 쫀득한 마이크로 인터랙션 부여
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -15,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      duration: 0.6,
      ease: "elastic.out(1, 0.4)", // 젤리처럼 출렁이는 느낌
      overwrite: "auto"
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  // 클립보드에 이메일 복사하는 함수
  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2초 후 원래 아이콘으로 복구
  };

  return (
    <section className="morning-container" ref={containerRef}>
      <div className="title-area">
        <h2 className="section-title">The System Breathes</h2>
        <p>로직이 훌륭한 인터페이스로 탄생하는 순간</p>
      </div>

      <div className="ui-showcase">
        {/* 첫 번째 UI: GitHub Card */}
        <div
          className="ui-card github-card"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="icon-wrapper">💻</div>
          <div className="info">
            <div className="name">GitHub</div>
            <div className="desc">소스 코드를 확인해보세요</div>
          </div>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="action-btn">
            GitHub 방문하기
          </a>
        </div>

        {/* 두 번째 UI: Tech Stack Card */}
        <div
          className="ui-card skills-card"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-title">Tech Stack</div>
          <div className="skills-grid">
            <span className="skill-tag">React</span>
            <span className="skill-tag">GSAP</span>
            <span className="skill-tag">SCSS</span>
            <span className="skill-tag">JavaScript</span>
          </div>
        </div>

        {/* 세 번째 UI: Contact Card */}
        <div
          className="ui-card contact-card"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="icon-wrapper">✉️</div>
          <div className="info">
            <div className="name">Let's Connect</div>
            <div className="desc">새로운 기회를 기다리고 있습니다</div>

            {/* 이메일 복사 영역 */}
            <div className="email-copy-box">
              <span className="email-text">{emailAddress}</span>
              <button
                className="copy-icon-btn"
                onClick={handleCopy}
                title="이메일 복사"
              >
                {copied ? <FiCheck style={{ color: '#10b981' }} /> : <FiCopy style={{ color: '#64748b' }} />}
              </button>
            </div>
          </div>
          <a href={`mailto:${emailAddress}`} className="action-btn">
            메일을 보내주세요
          </a>
        </div>
      </div>
    </section>
  );
};

export default Morning;
