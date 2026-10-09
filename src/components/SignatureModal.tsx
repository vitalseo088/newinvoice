import React, { useRef, useState, useEffect } from 'react';
import { X, Check, RotateCcw, Upload, PenTool } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string, name?: string, title?: string) => void;
  currentSignature?: string;
  currentName?: string;
  currentTitle?: string;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentSignature = '',
  currentName = '',
  currentTitle = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [tab, setTab] = useState<'draw' | 'upload'>('draw');
  const [name, setName] = useState(currentName);
  const [title, setTitle] = useState(currentTitle);
  const [uploadedUrl, setUploadedUrl] = useState<string>(currentSignature);

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setTitle(currentTitle);
      setUploadedUrl(currentSignature);
      setHasDrawn(false);
      setTimeout(clearCanvas, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, currentName, currentTitle, currentSignature, onClose]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1A3263';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setUploadedUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    let finalSignatureUrl = '';
    if (tab === 'draw') {
      const canvas = canvasRef.current;
      if (canvas && hasDrawn) {
        finalSignatureUrl = canvas.toDataURL('image/png');
      } else if (uploadedUrl && !hasDrawn) {
        finalSignatureUrl = uploadedUrl;
      }
    } else {
      finalSignatureUrl = uploadedUrl;
    }

    onSave(finalSignatureUrl, name, title);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs cursor-pointer animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white shadow-2xl overflow-hidden cursor-auto animate-in zoom-in-95 duration-150 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-[#F8FAFC]">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-2">
            <PenTool className="w-5 h-5 text-[#1A3263]" /> Add Signature
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-800 transition"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-5 text-sm">
          {/* Tab selector */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setTab('draw')}
              className={`pb-2.5 px-5 text-sm sm:text-base font-bold border-b-2 transition ${
                tab === 'draw'
                  ? 'border-[#1A3263] text-[#1A3263]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Draw Signature
            </button>
            <button
              onClick={() => setTab('upload')}
              className={`pb-2.5 px-5 text-sm sm:text-base font-bold border-b-2 transition ${
                tab === 'upload'
                  ? 'border-[#1A3263] text-[#1A3263]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Upload Image
            </button>
          </div>

          {tab === 'draw' ? (
            <div>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={460}
                  height={160}
                  className="w-full h-[160px] cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-sm font-medium">
                    Sign above using mouse, pen, or touch
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-2.5">
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
                >
                  <RotateCcw className="w-4 h-4" /> Clear canvas
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-7 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-[#1A3263] transition">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-base font-bold text-gray-800">Choose signature image file</span>
                <span className="text-xs text-gray-500 mt-1">PNG with transparent background recommended</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>

              {uploadedUrl && (
                <div className="mt-3.5 p-3 border border-gray-200 rounded-xl bg-white flex items-center justify-between">
                  <img src={uploadedUrl} alt="Signature Preview" className="h-14 object-contain" />
                  <button
                    type="button"
                    onClick={() => setUploadedUrl('')}
                    className="text-xs sm:text-sm font-semibold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Printed name and title */}
          <div className="grid grid-cols-2 gap-3.5 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Signer's Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2 focus:border-[#1A3263] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Signer's Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Managing Director"
                className="w-full text-sm sm:text-base border border-[#B8C0CC] rounded-lg px-3.5 py-2 focus:border-[#1A3263] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 bg-[#F8FAFC]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#1A3263] hover:bg-[#132549] rounded-lg shadow-sm transition"
          >
            <Check className="w-4 h-4" /> Apply Signature
          </button>
        </div>
      </div>
    </div>
  );
};
