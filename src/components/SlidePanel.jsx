return (
  <div 
    className="slide-panel-overlay" 
    onClick={(e) => e.target === e.currentTarget && onClose()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="slide-panel-title"
    data-testid="slide-panel-overlay"
  >
    <div className="slide-panel" ref={panelRef}>
      <div className="slide-panel-content">
        <div 
          className="slide-panel-body" 
          dangerouslySetInnerHTML={{ __html: html }} 
        />
        <button 
          className="slide-panel-close" 
          onClick={onClose} 
          aria-label="Close panel"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
); 
