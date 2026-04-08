'use client';
import InputForm from '../components/InputForm';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800 }}>천기누설 (天機漏洩)</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          사주팔자와 자미두수를 결합한 프리미엄 운세 심화 분석
        </p>
      </div>
      
      <InputForm />
    </main>
  );
}
