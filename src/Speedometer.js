import React, { useMemo } from 'react'
import SpeedometerContext from './context'

export default function Speedometer({
  width = 250,
  height = width,
  angle = 250,
  rotation = -angle / 2,
  value = 0,
  min = 0,
  max = 180,
  duration = 250,
  lineCap = 'butt',
  accentColor = '#00e0ff',
  fontFamily = 'helvetica',
  children,
}) {

  const radius = width / 2
  const currentFillAngle = useMemo(() => {
    const clampValue = Math.min(max, Math.max(min, Number(value)))
    return (angle * (clampValue - min)) / (max -min)
  }, [min, max, value, angle])

  const contextValue = {
    currentFillAngle,
    radius,
    rotation,
    min,
    max,
    angle,
    lineCap,
    accentColor,
    fontFamily,
    value,
    duration,
  }
  
  return (
    <SpeedometerContext.Provider value={contextValue}>
      <svg width={width} height={height}>
        <g transform={`rotate(${rotation} ${radius} ${radius})`}>
          {children}
        </g>
      </svg>
    </SpeedometerContext.Provider>
  )
}