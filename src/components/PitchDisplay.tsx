interface Props {
  note: string;
  pitch: number | null;
}

export const PitchDisplay: React.FC<Props> = ({ note, pitch }) => (
  <>
    <div className="text-7xl font-mono font-black text-gray-800 tracking-tighter">
      {note || "--"}
    </div>
    <div className="text-lg font-medium text-blue-500 mt-2">
      {pitch ? `${pitch.toFixed(1)} Hz` : "--- Hz"}
    </div>
  </>
);
