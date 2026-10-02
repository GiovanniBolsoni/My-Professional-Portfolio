import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './Certifications.module.css';
import { certifications } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const Certifications = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const containerRef = useRef<HTMLElement>(null);
  
  // Use undefined for type safety or specific cert type. For simplicity, any.
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  return (
    <section className={styles.certs} id="certifications" ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> {t.certifications || 'certificados.list()'}
        </h2>
        
        <div className={styles.grid}>
          {certifications.map((cert, idx) => (
            <motion.div 
              key={idx} 
              className={styles.card}
              onClick={() => setSelectedCert(cert)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
            >
              <div className={styles.header}>
                <span className={styles.year}>{cert.year}</span>
                <span className={styles.hours}>{cert.hours}</span>
              </div>
              <h3 className={styles.certTitle}>{cert.title}</h3>
              <p className={styles.org}>{cert.org}</p>
              <p className={styles.description}>{cert.description}</p>
            </motion.div>
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
