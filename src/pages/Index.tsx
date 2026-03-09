import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type AnyString = string;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c7001507-fa02-4ba3-9394-115f720ab280/files/8eec50b9-973a-4de7-a146-e94200791105.jpg";
const BG_IMAGE = "https://cdn.poehali.dev/projects/c7001507-fa02-4ba3-9394-115f720ab280/files/a309ec45-bc17-4207-abe5-fe5eeab3724b.jpg";

const advantages = [
  { icon: "TrendingUp", text: "В 3 раза выше ретеншен по сравнению с обычным казино" },
  { icon: "Users", text: "Рекомендуется более чем 10 000+ инфлюенсерами" },
  { icon: "UserX", text: "Не требуется регистрация пользователя" },
  { icon: "Smartphone", text: "Удобный и понятный интерфейс" },
  { icon: "Code2", text: "Webview модуль для интеграции в приложения" },
  { icon: "BarChart2", text: "Промо материалы для партнёров" },
  { icon: "CreditCard", text: "Широкий выбор платёжных методов" },
  { icon: "Gamepad2", text: "Все известные мировые игровые продукты" },
];

const revsharePoints = [
  { icon: "Repeat", text: "Стабильный пассивный доход — получайте свой процент, пока платформа работает" },
  { icon: "Globe", text: "Источники трафика практически не ограничены" },
  { icon: "DollarSign", text: "RevShare даёт больший профит, чем CPA-модель при качественном трафике" },
  { icon: "Target", text: "Таргетирование позволяет увеличить прибыль ещё больше" },
  { icon: "Link", text: "Субпартнёр приносит вам 10% прибыли платформы, 2-й уровень — 2%" },
];

const geos = [
  { code: "🇷🇺", name: "Россия", tag: "RU" },
  { code: "🇰🇿", name: "Казахстан", tag: "KZ" },
  { code: "🇺🇿", name: "Узбекистан", tag: "UZ" },
  { code: "🌐", name: "Бурж", tag: "БУРЖ" },
  { code: "₿", name: "Крипта", tag: "CRYPTO" },
];

const tools = [
  { icon: "Image", label: "Баннеры" },
  { icon: "Layout", label: "Лендинги" },
  { icon: "Play", label: "Видео" },
  { icon: "Smartphone", label: "Мобильные приложения" },
];

const faqItems = [
  {
    q: "Что такое Аффилированная программа LuckyBear?",
    a: "LuckyBear Partners — это партнёрская программа казино LuckyBear, которая позволяет вам зарабатывать на привлечении игроков. Вы получаете процент от дохода платформы за каждого активного игрока, которого привлекли.",
  },
  {
    q: "Какие источники трафика принимаются?",
    a: "Принимаем трафик из социальных сетей, Telegram, YouTube, TikTok, веб-сайтов, приложений и других источников. Запрещён спам, фрод и трафик из запрещённых ГЕО.",
  },
  {
    q: "Какие KPI для трафика?",
    a: "Минимальное количество депозитов в месяц согласовывается индивидуально. Важно качество трафика — активные игроки, совершающие регулярные пополнения.",
  },
  {
    q: "Какие ГЕО принимаются к оплате?",
    a: "Основные ГЕО: Россия (RU), Казахстан (KZ), Узбекистан (UZ). Также принимается бурж трафик и крипта. Точный список актуальных ГЕО уточняйте у менеджера.",
  },
  {
    q: "Преимущества RevShare модели",
    a: "RevShare обеспечивает долгосрочный пассивный доход. Ставка 50–65% от прибыли платформы. Доход растёт вместе с активностью привлечённых игроков. Субпартнёрская программа 2 уровней.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--lb-dark)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(6, 11, 18, 0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(212,160,23,0.1)" }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-float">🐻</span>
          <span className="font-oswald text-xl font-bold tracking-widest" style={{ color: "var(--lb-gold2)" }}>
            LUCKY<span style={{ color: "#fff" }}>BEAR</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[["#advantages","Преимущества"],["#models","Модели"],["#geo","ГЕО"],["#faq","FAQ"]].map(([href,label]) => (
            <a key={href} href={href} className="text-sm font-golos text-gray-400 hover:text-white transition-colors">{label}</a>
          ))}
        </div>
        <button className="btn-gold px-5 py-2 rounded-lg text-sm relative z-10">
          Подключить
        </button>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={BG_IMAGE} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,11,18,0.95) 0%, rgba(6,11,18,0.7) 50%, rgba(6,11,18,0.9) 100%)" }} />
        </div>
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 animate-rotate-slow"
          style={{ background: "conic-gradient(from 0deg, transparent, var(--lb-gold2), transparent)", filter: "blur(2px)" }} />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, var(--lb-gold2), transparent)" }} />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-slide-up"
              style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.3)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse-gold" style={{ background: "var(--lb-gold2)" }} />
              <span className="text-xs font-golos tracking-widest uppercase" style={{ color: "var(--lb-gold2)" }}>Партнёрская программа</span>
            </div>

            <h1 className="font-oswald text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up stagger-1" style={{ animationFillMode: "both" }}>
              <span style={{ color: "#fff" }}>ЗАРАБАТЫВАЙ</span><br />
              <span className="gold-text-gradient">ДО 65%</span><br />
              <span style={{ color: "#fff" }}>RevShare</span>
            </h1>

            <p className="font-golos text-lg text-gray-300 mb-8 leading-relaxed animate-slide-up stagger-2" style={{ animationFillMode: "both" }}>
              Платформа казино, рекомендуемая более чем <strong style={{ color: "var(--lb-gold2)" }}>10 000+</strong> инфлюенсерами.
              CPA до $100. ГЕО: СНГ, Бурж, Крипта.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up stagger-3" style={{ animationFillMode: "both" }}>
              <button className="btn-gold px-8 py-4 rounded-xl text-base relative z-10">
                Стать партнёром
              </button>
              <button className="btn-outline-gold px-8 py-4 rounded-xl text-base">
                Играть сейчас
              </button>
            </div>

            <div className="flex items-center gap-8 mt-10 animate-slide-up stagger-4" style={{ animationFillMode: "both" }}>
              {[
                { label: "RevShare", value: 65, suffix: "%" },
                { label: "CPA до", value: 100, suffix: "$" },
                { label: "Инфлюенсеров", value: 10000, suffix: "+" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-oswald text-3xl font-bold gold-text-gradient">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs font-golos text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end animate-fade-scale stagger-2" style={{ animationFillMode: "both" }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl glow-gold" style={{ transform: "scale(1.05)" }} />
              <img
                src={HERO_IMAGE}
                alt="LuckyBear Partners"
                className="relative z-10 w-full max-w-md rounded-3xl object-cover animate-float"
                style={{ border: "2px solid rgba(212,160,23,0.3)", maxHeight: "500px" }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* STATS */}
      <AnimSection>
        <div className="py-12 overflow-hidden" style={{ background: "linear-gradient(90deg, var(--lb-dark2), var(--lb-dark3), var(--lb-dark2))" }}>
          <div className="flex flex-wrap justify-center gap-6 px-6">
            {[
              { icon: "Users", val: "10 000+", label: "Инфлюенсеров" },
              { icon: "TrendingUp", val: "3×", label: "Выше ретеншен" },
              { icon: "Globe", val: "5 ГЕО", label: "Активных регионов" },
              { icon: "Clock", val: "24/7", label: "Поддержка" },
            ].map((s) => (
              <div key={s.label} className="stat-card flex items-center gap-4 px-8 py-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "var(--lb-gold2)" }} />
                </div>
                <div>
                  <div className="font-oswald text-2xl font-bold" style={{ color: "var(--lb-gold2)" }}>{s.val}</div>
                  <div className="text-xs text-gray-500 font-golos">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimSection>

      <div className="section-divider" />

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <AnimSection>
            <div className="text-center mb-16">
              <span className="text-xs font-oswald tracking-widest uppercase mb-3 block" style={{ color: "var(--lb-gold2)" }}>Почему выбирают нас</span>
              <h2 className="font-oswald text-4xl lg:text-5xl font-bold" style={{ color: "#fff" }}>
                Преимущества <span className="gold-text-gradient">LuckyBear</span>
              </h2>
            </div>
          </AnimSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {advantages.map((adv, i) => (
              <AnimSection key={i}>
                <div className="card-dark rounded-2xl p-6 h-full flex flex-col gap-4 cursor-default hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.2)" }}>
                    <Icon name={adv.icon} size={22} style={{ color: "var(--lb-gold2)" }} />
                  </div>
                  <p className="font-golos text-sm text-gray-300 leading-relaxed">{adv.text}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* MODELS */}
      <section id="models" className="py-24 px-6" style={{ background: "var(--lb-dark2)" }}>
        <div className="container mx-auto max-w-6xl">
          <AnimSection>
            <div className="text-center mb-16">
              <span className="text-xs font-oswald tracking-widest uppercase mb-3 block" style={{ color: "var(--lb-gold2)" }}>Модели сотрудничества</span>
              <h2 className="font-oswald text-4xl lg:text-5xl font-bold" style={{ color: "#fff" }}>
                Выбери <span className="gold-text-gradient">модель оплаты</span>
              </h2>
            </div>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { num: "01", title: "RevShare", value: "50–65%", desc: "Получай процент от дохода платформы с каждого привлечённого игрока навсегда", badge: "Лучший выбор", active: true },
              { num: "02", title: "CPA", value: "20–100$", desc: "Фиксированная выплата за каждого квалифицированного игрока", badge: "Скоро", active: false },
              { num: "03", title: "Hybrid", value: "RS + CPA", desc: "Комбинированная модель: фикс + процент от дохода", badge: "Скоро", active: false },
            ].map((m, i) => (
              <AnimSection key={i}>
                <div className="model-card p-8 cursor-pointer"
                  style={{
                    background: m.active ? "linear-gradient(135deg, rgba(13,21,32,1), rgba(17,29,46,1))" : "rgba(13,21,32,0.6)",
                    border: m.active ? "2px solid var(--lb-gold2)" : "1px solid rgba(212,160,23,0.15)",
                    boxShadow: m.active ? "0 0 40px rgba(212,160,23,0.15)" : "none",
                  }}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-oswald text-5xl font-bold opacity-20" style={{ color: "#fff" }}>{m.num}</span>
                    <span className="text-xs font-oswald px-3 py-1 rounded-full"
                      style={{
                        background: m.active ? "rgba(212,160,23,0.15)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${m.active ? "rgba(212,160,23,0.4)" : "rgba(255,255,255,0.1)"}`,
                        color: m.active ? "var(--lb-gold2)" : "#555",
                      }}>
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="font-oswald text-2xl font-bold mb-2" style={{ color: "#fff" }}>{m.title}</h3>
                  <div className="font-oswald text-4xl font-bold mb-4 gold-text-gradient">{m.value}</div>
                  <p className="font-golos text-sm text-gray-400 leading-relaxed">{m.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>

          <AnimSection>
            <div className="rounded-2xl p-8 lg:p-12"
              style={{ background: "linear-gradient(135deg, rgba(13,21,32,0.9), rgba(17,29,46,0.9))", border: "1px solid rgba(212,160,23,0.15)" }}>
              <h3 className="font-oswald text-2xl font-bold mb-8" style={{ color: "var(--lb-gold2)" }}>Преимущества RevShare модели</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {revsharePoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl"
                    style={{ background: "rgba(212,160,23,0.04)", border: "1px solid rgba(212,160,23,0.08)" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(212,160,23,0.1)" }}>
                      <Icon name={p.icon} size={18} style={{ color: "var(--lb-gold2)" }} />
                    </div>
                    <p className="font-golos text-sm text-gray-300 leading-relaxed pt-1">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* GEO */}
      <section id="geo" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <AnimSection>
            <div className="text-center mb-16">
              <span className="text-xs font-oswald tracking-widest uppercase mb-3 block" style={{ color: "var(--lb-gold2)" }}>Рабочие регионы</span>
              <h2 className="font-oswald text-4xl lg:text-5xl font-bold" style={{ color: "#fff" }}>
                Активные <span className="gold-text-gradient">ГЕО</span>
              </h2>
            </div>
          </AnimSection>
          <div className="flex flex-wrap justify-center gap-4">
            {geos.map((g, i) => (
              <AnimSection key={i}>
                <div className="geo-tag flex items-center gap-3 cursor-default">
                  <span className="text-3xl">{g.code}</span>
                  <div>
                    <div className="font-oswald text-lg font-bold" style={{ color: "#fff" }}>{g.tag}</div>
                    <div className="text-xs text-gray-500 font-golos">{g.name}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* TOOLS */}
      <section className="py-24 px-6" style={{ background: "var(--lb-dark2)" }}>
        <div className="container mx-auto max-w-5xl">
          <AnimSection>
            <div className="text-center mb-16">
              <span className="text-xs font-oswald tracking-widest uppercase mb-3 block" style={{ color: "var(--lb-gold2)" }}>Для партнёров</span>
              <h2 className="font-oswald text-4xl lg:text-5xl font-bold" style={{ color: "#fff" }}>
                Маркетинговые <span className="gold-text-gradient">инструменты</span>
              </h2>
              <p className="font-golos text-gray-400 mt-4 max-w-xl mx-auto">
                Широкий выбор материалов для продвижения и конвертации трафика в клиентов
              </p>
            </div>
          </AnimSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {tools.map((t, i) => (
              <AnimSection key={i}>
                <div className="card-dark rounded-2xl p-8 flex flex-col items-center gap-4 text-center cursor-default hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)" }}>
                    <Icon name={t.icon} size={28} style={{ color: "var(--lb-gold2)" }} />
                  </div>
                  <span className="font-golos font-semibold" style={{ color: "#fff" }}>{t.label}</span>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <AnimSection>
            <div className="text-center mb-16">
              <span className="text-xs font-oswald tracking-widest uppercase mb-3 block" style={{ color: "var(--lb-gold2)" }}>Вопросы и ответы</span>
              <h2 className="font-oswald text-4xl lg:text-5xl font-bold" style={{ color: "#fff" }}>
                Часто задаваемые <span className="gold-text-gradient">вопросы</span>
              </h2>
            </div>
          </AnimSection>
          <div className="flex flex-col gap-2">
            {faqItems.map((item, i) => (
              <AnimSection key={i}>
                <div
                  className="rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    background: "rgba(13,21,32,0.8)",
                    border: openFaq === i ? "1px solid rgba(212,160,23,0.3)" : "1px solid rgba(212,160,23,0.1)",
                    transition: "border-color 0.3s",
                  }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between p-6">
                    <span className="font-golos font-semibold pr-4" style={{ color: "#fff" }}>{item.q}</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: "rgba(212,160,23,0.1)",
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                        transition: "transform 0.3s",
                      }}>
                      <Icon name="Plus" size={16} style={{ color: "var(--lb-gold2)" }} />
                    </div>
                  </div>
                  {openFaq === i && (
                    <div className="px-6 pb-6 font-golos text-sm text-gray-400 leading-relaxed"
                      style={{ borderTop: "1px solid rgba(212,160,23,0.1)" }}>
                      <div className="pt-4">{item.a}</div>
                    </div>
                  )}
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,160,23,0.07), transparent)" }} />
        <AnimSection>
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <div className="text-5xl mb-6 animate-float">🐻</div>
            <h2 className="font-oswald text-4xl lg:text-6xl font-bold mb-6" style={{ color: "#fff" }}>
              Готов зарабатывать<br />
              <span className="gold-text-gradient">с LuckyBear?</span>
            </h2>
            <p className="font-golos text-lg text-gray-400 mb-10 max-w-lg mx-auto">
              Присоединяйся к тысячам партнёров и начни получать пассивный доход уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-gold px-10 py-4 rounded-xl text-base relative z-10">
                Стать партнёром
              </button>
              <button className="btn-outline-gold px-10 py-4 rounded-xl text-base">
                Написать менеджеру
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 font-golos">
              <Icon name="Shield" size={16} style={{ color: "var(--lb-gold2)" }} />
              <span>Официальная партнёрская программа LuckyBear</span>
            </div>
          </div>
        </AnimSection>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(212,160,23,0.1)", background: "var(--lb-dark2)" }}>
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐻</span>
            <span className="font-oswald font-bold tracking-widest" style={{ color: "var(--lb-gold2)" }}>
              LUCKY<span style={{ color: "#fff" }}>BEAR</span>{" "}
              <span style={{ color: "#444" }}>PARTNERS</span>
            </span>
          </div>
          <span className="text-xs text-gray-600 font-golos">RS 50–65% · CPA 20–100$ · GEO СНГ/БУРЖ/КРИПТА · HYBRID</span>
          <div className="text-xs text-gray-700 font-golos">© 2024 LuckyBear Partners</div>
        </div>
      </footer>
    </div>
  );
}