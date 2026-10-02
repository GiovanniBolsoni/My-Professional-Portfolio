import { useState, useEffect } from 'react';
import { getVisitor, VisitorState } from './visitorStore';

export function useVisitor() {
  const [visitor, setVisitor] = useState<VisitorState>(getVisitor());

  useEffect(() => {
    const handleUpdate = (e: CustomEvent<VisitorState>) => {
      setVisitor(e.detail);
    };

    window.addEventListener('visitor-updated', handleUpdate as EventListener);
    
    // Sync just in case
    setVisitor(getVisitor());

    return () => {
      window.removeEventListener('visitor-updated', handleUpdate as EventListener);
    };
  }, []);

  return visitor;
}
