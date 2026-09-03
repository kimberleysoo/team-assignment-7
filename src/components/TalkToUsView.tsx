import React, { useEffect, useState } from 'react';
import { MessageSquare, ShieldCheck, Clock, Phone, Mail, Sparkles, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { AppLanguage } from '../types';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: {
          page: {
            url?: string;
            identifier?: string;
            title?: string;
          };
        }) => void;
      }) => void;
    };
    disqus_config?: (this: {
      page: {
        url?: string;
        identifier?: string;
        title?: string;
      };
    }) => void;
  }
}

interface TalkToUsViewProps {
  language: AppLanguage;
  onExploreSanctuary?: () => void;
}

const PAGE_URL = 'https://elan-singapore.com/talk-to-us';
const PAGE_IDENTIFIER = 'elan-talk-to-us-sanctuary';

export const TalkToUsView: React.FC<TalkToUsViewProps> = ({
  language,
  onExploreSanctuary
}) => {
  const [isReloading, setIsReloading] = useState(false);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const isZh = language === 'zh';

  const loadDisqus = () => {
    setIsReloading(true);

    try {
      if (typeof window !== 'undefined' && window.DISQUS) {
        // Reload existing Disqus instance for this SPA tab view
        window.DISQUS.reset({
          reload: true,
          config: function () {
            this.page.url = PAGE_URL;
            this.page.identifier = PAGE_IDENTIFIER;
            this.page.title = isZh
              ? 'ÉLAN 艾澜私享中心 — 咨询我们与贵宾交流'
              : 'ÉLAN Singapore — Talk to Us & Concierge Dialogue';
          }
        });
        setLoadStatus('ready');
        setTimeout(() => setIsReloading(false), 600);
      } else {
        // Initial setup of disqus_config
        window.disqus_config = function () {
          this.page.url = PAGE_URL;
          this.page.identifier = PAGE_IDENTIFIER;
          this.page.title = isZh
            ? 'ÉLAN 艾澜私享中心 — 咨询我们与贵宾交流'
            : 'ÉLAN Singapore — Talk to Us & Concierge Dialogue';
        };

        // Check if embed script is already injected
        const existingScript = document.getElementById('disqus-embed-script');
        if (!existingScript) {
          const d = document;
          const s = d.createElement('script');
          s.id = 'disqus-embed-script';
          s.src = 'https://elan-3.disqus.com/embed.js';
          s.setAttribute('data-timestamp', String(+new Date()));
          s.onload = () => {
            setLoadStatus('ready');
            setIsReloading(false);
          };
          s.onerror = () => {
            setLoadStatus('error');
            setIsReloading(false);
          };
          (d.head || d.body).appendChild(s);
        } else {
          // If script tag exists but window.DISQUS not immediately ready, poll briefly
          let attempts = 0;
          const interval = setInterval(() => {
            attempts++;
            if (window.DISQUS) {
              clearInterval(interval);
              window.DISQUS.reset({
                reload: true,
                config: function () {
                  this.page.url = PAGE_URL;
                  this.page.identifier = PAGE_IDENTIFIER;
                }
              });
              setLoadStatus('ready');
              setIsReloading(false);
            } else if (attempts > 15) {
              clearInterval(interval);
              setLoadStatus('ready');
              setIsReloading(false);
            }
          }, 200);
        }

        // Count script injection if not present
        if (!document.getElementById('dsq-count-scr')) {
          const cs = document.createElement('script');
          cs.id = 'dsq-count-scr';
          cs.src = '//elan-3.disqus.com/count.js';
          cs.async = true;
          (document.head || document.body).appendChild(cs);
        }
      }
    } catch (e) {
      console.error('Error loading Disqus:', e);
      setLoadStatus('error');
      setIsReloading(false);
    }
  };

  useEffect(() => {
    // Slight delay to ensure the <div id="disqus_thread"></div> DOM element is mounted in React
    const timer = setTimeout(() => {
      loadDisqus();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [language]);

  return (
    <div className="max-w-[720px] mx-auto px-4 pt-4 pb-28 text-[#171513]">
      {/* Header Banner */}
      <section className="bg-[#1c1916] text-[#faf7f2] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#b89058]/30 relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#b89058]/20 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a241f] border border-[#b89058]/40 text-[#dfcdb5] text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#b89058]" />
            <span>{isZh ? '专属咨询与社群交流' : 'Direct Concierge & Client Dialogue'}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-white mb-2">
            {isZh ? '咨询我们' : 'Talk to Us'}
          </h1>

          <p className="text-[#dfcdb5]/80 text-sm sm:text-base leading-relaxed max-w-xl mb-5 font-light">
            {isZh
              ? '欢迎向艾澜专属礼宾团队与认证美疗专家提问。无论是疗程定制建议、禁忌症咨询或服务体验反馈，我们将竭诚为您解答。'
              : 'Connect directly with the ÉLAN concierge team, certified master estheticians, and discerning clientele. Ask questions, clarify protocols, or share your sanctuary experience.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#b89058] shrink-0" />
              <div>
                <p className="text-white font-medium">{isZh ? '2小时内回复' : '< 2hr Response'}</p>
                <p className="text-[#dfcdb5]/60 text-[10px]">{isZh ? '礼宾在线时段' : 'Daily 09:00 - 21:00'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#b89058] shrink-0" />
              <div>
                <p className="text-white font-medium">{isZh ? '医师与总监亲审' : 'Director Reviewed'}</p>
                <p className="text-[#dfcdb5]/60 text-[10px]">{isZh ? '新加坡医疗标准' : 'Singapore Med Standards'}</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#b89058] shrink-0" />
              <div>
                <p className="text-white font-medium">{isZh ? '隐私与保密协议' : 'Private & Discreet'}</p>
                <p className="text-[#dfcdb5]/60 text-[10px]">{isZh ? '严守客人私隐' : 'Client Privacy Guaranteed'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Direct Channels */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <a
          href="tel:+6567388899"
          className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#e8dfd5] shadow-xs hover:border-[#b89058] transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#faf7f2] border border-[#e8dfd5] flex items-center justify-center text-[#b89058] group-hover:bg-[#b89058] group-hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#8c827a] font-medium">{isZh ? '新加坡贵宾专线' : 'Singapore VIP Hotline'}</div>
            <div className="text-sm font-semibold text-[#171513]">+65 6738 8899</div>
          </div>
        </a>

        <a
          href="mailto:concierge@elan-singapore.com"
          className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#e8dfd5] shadow-xs hover:border-[#b89058] transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#faf7f2] border border-[#e8dfd5] flex items-center justify-center text-[#b89058] group-hover:bg-[#b89058] group-hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#8c827a] font-medium">{isZh ? '专属电子礼宾信箱' : 'Concierge Email'}</div>
            <div className="text-sm font-semibold text-[#171513]">concierge@elan-singapore.com</div>
          </div>
        </a>
      </section>

      {/* Disqus Discussion Forum Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd5] shadow-sm relative">
        <div className="flex items-center justify-between pb-5 border-b border-[#e8dfd5] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#b89058]/10 text-[#b89058] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#171513]">
                {isZh ? '在线留言与社群互动' : 'Public Discussion & Feedback'}
              </h2>
              <p className="text-xs text-[#8c827a]">
                {isZh ? '由 Disqus 提供实时讨论与评论支持' : 'Powered by Disqus realtime discussion network'}
              </p>
            </div>
          </div>

          <button
            onClick={loadDisqus}
            disabled={isReloading}
            aria-label="Reload discussion thread"
            title="Reload discussion thread"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8dfd5] hover:border-[#b89058] text-xs font-medium text-[#6e655f] hover:text-[#171513] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#b89058] ${isReloading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isZh ? '刷新留言' : 'Refresh'}</span>
          </button>
        </div>

        {/* Informative tips */}
        <div className="bg-[#faf7f2] rounded-xl p-3.5 border border-[#e8dfd5]/80 text-xs text-[#6e655f] mb-6 flex items-start gap-2.5">
          <Send className="w-4 h-4 text-[#b89058] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {isZh
              ? '请在下方畅所欲言。您可以提出任何关于护理细节、专家资质或私享设施的问题。我们的礼宾主任将在第一时间答复。'
              : 'Leave a comment or question below. You may inquire about bespoke skin diagnostics, practitioner schedules, or session preparation.'}
          </p>
        </div>

        {/* Disqus Thread Container */}
        <div className="min-h-[360px] relative">
          <div id="disqus_thread" className="w-full"></div>
          
          <noscript>
            <div className="p-6 text-center text-sm text-[#8c827a] bg-[#faf7f2] rounded-2xl border border-[#e8dfd5]">
              Please enable JavaScript to view the{' '}
              <a href="https://disqus.com/?ref_noscript" className="text-[#b89058] underline font-medium" rel="noreferrer" target="_blank">
                comments powered by Disqus.
              </a>
            </div>
          </noscript>
        </div>
      </section>
    </div>
  );
};
