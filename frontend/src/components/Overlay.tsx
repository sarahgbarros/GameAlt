type OverlayProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

function Overlay({ isSidebarOpen, setIsSidebarOpen }: OverlayProps) {
  if (!isSidebarOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 bg-black/60"
      onClick={() => setIsSidebarOpen(false)}
    ></div>
  );
}

export default Overlay;