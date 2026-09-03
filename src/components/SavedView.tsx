import React from 'react';
import { Bookmark, Star, ArrowRight, Trash2 } from 'lucide-react';
import { Practitioner } from '../types';
import { ALL_PRACTITIONERS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface SavedViewProps {
  savedPractitionerIds: string[];
  onSelectPractitioner: (p: Practitioner) => void;
  onToggleSave: (id: string) => void;
  onExploreSanctuary: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedPractitionerIds,
  onSelectPractitioner,
  onToggleSave,
  onExploreSanctuary
}) => {
  const { language, t } = useLanguage();
  const savedPractitioners = ALL_PRACTITIONERS.filter(p => savedPractitionerIds.includes(p.id));

  return (
    <div className="flex-1 w-full max-w-[720px] mx-auto pb-32 px-5 space-y-6 pt-4">
      <div className="flex items-baseline justify-between border-b border-[#dfcdb5] pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#8c6d3b]">
              {language === 'zh' ? '专属心愿名录' : 'Curated Shortlist'}
            </span>
          </div>
          <h1 className="font-serif text-2xl font-normal text-[#171513]">
            {t.savedPractitioners}
          </h1>
        </div>
        <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-[#f3ece0] border border-[#c8a97e]/35 text-[#8c6d3b] font-bold">
          {savedPractitioners.length} {language === 'zh' ? '已收藏' : 'Saved'}
        </span>
      </div>

      {savedPractitioners.length === 0 ? (
        <div className="text-center py-16 space-y-4 bg-white rounded-xl border border-[#c8a97e]/35 p-8 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#f3ece0] flex items-center justify-center mx-auto text-[#8c6d3b] border border-[#c8a97e]/40">
            <Bookmark className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-normal text-[#171513]">{t.noSavedYet}</h3>
          <p className="text-xs text-[#5e564e] max-w-xs mx-auto font-sans">
            {language === 'zh'
              ? '在探索新加坡各大院区时收藏心仪的名医与护理，以便在此一键快捷预约。'
              : 'Bookmark top Singapore estheticians and treatments while exploring the sanctuary to access them quickly here.'}
          </p>
          <button
            onClick={onExploreSanctuary}
            className="px-6 py-2.5 rounded-sm bg-[#141210] text-[#dfcdb5] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8c6d3b] hover:text-white transition-colors border border-[#b89058]/40 shadow-xs"
          >
            {t.exploreDirectory}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {savedPractitioners.map((practitioner) => (
            <div 
              key={practitioner.id}
              className="bg-white rounded-xl border border-[#c8a97e]/35 p-4 shadow-xs flex items-center justify-between gap-4 hover:border-[#b89058] transition-all"
            >
              <div 
                onClick={() => onSelectPractitioner(practitioner)}
                className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
              >
                <img 
                  src={practitioner.heroImage} 
                  alt={practitioner.name} 
                  className="w-16 h-16 rounded-lg object-cover border border-[#c8a97e]/40 shrink-0 shadow-xs"
                />
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-[#8c6d3b] block uppercase tracking-[0.2em]">
                    {practitioner.specialty}
                  </span>
                  <h3 className="font-serif text-base font-normal text-[#171513] truncate">
                    {practitioner.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#5e564e]">
                    <div className="flex items-center gap-1 text-[#8c6d3b] font-bold text-xs">
                      <Star className="w-3 h-3 text-[#b89058] fill-[#b89058]" />
                      <span>{practitioner.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{language === 'zh' ? '从' : 'From'} S${practitioner.startingPrice}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleSave(practitioner.id)}
                  aria-label="Remove bookmark"
                  className="w-8 h-8 rounded-sm bg-[#f3ece0] hover:bg-red-50 text-[#8c6d3b] hover:text-red-700 flex items-center justify-center transition-colors border border-[#c8a97e]/35"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectPractitioner(practitioner)}
                  className="h-8 px-3.5 rounded-sm bg-[#141210] hover:bg-[#8c6d3b] hover:text-white text-[#dfcdb5] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors border border-[#b89058]/40 shadow-xs"
                >
                  <span>{t.reserve}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
