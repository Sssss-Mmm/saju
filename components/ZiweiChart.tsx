import React from 'react';

// 자미두수 명반 (4x4 Grid, center is empty or contains user info)
// 궁 위치 가상의 데이터
const palaces = [
  { id: 6, name: "사", title: "질액궁", stars: ["천기", "거문"] },
  { id: 7, name: "오", title: "천이궁", stars: ["천상"] },
  { id: 8, name: "미", title: "노복궁", stars: ["태양", "천량"] },
  { id: 9, name: "신", title: "관록궁", stars: ["무곡", "칠살"] },
  { id: 5, name: "진", title: "재백궁", stars: ["자미", "천부"] },
  { id: 0, name: "", title: "", stars: [], isCenter: true }, // Empty Center Top
  { id: 0, name: "", title: "", stars: [], isCenter: true }, // Empty Center Bottom
  { id: 10, name: "유", title: "전택궁", stars: ["천동"] },
  { id: 4, name: "묘", title: "자녀궁", stars: ["태음"] },
  { id: 0, name: "", title: "", stars: [], isCenter: true }, // Empty Center Left
  { id: 0, name: "", title: "", stars: [], isCenter: true }, // Empty Center Right
  { id: 11, name: "술", title: "복덕궁", stars: ["탐랑"] },
  { id: 3, name: "인", title: "부처궁", stars: ["염정"] },
  { id: 2, name: "축", title: "형제궁", stars: ["파군"] },
  { id: 1, name: "자", title: "명궁", stars: ["태음"] },
  { id: 12, name: "해", title: "부모궁", stars: [] },
];

// Grid를 4x4로 만들기 위해 재배치
const gridPalaces = [
  palaces[0], palaces[1], palaces[2], palaces[3],
  palaces[4], palaces[5], palaces[6], palaces[7],
  palaces[8], palaces[9], palaces[10], palaces[11],
  palaces[12], palaces[13], palaces[14], palaces[15],
];

export default function ZiweiChart({ data }: { data: any }) {
  return (
    <section className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--text-highlight)' }}>자미두수 12궁 명반 (Zi Wei Dou Shu Chart)</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 150px)',
        gap: '8px',
        marginTop: '2rem'
      }}>
        {gridPalaces.map((palace, i) => {
          if (palace.isCenter) {
             return <div key={`center-${i}`} style={{ backgroundColor: 'transparent' }} />;
          }

          return (
            <div key={palace.id} style={{
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px',
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{palace.title}</span>
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
      </div>
      
      {/* Central Area Overlay (Optional positioning workaround) */}
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
    </section>
  );
}
