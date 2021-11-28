import React, { useCallback, useContext, useMemo, useState } from 'react'
import Context from './context'
import { getCirclePath } from './utils'

export default function Progress ({
  color,
  arcWidth = 5,
  lineCap,
}) {

  const [dash, setDash] = useState([0, 0]);

  const {
    accentColor,
    radius,
    lineCap: globalLineCap,
    currentFillAngle,
    angle,
    duration,
  } = useContext(Context)

  const pathRef = useCallback(node => {
    if (node) {
      const perc = (currentFillAngle / angle) * 100
      const pathLength = node.getTotalLength()
      const dashSeparation = (perc / 100) * pathLength
      setDash([pathLength, pathLength - dashSeparation])
    }
  }, [currentFillAngle, angle])

  const arcPath = useMemo(() => getCirclePath(
    radius,
    radius,
    radius - arcWidth / 2,
    0,
    angle
  ), [radius, arcWidth, angle])

  const [pathLength, dashOffset] = dash
  const style = { transition: `all ${duration}ms ease` }

  return (
    <path
      d={arcPath}
      stroke={color || accentColor}
      strokeWidth={arcWidth}
      strokeLinecap={lineCap || globalLineCap}
      fill="transparent"
      strokeDasharray={pathLength}
      strokeDashoffset={- dashOffset}
      style={style}
      ref={pathRef}
    />
  )
}