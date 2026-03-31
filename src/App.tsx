import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  MapPin,
  Calendar,
  Clock,
  Volume2,
  VolumeX,
  ChevronDown,
  Phone,
  Utensils,
  Info,
  CalendarPlus,
} from "lucide-react";

// --- Music Player Component ---
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current && isPlaying) {
          await audioRef.current.play();
        } else if (audioRef.current) {
          audioRef.current.pause();
        }
      } catch (err) {
        console.log("Autoplay blocked", err);
        setIsPlaying(false);
      }
    };
    playAudio();
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=romantic-piano-112123.mp3"
      />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-ink hover:scale-105 transition-transform border border-accent/20"
        aria-label="Toggle Music"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
};

// --- Fade In Component ---
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Hero Section ---
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
          alt="Couple"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 flex flex-col items-center w-full">
        <motion.p
          initial={{ opacity: 0, tracking: "0em" }}
          animate={{ opacity: 1, tracking: "0.2em" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-sm md:text-base uppercase tracking-widest mb-8 font-light"
        >
          NİŞANIMIZA DAVETLİSİNİZ
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="font-script text-7xl md:text-9xl lg:text-[10rem] mb-8 text-white drop-shadow-lg"
        >
          İdil & Burak
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-lg md:text-xl font-serif tracking-widest uppercase">
            16 MAYIS 2026
          </p>
          <div className="w-12 h-[1px] bg-accent my-2"></div>
          <p className="text-base md:text-lg font-light tracking-widest uppercase">
            CUMARTESİ
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 z-20 flex flex-col items-center text-white"
      >
        <span className="text-xs uppercase tracking-widest mb-2 opacity-70">
          Aşağı Kaydırın
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- Countdown Section ---
const Countdown = () => {
  const targetDate = new Date("2026-05-16T19:00:00+03:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-ink text-cream text-center">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <h2 className="font-serif text-2xl md:text-3xl mb-10 text-accent">
            Büyük Güne Kalan Zaman
          </h2>
          <div className="flex justify-center gap-4 md:gap-12">
            <div className="flex flex-col items-center w-16 md:w-24">
              <span className="text-4xl md:text-6xl font-serif">
                {timeLeft.days}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-widest mt-3 text-cream/70">
                Gün
              </span>
            </div>
            <span className="text-4xl md:text-5xl font-serif text-accent/50 mt-1">
              :
            </span>
            <div className="flex flex-col items-center w-16 md:w-24">
              <span className="text-4xl md:text-6xl font-serif">
                {timeLeft.hours}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-widest mt-3 text-cream/70">
                Saat
              </span>
            </div>
            <span className="text-4xl md:text-5xl font-serif text-accent/50 mt-1">
              :
            </span>
            <div className="flex flex-col items-center w-16 md:w-24">
              <span className="text-4xl md:text-6xl font-serif">
                {timeLeft.minutes}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-widest mt-3 text-cream/70">
                Dakika
              </span>
            </div>
            <span className="text-4xl md:text-5xl font-serif text-accent/50 mt-1">
              :
            </span>
            <div className="flex flex-col items-center w-16 md:w-24">
              <span className="text-4xl md:text-6xl font-serif">
                {timeLeft.seconds}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-widest mt-3 text-cream/70">
                Saniye
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// --- Parents Section ---
const Parents = () => (
  <section className="py-20 md:py-32 px-6 max-w-4xl mx-auto text-center">
    <FadeIn>
      <p className="text-sm md:text-base uppercase tracking-widest mb-12 font-light text-ink/70">
        Evlatlarının bu mutlu gününde sizleri de aralarında görmekten onur
        duyarlar
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 font-serif text-lg md:text-xl text-ink">
        <div className="text-center">
          <p className="mb-1 tracking-wide">
            DENİZ & İLKER{" "}
            <span className="text-sm font-sans font-light tracking-normal">
              (MERHUM)
            </span>
          </p>
          <p className="font-medium tracking-widest">BÖLÜKBAŞI</p>
        </div>
        <div className="hidden md:block w-px h-16 bg-accent/50"></div>
        <div className="md:hidden w-16 h-px bg-accent/50"></div>
        <div className="text-center">
          <p className="mb-1 tracking-wide">RAHİME & HASAN</p>
          <p className="font-medium tracking-widest">BAYAR</p>
        </div>
      </div>
    </FadeIn>
  </section>
);

// --- Location & Details Section ---
const Details = () => {
  const handleAddToCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:20260516T160000Z",
      "DTEND:20260516T203000Z",
      "SUMMARY:İdil & Burak Nişan Töreni",
      "DESCRIPTION:Nişanımıza davetlisiniz!",
      "LOCATION:Balaban Davet, Ambarlı Mah. Fevzi Çakmak Cad. No:2 Avcılar İstanbul",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "idil-burak-nisan.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-ink">
              Zaman & Mekan
            </h2>
            <div className="w-16 h-[1px] bg-accent mx-auto"></div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.2} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0 border border-accent/30">
                <Calendar className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-1">Tarih</h3>
                <p className="text-ink/80">16 Mayıs 2026, Cumartesi</p>
                <button
                  onClick={handleAddToCalendar}
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium text-accent hover:text-ink transition-colors mt-2"
                >
                  <CalendarPlus size={16} /> Takvime Ekle
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0 border border-accent/30">
                <Clock className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-1">Saat</h3>
                <p className="text-ink/80">19:00</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0 border border-accent/30">
                <MapPin className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-1">Mekan</h3>
                <p className="text-ink/80 font-medium">Balaban Davet</p>
                <p className="text-ink/70 mb-3 text-sm leading-relaxed">
                  Ambarlı Mah. Fevzi Çakmak Cad.
                  <br />
                  No:2 Avcılar / İstanbul
                </p>
                <a
                  href="https://maps.google.com/?q=Balaban+Davet+Avcılar+İstanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium text-accent hover:text-ink transition-colors"
                >
                  Haritada Aç <ChevronDown className="-rotate-90" size={16} />
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn
            delay={0.4}
            className="h-[400px] rounded-2xl overflow-hidden shadow-xl border border-accent/10"
          >
            <iframe
              src="https://www.google.com/maps?q=Balaban+Davet+Avcılar+İstanbul&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// --- Info Section ---
const InfoSection = () => (
  <section className="py-20 bg-cream">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <FadeIn>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-accent/30 text-accent mb-6 shadow-sm">
          <Utensils size={28} />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl mb-4 text-ink">
          Önemli Not
        </h2>
        <p className="text-lg text-ink/80 font-light leading-relaxed max-w-2xl mx-auto">
          Nişanımız yemekli olacaktır.
          <br />
          Organizasyonun kusursuz ilerleyebilmesi adına katılım durumunuzu
          aşağıdaki formdan veya WhatsApp üzerinden bizimle paylaşırsanız çok
          seviniriz.
        </p>
      </FadeIn>
    </div>
  </section>
);

// --- RSVP Section ---
const RSVP = () => {
  return (
    <section
      className="py-24 bg-ink text-cream relative overflow-hidden"
      id="rsvp"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[100px]"></div>
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl mb-4 text-accent">
              LCV
            </h2>
            <p className="text-cream/80 font-light">
              Lütfen katılım durumunuzu bildiriniz.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-2xl border border-white/10 space-y-10">
            {/* WhatsApp Button */}
            <div className="text-center space-y-4 pb-10 border-b border-white/10">
              <p className="text-sm text-cream/70 uppercase tracking-wider mb-4">
                Hızlı ve Kolay Yanıt İçin
              </p>
              <a
                href="https://wa.me/905054851043?text=Merhaba,%2016%20Mayıs'taki%20nişan%20töreninize%20katılım%20durumumu%20bildirmek%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full md:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                <Phone size={22} />
                WhatsApp ile Bildir
              </a>
              <p className="text-sm text-cream/50 mt-4">0505 485 10 43</p>
            </div>

            {/* Email Form (FormSubmit.co) */}
            <form
              action="https://formsubmit.co/95burakbayar@gmail.com"
              method="POST"
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <p className="text-sm text-cream/70 uppercase tracking-wider">
                  Veya Form Doldurun
                </p>
              </div>

              {/* FormSubmit Configuration */}
              <input
                type="hidden"
                name="_subject"
                value="Nişan Davetiyesi - Yeni LCV Yanıtı!"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-cream/80 uppercase tracking-wider">
                    Adınız Soyadınız
                  </label>
                  <input
                    required
                    type="text"
                    name="Ad Soyad"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Örn: Ahmet Yılmaz"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-cream/80 uppercase tracking-wider">
                    Kişi Sayısı
                  </label>
                  <select
                    name="Kişi Sayısı"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                  >
                    <option value="1" className="text-ink">
                      1 Kişi
                    </option>
                    <option value="2" className="text-ink">
                      2 Kişi
                    </option>
                    <option value="3" className="text-ink">
                      3 Kişi
                    </option>
                    <option value="4" className="text-ink">
                      4 Kişi
                    </option>
                    <option value="5+" className="text-ink">
                      5+ Kişi
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-cream/80 uppercase tracking-wider">
                  Katılım Durumu
                </label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="Katılım Durumu"
                      value="Katılıyorum"
                      className="peer sr-only"
                      defaultChecked
                    />
                    <div className="text-center py-3 border border-white/20 rounded-lg peer-checked:bg-accent peer-checked:border-accent transition-all">
                      Katılıyorum
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="Katılım Durumu"
                      value="Katılamıyorum"
                      className="peer sr-only"
                    />
                    <div className="text-center py-3 border border-white/20 rounded-lg peer-checked:bg-white/20 transition-all">
                      Katılamıyorum
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-cream/80 uppercase tracking-wider">
                  Notunuz (İsteğe Bağlı)
                </label>
                <textarea
                  name="Not"
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Bize iletmek istediğiniz bir mesaj var mı?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-4 rounded-lg transition-colors uppercase tracking-widest text-sm"
              >
                Yanıtı Gönder
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="py-12 text-center text-ink/50 text-sm bg-cream">
    <p className="font-script text-3xl mb-4 text-ink">İ & B</p>
    <p>© 2026 İdil & Burak. Tüm hakları saklıdır.</p>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-cream selection:bg-accent/30 selection:text-ink">
      <AudioPlayer />
      <Hero />
      <Countdown />
      <Parents />
      <Details />
      <InfoSection />
      <RSVP />
      <Footer />
    </div>
  );
}
