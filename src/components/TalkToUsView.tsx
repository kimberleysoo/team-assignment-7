import React, { useEffect, useState, useRef } from 'react';
import { 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  Sparkles, 
  RefreshCw, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { AppLanguage } from '../types';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: any) => void;
      }) => void;
    };
    disqus_config?: (this: any) => void;
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
  const [loadStatus, setLoadStatus] = useState<'loading' | 'ready' | 'blocked'>('loading');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const pollTimerRef = useRef<number | null>(null);

  const isZh = language === 'zh';

  const loadDisqus = () => {
    setIsReloading(true);
    setLoadStatus('loading');

    const container = document.getElementById('disqus_thread');
    if (!container) {
      setIsReloading(false);
      return;
    }

    try {
      // Safe config handler that never throws if 'this' or 'page' is undefined
      const applyConfig = function (this: any) {
        const target = this || window;
        if (!target.page) {
          target.page = {};
        }
        target.page.url = PAGE_URL;
        target.page.identifier = PAGE_IDENTIFIER;
        target.page.title = isZh
          ? 'ÉLAN 艾澜私享中心 — 咨询我们与贵宾交流'
          : 'ÉLAN Singapore — Talk to Us & Concierge Dialogue';
      };

      if (typeof window !== 'undefined' && window.DISQUS) {
        // SPA reload: Disqus reset
        window.DISQUS.reset({
          reload: true,
          config: applyConfig
        });
        setLoadStatus('ready');
        setTimeout(() => setIsReloading(false), 500);
      } else {
        window.disqus_config = applyConfig;

        // Check if embed script already exists
        let existingScript = document.getElementById('disqus-embed-script') as HTMLScriptElement | null;
        if (!existingScript) {
          const d = document;
          const s = d.createElement('script');
          s.id = 'disqus-embed-script';
          s.src = 'https://elan-3.disqus.com/embed.js';
          s.setAttribute('data-timestamp', String(+new Date()));
          s.async = true;

          s.onload = () => {
            setLoadStatus('ready');
            setIsReloading(false);
          };

          s.onerror = () => {
            // Likely blocked by browser ad-blocker or iframe cookie restrictions
            setLoadStatus('blocked');
            setIsReloading(false);
          };

          (d.head || d.body).appendChild(s);
        } else {
          // Script tag exists; poll for window.DISQUS initialization
          let attempts = 0;
          if (pollTimerRef.current) clearInterval(pollTimerRef.current);
          pollTimerRef.current = window.setInterval(() => {
            attempts++;
            if (window.DISQUS) {
              if (pollTimerRef.current) clearInterval(pollTimerRef.current);
              try {
                window.DISQUS.reset({
                  reload: true,
                  config: applyConfig
                });
                setLoadStatus('ready');
              } catch (err) {
                console.warn('Disqus reset error:', err);
              }
              setIsReloading(false);
            } else if (attempts > 12) {
              if (pollTimerRef.current) clearInterval(pollTimerRef.current);
              // If not loaded after ~2.4s, likely ad-blocked or iframe restricted
              setLoadStatus('blocked');
              setIsReloading(false);
            }
          }, 200);
        }

        // Count script injection (non-blocking)
        if (!document.getElementById('dsq-count-scr')) {
          const cs = document.createElement('script');
          cs.id = 'dsq-count-scr';
          cs.src = 'https://elan-3.disqus.com/count.js';
          cs.async = true;
          (document.head || document.body).appendChild(cs);
        }
      }
    } catch (err) {
      console.warn('Disqus initialization caught:', err);
      setLoadStatus('blocked');
      setIsReloading(false);
    }
  };

  useEffect(() => {
    // Delay slightly to let React complete initial layout of #disqus_thread
    const timer = setTimeout(() => {
      loadDisqus();
    }, 150);

    return () => {
      clearTimeout(timer);
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
    };
  }, [language]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryMessage('');
      setInquiryName('');
      setTimeout(() => setInquirySubmitted(false), 5000);
    }, 800);
  };

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

      {/* Direct Contact Channels */}
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

      {/* Discussion Forum Section with Disqus embed */}
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

        {/* Informative Guidance */}
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
          {/* Active Disqus Embed Thread */}
          <div id="disqus_thread" className="w-full"></div>

          {/* Ad-blocker or iframe cookie restriction notice (fallback) */}
          {loadStatus === 'blocked' && (
            <div className="mt-4 p-5 rounded-2xl bg-[#faf7f2] border border-[#e8dfd5] text-center">
              <AlertCircle className="w-6 h-6 text-[#b89058] mx-auto mb-2" />
              <h3 className="font-serif text-sm font-semibold text-[#171513] mb-1">
                {isZh ? '第三方评论加载受限' : 'Disqus Thread Protected in Preview'}
              </h3>
              <p className="text-xs text-[#6e655f] max-w-md mx-auto mb-4 leading-relaxed">
                {isZh
                  ? '若浏览器或广告拦截插件限制了第三方 Cookie，您可直接在新窗口中打开官方讨论页，或通过下方礼宾快捷留言表单咨询。'
                  : 'If browser privacy shields or sandbox settings prevent third-party cookies, you can open the thread directly in a new tab or message our concierge directly below.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`https://elan-3.disqus.com/?url=${encodeURIComponent(PAGE_URL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1c1916] text-[#dfcdb5] text-xs font-medium hover:text-white transition-colors"
                >
                  <span>{isZh ? '新窗口打开 Disqus 讨论板' : 'Open in Disqus Window'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={loadDisqus}
                  className="px-4 py-2 rounded-xl border border-[#e8dfd5] bg-white text-xs font-medium text-[#171513] hover:border-[#b89058] transition-colors cursor-pointer"
                >
                  {isZh ? '重试连接' : 'Retry Connection'}
                </button>
              </div>
            </div>
          )}

          <noscript>
            <div className="p-6 text-center text-sm text-[#8c827a] bg-[#faf7f2] rounded-2xl border border-[#e8dfd5]">
              Please enable JavaScript to view the{' '}
              <a href="https://disqus.com/?ref_noscript" className="text-[#b89058] underline font-medium" rel="noreferrer" target="_blank">
                comments powered by Disqus.
              </a>
            </div>
          </noscript>
        </div>

        {/* Direct In-App Concierge Inquiry Form (always available) */}
        <div className="mt-8 pt-6 border-t border-[#e8dfd5]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-sm font-semibold text-[#171513]">
              {isZh ? '直接向私享礼宾主任留言' : 'Direct Inquiry to Master Concierge'}
            </h3>
            <span className="text-[11px] text-[#b89058] font-medium">
              {isZh ? '保密直达' : 'Private & Direct'}
            </span>
          </div>

          {inquirySubmitted ? (
            <div className="p-4 rounded-xl bg-[#eef7ee] border border-[#a3d9a5] text-[#226325] text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                {isZh
                  ? '感谢您的留言！礼宾主任已收到您的咨询，将在2小时内通过微信或电话与您联络。'
                  : 'Thank you for your message! Our master concierge has received your request and will respond within 2 hours.'}
              </span>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder={isZh ? '尊称 (如：陈女士 / Mr. Tan)' : 'Your Name / Title (e.g. Ms. Tan)'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e8dfd5] text-xs focus:outline-hidden focus:border-[#b89058] text-[#171513]"
                />
                <div className="text-[11px] text-[#8c827a] flex items-center px-1">
                  {isZh ? '将优先由新加坡当值总监回复' : 'Routed directly to the Singapore head of concierge'}
                </div>
              </div>

              <textarea
                rows={3}
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                required
                placeholder={isZh ? '请输入您的问题，例如：“我适合哪位美疗师？”或“妊娠期间有哪些推荐项目？”' : 'Enter your question, e.g. "Which master esthetician suits sensitive rosacea?"'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e8dfd5] text-xs focus:outline-hidden focus:border-[#b89058] text-[#171513] resize-none"
              />

              <div className="flex items-center justify-between">
                <p className="text-[10px] text-[#8c827a]">
                  {isZh ? '全程加密传输，恪守新加坡私隐法案' : 'Encrypted transmission, compliant with Singapore PDPA'}
                </p>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1c1916] text-[#dfcdb5] hover:text-white text-xs font-semibold border border-[#b89058]/40 hover:border-[#b89058] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-[#b89058]" />
                  <span>{isZh ? '发送私享咨询' : 'Send Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
