export function Placeholder({ width, height }: { width: number; height: number }) {
    return (
      <div 
        style={{ 
          width, 
          height, 
          backgroundColor: '#f0f0f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#888',
          fontSize: '14px'
        }}
      >
        {width} x {height}
      </div>
    )
  }
  
  