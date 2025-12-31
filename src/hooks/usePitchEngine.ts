import { useState, useRef, useCallback, useEffect } from "react";
import { CrepeEngine } from "../audio/CrepeEngine";
import { PitchAnalyzer } from "../audio/PitchAnalyzer";
import { PitchData, DiagnosisResult } from "../types";

export function usePitchEngine() {
  const engineRef = useRef(new CrepeEngine());
  const analyzerRef = useRef(new PitchAnalyzer());

  const [isRunning, setIsRunning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pitchData, setPitchData] = useState<PitchData>({
    pitch: null,
    note: "--",
    confidence: 0,
  });

  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  const start = useCallback(async () => {
    if (isRunning) return;
    setError(null);
    setDiagnosis(null);
    analyzerRef.current.reset();

    try {
      await engineRef.current.start(freq => {
        const result = analyzerRef.current.analyze(freq);
        if (result) setPitchData(result);
      });
      setIsRunning(true);
    } catch (e: any) {
      setError(e.message || "マイクの初期化に失敗しました");
    }
  }, [isRunning]);

  const stop = useCallback(async () => {
    if (!isRunning) return;
    setIsRunning(false);
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await engineRef.current.stop();
      setDiagnosis(result);
    } catch (e: any) {
      console.error(e);
      setError("解析に失敗しました。API通信を確認してください。");
    } finally {
      setIsAnalyzing(false);
    }
  }, [isRunning]);

  useEffect(() => {
    return () => {
      engineRef.current.stop().catch(() => {});
    };
  }, []);

  return {
    isRunning,
    isAnalyzing,
    error,
    ...pitchData,
    diagnosis,
    start,
    stop,
  };
}
