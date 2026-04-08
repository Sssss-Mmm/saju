"use client";
import React, { useState } from 'react';

// 자미두수 명반 (4x4 Grid, center is empty or contains user info)
const palaces = [
  { id: 6, name: "사", title: "질액궁", stars: ["천기", "거문"], desc: "타고난 건강 상태, 취약한 질병 및 신체적 약점을 보여줍니다." },
  { id: 7, name: "오", title: "천이궁", stars: ["천상"], desc: "사회적 대인관계, 이동/해외운, 타인에게 비치는 나의 이미지를 의미합니다." },
  { id: 8, name: "미", title: "노복궁", stars: ["태양", "천량"], desc: "친구, 부하 직원과의 인연이나 나의 외부 인맥 네트워크를 뜻합니다." },
  { id: 9, name: "신", title: "관록궁", stars: ["무곡", "칠살"], desc: "직업의 적성, 일하는 스타일, 승진 및 사회적 성취를 나타냅니다." },
  { id: 5, name: "진", title: "재백궁", stars: ["자미", "천부"], desc: "돈을 모으는 재주, 재물운의 그릇 크기와 금전 관리 능력을 상징합니다." },
  { id: -1, name: "", title: "", stars: [], isCenter: true },
  { id: -2, name: "", title: "", stars: [], isCenter: true },
  { id: 10, name: "유", title: "전택궁", stars: ["천동"], desc: "부동산 운, 주거 환경의 안정성, 가업 및 유산을 의미합니다." },
  { id: 4, name: "묘", title: "자녀궁", stars: ["태음"], desc: "자녀와의 인연, 성생활, 또는 내가 아끼는 아랫사람과의 관계를 나타냅니다." },
  { id: -3, name: "", title: "", stars: [], isCenter: true },
  { id: -4, name: "", title: "", stars: [], isCenter: true },
  { id: 11, name: "술", title: "복덕궁", stars: ["탐랑"], desc: "정신적 만족감, 숨겨진 취미, 정서적 안정 및 말년의 수명을 상징합니다." },
  { id: 3, name: "인", title: "부처궁", stars: ["염정"], desc: "연애 성향, 배우자와의 인연, 다가올 결혼 생활의 모습을 보여줍니다." },
  { id: 2, name: "축", title: "형제궁", stars: ["파군"], desc: "형제자매와의 인연, 동업자, 가장 가까운 대인관계의 득실을 뜻합니다." },
  { id: 1, name: "자", title: "명궁", stars: ["태음"], desc: "나의 본질적인 성격, 타고난 외모, 기질 및 일생의 가장 중요한 지표입니다." },
  { id: 12, name: "해", title: "부모궁", stars: [], desc: "부모님과의 인연, 윗사람(상사/선배)으로부터 받는 덕과 타고난 배경을 상징합니다." },
];

const gridPalaces = [
  palaces[0], palaces[1], palaces[2], palaces[3],
  palaces[4], palaces[5], palaces[6], palaces[7],
  palaces[8], palaces[9], palaces[10], palaces[11],
  palaces[12], palaces[13], palaces[14], palaces[15],
];

export default function ZiweiChart({ data }: { data: any }) {
  const [selectedPalace, setSelectedPalace] = useState<typeof palaces[0] | null>(null);

  return (
    <section className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--text-highlight)' }}>
          자미두수 명반 (궁을 클릭해보세요)
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 150px)',
          gap: '8px',
          marginTop: '2rem',
          position: 'relative'
        }}>
          {gridPalaces.map((palace, i) => {
            if (palace.isCenter) {
               return <div key={`center-${i}`} style={{ backgroundColor: 'transparent' }} />;
            }
            const isSelected = selectedPalace?.id === palace.id;

            return (
              <div 
                key={palace.id} 
                onClick={() => setSelectedPalace(palace)}
                style={{
                  border: isSelected ? '2px solid var(--glow-gold)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '8px',
                  background: isSelected ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255,255,255,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 0 15px rgba(255,215,0,0.2)' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: isSelected ? 'var(--glow-gold)' : 'var(--text-primary)' }}>{palace.title}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{palace.name}궁</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '4px', alignContent: 'flex-start' }}>
                  {palace.stars.map((star) => (
                    <span key={star} style={{ 
                      padding: '2px 6px', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem',
                      background: 'rgba(138, 43, 226, 0.2)',
                      border: '1px solid var(--glow-primary)',
                      color: 'var(--text-primary)'
                    }}>{star}</span>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(50% - 16px)',
            height: 'calc(50% - 16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--glow-gold)',
            borderRadius: '12px',
            boxShadow: '0 0 20px var(--glow-gold) inset',
            pointerEvents: 'none',
          }}>
            <h3 className="title-gradient" style={{ fontSize: '2rem', margin: 0 }}>천기누설</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{data?.name || "사용자"}의 명반</p>
          </div>
        </div>
      </div>

      {selectedPalace && (
        <div style={{
          padding: '1.5rem',
          background: 'rgba(255,215,0,0.05)',
          border: '1px solid var(--glow-gold)',
          borderRadius: '12px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <h3 style={{ color: 'var(--glow-gold)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✨ {selectedPalace.title} ({selectedPalace.name}궁)
          </h3>
          <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: '1.6' }}>
            {selectedPalace.desc}
          </p>
        </div>
      )}
    </section>
  );
}
