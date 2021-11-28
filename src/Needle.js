import React, { useContext } from 'react'
import Context from './context'

export default function Needle ({
  offset = 25,
  baseWidth = 6,
  baseOffset = 18,
  color = 'white',
  circleRadius = 15,
  circleColor,
  children,
}) {
  const { currentFillAngle, radius, accentColor, duration } = useContext(Context)
  const style = { transition: `all ${duration}ms ease` }
  const bottom = radius + baseOffset
  const points = `
    ${radius - baseWidth / 2}, ${bottom} ${radius + baseWidth / 2}, ${bottom} ${radius}, ${offset}
  `
  const defaultNeedle = (
    <g>
      <circle
        r={circleRadius}
        cx={radius}
        cy={radius}
        fill={circleColor || accentColor}
      />
      <polygon
        points={points}
        fill={color}
        strokeWidth="2"
        stroke={color}
        style={{strokeLinejoin: 'round'}}
      />
    </g>
  )

  return (
    <g
      style={style}
      transform={`rotate(${currentFillAngle}, ${radius}, ${radius})`}
    >
      {children ? children() : defaultNeedle}
    </g>
  )
}