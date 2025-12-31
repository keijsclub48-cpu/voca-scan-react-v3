import { DiagnosisResult } from "../types";

export const DiagnosisPanel: React.FC<{ diagnosis: DiagnosisResult | null; isAnalyzing: boolean }> = ({
  diagnosis,
  isAnalyzing
}) => {
  if (!diagnosis) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-3xl">
        {isAnalyzing ? "解析中..." : "停止すると診断が表示されます"}
      </div>
    );
  }

  return (
    <div>
      <div className="text-6xl font-black">{diagnosis.score}</div>
      <div>{diagnosis.pitch.toFixed(1)} Hz</div>
      <div>{(diagnosis.stability * 100).toFixed(0)}%</div>
    </div>
  );
};
