import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Contact.module.css';
import { profile } from '../../data/resume';
import { i18n } from '../../data/i18n';
import Icon from '../../Icon';
import { GlitchText } from '../GlitchText/GlitchText';
import { useVisitor } from '../../visitor/useVisitor';
import { setContactResolved } from '../../visitor/visitorStore';

export const Contact = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const visitor = useVisitor();
  const [typedStatus, setTypedStatus] = useState('');
  
  const vNumStr = visitor.visitorNumber ? `#${String(visitor.visitorNumber).padStart(4, '0')}` : '#---';
  const handle = visitor.handle;
  
  useEffect(() => {
    if (visitor.contactResolved) {
      setTypedStatus('resolvido ✅');
    } else {
      setTypedStatus('aguardando contato ⏳');
    }
  }, [visitor.contactResolved]);

  useGSAP(() => {
    gsap.from('.contact-left', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      x: -50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });

    gsap.from('.contact-right', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      x: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    if (!visitor.contactResolved) {
      setContactResolved();
      // Simple typing effect for the status change
      setTypedStatus('');
      const finalStr = 'resolvido ✅';
      let i = 0;
      const interval = setInterval(() => {
        setTypedStatus(finalStr.slice(0, i + 1));
        i++;
        if (i >= finalStr.length) clearInterval(interval);
      }, 50);
    }
  };

  return (
    <section className={styles.contact} id="contact" ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> <GlitchText as="span" text={t.contact} />
        </h2>
        
        <div className={styles.content}>
          <div className={`${styles.info} contact-left`}>
            <p className={styles.description}>
              Estou aberto a novas oportunidades e conexões. Sinta-se à vontade para entrar em contato!
            </p>
            
            <button onClick={handleCopyEmail} className={styles.emailBtn}>
              <Icon name="mail" size={20} />
              {copied ? 'E-mail copiado!' : profile.email}
            </button>


          </div>
          
          <div className={`${styles.terminalFinal} contact-right`}>
            <div className={styles.termHeader}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.termBody}>
              <p><span className={styles.termPrompt}>{handle}@giovanni:~$</span> <span className={styles.termMuted}>./check_status.sh</span></p>
              <p className={styles.termOutput}>ticket {vNumStr} aberto por {handle} · status: {typedStatus}</p>
              <p><span className={styles.termPrompt}>{handle}@giovanni:~$</span> <span className={styles.cursor}></span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
