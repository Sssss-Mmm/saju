"use client";

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BaziChart from '../../components/BaziChart';
import ZiweiChart from '../../components/ZiweiChart';
import AnalysisReport from '../../components/AnalysisReport';
import { StickyCta, ShareFab } from '../../components/ResultChrome';

function ResultView() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<{ bazi: any, ziwei: any } | null>(null);
  const [analysisText, setAnalysisText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(true);
  const [personName, setPersonName] = useState<string>("");
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = searchParams.get('name') || "이승민";
    setPersonName(name);

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

    }, 800);

  }, [searchParams]);

  if (!data) return <CastingChart />;

  const requestBody = { name: personName, bazi: data.bazi, ziwei: data.ziwei };

  return (
    <div className="report-surface">
      <div style={{ padding: '2rem 1rem', maxWidth: '720px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', margin: '0 0 8px', letterSpacing: '-0.02em' }}>심화 분석 결과</h1>
          <p style={{ color: 'var(--ink-mute)', margin: 0 }}>{personName}님의 명식과 12궁 명반</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <BaziChart data={data.bazi} />
          <ZiweiChart data={data.ziwei} />
          <div ref={reportRef}>
            <AnalysisReport
              contentHtml={analysisText}
              isLoading={isAnalyzing}
              requestBody={requestBody}
            />
          </div>
        </div>
      </div>

      <ShareFab name={personName} />
      <StickyCta onUnlock={() => reportRef.current?.scrollIntoView({ behavior: 'smooth' })} />
    </div>
  );
}

// 로딩 화면은 랜딩과 같은 다크 톤을 유지한다 (기대감 연출)
function CastingChart() {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div className="loader" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔮</div>
      <h2 className="title-gradient">우주의 기운을 모아 명반을 작성 중입니다...</h2>
    </div>
  );
}

// useSearchParams()는 Suspense 경계 안에서만 프리렌더된다.
export default function ResultPage() {
  return (
    <Suspense fallback={<CastingChart />}>
      <ResultView />
    </Suspense>
  );
}
