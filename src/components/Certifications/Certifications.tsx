import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Certifications.module.css';
import { certifications } from '../../data/resume';
import { i18n } from '../../data/i18n';
import { GlitchText } from '../GlitchText/GlitchText';
import { useScrollLock } from '../../hooks/useScrollLock';

gsap.registerPlugin(ScrollTrigger);

export const Certifications = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const containerRef = useRef<HTMLElement>(null);
  // Use undefined for type safety or specific cert type. For simplicity, any.
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useScrollLock(!!selectedCert);

  const titleText = t.certifications || 'certificados.list()';

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => setIsVisible(true)
      });
      return;
    }

    gsap.set('.cert-card', { y: 60, opacity: 0 });

    ScrollTrigger.batch('.cert-card', {
      interval: 0.1,
      batchMax: 3,
      onEnter: (batch) => {
        setIsVisible(true);
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
          <span className={styles.prompt}>&gt;</span> <GlitchText as="span" text={titleText} reveal={true} revealTrigger={isVisible} />
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
              data-lenis-prevent="true"
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
                    <img loading="lazy" src={selectedCert.image} alt={selectedCert.title} className={styles.modalImage} />
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
