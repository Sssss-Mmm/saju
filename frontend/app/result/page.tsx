"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BaziChart from '../../components/BaziChart';
import ZiweiChart from '../../components/ZiweiChart';
import AnalysisReport from '../../components/AnalysisReport';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<{ bazi: any, ziwei: any } | null>(null);
  const [analysisText, setAnalysisText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(true);

  useEffect(() => {
    const name = searchParams.get('name') || "이승민";
    
    // 1. 사주/자미두수 데이터 준비 (iztro 등 연동 전 더미)
    const simulatedData = {
      bazi: { name },
      ziwei: { name }
    };

    setTimeout(() => {
      setData(simulatedData);
      
      // 2. 데이터가 준비되면 AI 분석 요청
      fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bazi: simulatedData.bazi, ziwei: simulatedData.ziwei }),
      })
      .then(res => res.json())
      .then(json => {
        if (json.content) setAnalysisText(json.content);
      })
      .catch(err => console.error(err))
      .finally(() => setIsAnalyzing(false));

    }, 800); // 명식 기본 계산 대기시간 시뮬레이션

  }, [searchParams]);

  if (!data) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div className="loader" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔮</div>
        <h2 className="title-gradient">우주의 기운을 모아 명반을 작성 중입니다...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className="title-gradient" style={{ fontSize: '2.5rem' }}>심화 분석 결과</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{searchParams.get('name')}님의 명식과 12궁 명반</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <BaziChart data={data.bazi} />
        <ZiweiChart data={data.ziwei} />
        <AnalysisReport contentHtml={analysisText} isLoading={isAnalyzing} />
      </div>
    </div>
  );
}
