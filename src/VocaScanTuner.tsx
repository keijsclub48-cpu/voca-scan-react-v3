import React from "react";
import { usePitchEngine } from "./hooks/usePitchEngine";

const VocaScanTuner: React.FC = () => {
  const {
    isRunning,
    isAnalyzing,
    pitch,
    note,
    confidence,
    diagnosis,
    error,
    start,
    stop,
  } = usePitchEngine();

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <header className="text-center mb-6">
          <h1 className="text-3xl font-black text-blue-600 italic">
            VocaScan Tuner V3
          </h1>
          <p className="text-xs text-gray-400 mt-1">Professional Pitch Analyzer</p>
        </header>

        {/* リアルタイム表示 */}
        <div className={`rounded-2xl p-8 text-center mb-6 transition ${
          isRunning ? "bg-blue-50 ring-4 ring-blue-100" : "bg-gray-50"
        }`}>
          <div className="text-6xl font-mono font-black">{note}</div>
          <div className="text-lg text-blue-500 mt-2">
            {pitch ? `${pitch.toFixed(1)} Hz` : "--- Hz"}
          </div>

          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${(confidence * 100).toFixed(0)}%` }}
            />
          </div>
        </div>

        {/* 操作ボタン */}
        {!isRunning ? (
          <button
            onClick={start}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-xl hover:bg-black"
          >
            診断スタート
          </button>
        ) : (
          <button
            onClick={stop}
            disabled={isAnalyzing}
            className={`w-full py-4 rounded-2xl font-bold text-xl text-white ${
              isAnalyzing ? "bg-gray-400" : "bg-red-500 hover:bg-red-600 animate-pulse"
            }`}
          >
            {isAnalyzing ? "解析中…" : "停止して解析"}
          </button>
        )}

        {/* 結果表示 */}
        <div className="mt-8 pt-6 border-t border-gray-100">

          {isAnalyzing && (
            <p className="text-center text-blue-500 font-bold animate-pulse">
              データを解析しています…
            </p>
          )}

          {error && (
            <p className="text-center text-red-500 font-bold">
              {error}
            </p>
          )}

          {diagnosis && !error && !isAnalyzing && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl text-white">
                <p className="text-xs opacity-70">Total Score</p>
                <div className="text-6xl font-black">{diagnosis.score}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400">Pitch Avg</p>
                  <p className="text-xl font-bold">{diagnosis.pitch.toFixed(1)} Hz</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400">Stability</p>
                  <p className="text-xl font-bold">{(diagnosis.stability * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>
          )}

          {!diagnosis && !isAnalyzing && !error && (
            <p className="text-center text-gray-300 text-sm">
              停止するとここに診断結果が表示されます
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VocaScanTuner;
