import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, ArrowRight, Monitor, Download, Sun } from 'lucide-react';
import styles from './CommandPalette.module.css';
import { useScrollLock } from '../../hooks/useScrollLock';

interface CommandItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useScrollLock(isOpen);

  const toggleTheme = () => {
    // We can dispatch an event or click the theme button. 
    // Dispatching a custom event is cleaner to let Header handle it, or we can just access localStorage and applyTheme directly if we export it.
    // For simplicity, let's just dispatch a custom event.
    window.dispatchEvent(new Event('toggle-theme'));
    setIsOpen(false);
  };

  const commands: CommandItem[] = [
    {
      id: 'about',
      icon: <ArrowRight size={16} />,
      label: 'Ir para Sobre Mim',
      action: () => {
        window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId: '#about' } }));
        setIsOpen(false);
      }
    },
    {
      id: 'projects',
      icon: <Monitor size={16} />,
      label: 'Ir para Projetos',
      action: () => {
        window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId: '#projects' } }));
        setIsOpen(false);
      }
    },
    {
      id: 'certifications',
      icon: <ArrowRight size={16} />,
      label: 'Ir para Certificados',
      action: () => {
        window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId: '#certifications' } }));
        setIsOpen(false);
      }
    },
    {
      id: 'contact',
      icon: <ArrowRight size={16} />,
      label: 'Ir para Contato',
      action: () => {
        window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId: '#contact' } }));
        setIsOpen(false);
      }
    },
    {
      id: 'resume',
      icon: <Download size={16} />,
      label: 'Baixar Currículo',
      action: () => {
        window.open('https://drive.google.com/file/d/1R_atrtgxYFmYXBWWv-8B-2dwGwDFLDrX/view', '_blank');
        setIsOpen(false);
      }
    },
    {
      id: 'theme',
      icon: <Sun size={16} />,
      label: 'Alternar Tema',
      action: toggleTheme
    }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={() => setIsOpen(false)} data-lenis-prevent="true">
      <div className={styles.palette} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Digite um comando ou busque..."
            className={styles.input}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.list}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => (
              <button
                key={cmd.id}
                className={`${styles.item} ${index === selectedIndex ? styles.selected : ''}`}
                onClick={cmd.action}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className={styles.itemIcon}>{cmd.icon}</span>
                <span>{cmd.label}</span>
              </button>
            ))
          ) : (
            <div className={styles.empty}>Nenhum comando encontrado.</div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
