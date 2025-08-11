import PreferenceTotal from "../preference/PreferenceTotal";

export default function Mypreference({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <PreferenceTotal
      initialStep={1}
      showWelcome={false}
      onComplete={(data) => {
        //나중에 백 작업 들어가야하는곳 
        console.log("저장:", data);
        onClose();
      }}
      onClose={onClose}
    />
  );
}