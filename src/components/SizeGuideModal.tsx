import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const measurementsInches = [
    { size: 'S', chest: '36 - 38', shoulder: '17.5', length: '29.0', sleeve: '33.5', neck: '14.5 - 15.0' },
    { size: 'M', chest: '39 - 41', shoulder: '18.2', length: '29.5', sleeve: '34.5', neck: '15.5 - 16.0' },
    { size: 'L', chest: '42 - 44', shoulder: '19.0', length: '30.2', sleeve: '35.5', neck: '16.5 - 17.0' },
    { size: 'XL', chest: '45 - 47', shoulder: '19.8', length: '31.0', sleeve: '36.5', neck: '17.5 - 18.0' },
    { size: 'XXL', chest: '48 - 50', shoulder: '20.5', length: '31.5', sleeve: '37.0', neck: '18.5 - 19.0' },
  ];

  const measurementsCm = [
    { size: 'S', chest: '91 - 96', shoulder: '44.5', length: '73.5', sleeve: '85.0', neck: '37 - 38' },
    { size: 'M', chest: '99 - 104', shoulder: '46.2', length: '75.0', sleeve: '87.5', neck: '39 - 40' },
    { size: 'L', chest: '106 - 112', shoulder: '48.2', length: '76.7', sleeve: '90.0', neck: '42 - 43' },
    { size: 'XL', chest: '114 - 119', shoulder: '50.3', length: '78.7', sleeve: '92.7', neck: '44 - 45' },
    { size: 'XXL', chest: '122 - 127', shoulder: '52.0', length: '80.0', sleeve: '94.0', neck: '47 - 48' },
  ];

  const data = unit === 'inches' ? measurementsInches : measurementsCm;

  return (
    <div
      id="size-guide-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={() => setIsSizeGuideOpen(false)}
    >
      <div
        id="size-guide-modal-content"
        className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-size-guide-btn"
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-950">ATTRXNWEAR Size & Fit Guide</h3>
            <p className="text-xs text-neutral-500">Master Tailored Proportions for All Men</p>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <span className="text-xs font-semibold text-neutral-700">Body Measurements</span>
          <div className="inline-flex rounded-lg bg-neutral-100 p-1">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                unit === 'inches' ? 'bg-white shadow text-neutral-950' : 'text-neutral-500'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                unit === 'cm' ? 'bg-white shadow text-neutral-950' : 'text-neutral-500'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-100/70 text-neutral-700 uppercase tracking-wider font-bold text-[11px] border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Chest</th>
                <th className="px-4 py-3">Shoulder</th>
                <th className="px-4 py-3">Length</th>
                <th className="px-4 py-3">Sleeve</th>
                <th className="px-4 py-3">Neck</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {data.map((row) => (
                <tr key={row.size} className="hover:bg-neutral-50 font-medium">
                  <td className="px-4 py-3 font-bold text-neutral-950 bg-neutral-50/50">
                    {row.size}
                  </td>
                  <td className="px-4 py-3 text-neutral-800">{row.chest}</td>
                  <td className="px-4 py-3 text-neutral-800">{row.shoulder}</td>
                  <td className="px-4 py-3 text-neutral-800">{row.length}</td>
                  <td className="px-4 py-3 text-neutral-800">{row.sleeve}</td>
                  <td className="px-4 py-3 text-neutral-800">{row.neck}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Advice */}
        <div className="mt-6 bg-neutral-50 rounded-xl p-4 border border-neutral-100 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Fit Recommendations by Silhouette
          </h4>
          <ul className="text-xs text-neutral-600 space-y-1.5 pl-5 list-disc">
            <li><strong>Slim Fit:</strong> Tapered through the chest and waist. We recommend true to size, or size up if you prefer a relaxed chest.</li>
            <li><strong>Regular Fit:</strong> Traditional cut with generous room through the body and arms for everyday comfort.</li>
            <li><strong>Relaxed / Camp Fit:</strong> Dropped shoulders and straighter hems for untucked weekend styling.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
