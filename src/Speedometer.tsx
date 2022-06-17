import { SVGAttributes, useMemo } from 'react'
import SpeedometerContext from './context'

export interface SpeedometerProps {
  width?: number
  height?: number
  angle?: number
  rotation?: number
  value?: number
  min?: number
  max?: number
  lineCap?: SVGAttributes<SVGPathElement>['strokeLinecap']
  accentColor?: string
  fontFamily?: string
  children: JSX.Element | Array<JSX.Element | false>,
}

export default function Speedometer({
  width = 250,
  height = width,
  angle = 250,
  rotation = -angle / 2,
  value = 0,
  min = 0,
  max = 180,
  lineCap = 'butt',
  accentColor = '#00e0ff',
  fontFamily = 'helvetica',
  children,
}: SpeedometerProps) {

  const radius = width / 2
  const currentFillAngle = useMemo(() => {
    const clampValue = Math.min(max, Math.max(min, Number(value)))
    return (angle * (clampValue - min)) / (max - min)
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