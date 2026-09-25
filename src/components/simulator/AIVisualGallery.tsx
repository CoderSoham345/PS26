import React, { useState } from 'react';
import { Sparkles, Eye, X, AlertCircle } from 'lucide-react';
import { Language, t } from '../../lib/i18n';

// Import generated real visual assets
import imgAffectedVillage from '../../assets/images/affected_village_1790362980693.jpg';
import imgProposedSite from '../../assets/images/proposed_site_1790362994013.jpg';
import imgRelocationRoute from '../../assets/images/relocation_route_1790363006638.jpg';
import imgNearbyHospital from '../../assets/images/nearby_hospital_1790363020664.jpg';
import imgNearbySchool from '../../assets/images/nearby_school_1790363033578.jpg';
import imgAfterRehab from '../../assets/images/after_rehab_1790363047041.jpg';

interface AIVisualGalleryProps {
  currentLang: Language;
}

export const AIVisualGallery: React.FC<AIVisualGalleryProps> = ({ currentLang }) => {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const galleryItems = [
    {
      num: '01',
      title: t('img01Title', currentLang),
      desc: t('img01Desc', currentLang),
      src: imgAffectedVillage,
      tag: 'Affected Settlement'
    },
    {
      num: '02',
      title: t('img02Title', currentLang),
      desc: t('img02Desc', currentLang),
      src: imgProposedSite,
      tag: 'Safe Plateau'
    },
    {
      num: '03',
      title: t('img03Title', currentLang),
      desc: t('img03Desc', currentLang),
      src: imgRelocationRoute,
      tag: 'Transit Corridor'
    },
    {
      num: '04',
      title: t('img04Title', currentLang),
      desc: t('img04Desc', currentLang),
      src: imgNearbyHospital,
      tag: 'Healthcare Access'
    },
    {
      num: '05',
      title: t('img05Title', currentLang),
      desc: t('img05Desc', currentLang),
      src: imgNearbySchool,
      tag: 'School & Shelter'
    },
    {
      num: '06',
      title: t('img06Title', currentLang),
      desc: t('img06Desc', currentLang),
      src: imgAfterRehab,
      tag: 'Rehabilitated Town'
    }
  ];

  return (
    <div className="space-y-3">
      {/* Gallery Header with Mandatory Non-Evidence Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded-md bg-[#10B981]/20 text-[#10B981]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#F8FAFC]">
              {t('aiVisualContext', currentLang)}
            </h3>
            <p className="text-[10px] text-[#64748B]">
              {t('aiVisualSubtitle', currentLang)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-[9px] text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 rounded-lg max-w-fit">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>Visual storytelling only — NOT GIS ground evidence</span>
        </div>
      </div>

      {/* 6 Horizontal Cards Desktop / Swipe Carousel Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 overflow-x-auto pb-1">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(item)}
            className="group relative bg-[#111827] border border-[#1E293B] hover:border-[#10B981]/60 rounded-2xl overflow-hidden shadow-md cursor-pointer transition-all hover:scale-[1.02]"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#0B0F17]">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-70" />

              {/* Number Pill */}
              <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-[#0B0F17]/85 border border-[#1E293B] text-[9px] font-mono font-black text-[#10B981]">
                {item.num}
              </span>

              {/* View Overlay on Hover */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-1.5 bg-[#10B981] text-slate-950 rounded-lg shadow-lg">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Meta */}
            <div className="p-2.5 space-y-1">
              <span className="text-[9px] uppercase font-bold text-[#64748B] block truncate">
                {item.tag}
              </span>
              <h4 className="text-[11px] font-black text-[#F8FAFC] leading-tight truncate">
                {item.title}
              </h4>
              <p className="text-[10px] text-[#94A3B8] leading-tight line-clamp-2">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Preview Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-[#0B0F17]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111827] border border-[#1E293B] max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl animate-fadeIn"
          >
            <div className="relative aspect-video w-full bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-[#0B0F17]/80 hover:bg-[#0B0F17] text-[#F8FAFC] border border-[#1E293B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#10B981]">
                  AI CONCEPTUAL ASSET • {selectedImage.num}
                </span>
                <span className="text-[10px] bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 px-2 py-0.5 rounded font-bold">
                  Conceptual Visual Only
                </span>
              </div>
              <h3 className="text-base font-black text-[#F8FAFC]">{selectedImage.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{selectedImage.desc}</p>

              <div className="pt-3 border-t border-[#1E293B] text-[10px] text-[#64748B] flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {t('aiStorytellingNotice', currentLang)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
