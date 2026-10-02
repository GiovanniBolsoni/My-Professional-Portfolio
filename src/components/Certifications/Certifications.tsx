import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Certifications.module.css';
import { certifications } from '../../data/resume';
import { i18n } from '../../data/i18n';
import { useScrambleText } from '../../hooks/useScrambleText';

gsap.registerPlugin(ScrollTrigger);

export const Certifications = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const containerRef = useRef<HTMLElement>(null);
  // Use undefined for type safety or specific cert type. For simplicity, any.
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const titleText = t.certifications || 'certificados.list()';
  const titleRef = useScrambleText(titleText, isTitleVisible, { speed: 30, delay: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.set('.cert-card', { y: 60, opacity: 0 });

    ScrollTrigger.batch('.cert-card', {
      interval: 0.1,
      batchMax: 3,
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          overwrite: true
        });
      },
      once: true
    });
  }, { scope: containerRef });

  return (
    <section className={styles.certs} id="certifications" ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> <span ref={titleRef as any}>{titleText}</span>
        </h2>
        
        <div className={styles.grid}>
          {certifications.map((cert, idx) => (
            <div 
              key={idx} 
              className={`${styles.card} cert-card`}
              onClick={() => setSelectedCert(cert)}
            >
              <div className={styles.header}>
                <span className={styles.year}>{cert.year}</span>
                <span className={styles.hours}>{cert.hours}</span>
              </div>
              <h3 className={styles.certTitle}>{cert.title}</h3>
              <p className={styles.org}>{cert.org}</p>
              <p className={styles.description}>{cert.description}</p>
            </div>
          ))}
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCert && (
            <motion.div 
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div 
                className={styles.modalContent}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className={styles.closeBtn} 
                  onClick={() => setSelectedCert(null)}
                >
                  <X size={24} />
                </button>
                
                <div className={styles.modalHeader}>
                  <span className={styles.year}>{selectedCert.year}</span>
                </div>
                <h3 className={styles.modalTitle}>{selectedCert.title}</h3>
                <div className={styles.modalSubTitle}>
                  <span className={styles.modalOrg}>{selectedCert.org}</span>
                  <span className={styles.modalHours}>• {selectedCert.hours}</span>
                </div>

                {selectedCert.image && (
                  <div className={styles.modalImageContainer}>
                    <img src={selectedCert.image} alt={selectedCert.title} className={styles.modalImage} />
                  </div>
                )}

                <p className={styles.modalDescription}>{selectedCert.description}</p>

                {selectedCert.pdf && (
                  <a href={selectedCert.pdf} target="_blank" rel="noreferrer" className={styles.modalPdfLink}>
                    Ver Certificado
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
