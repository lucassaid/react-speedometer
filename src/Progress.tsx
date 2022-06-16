import { SVGAttributes, useContext, useMemo } from 'react'
import Context from './context'
import { getCirclePath } from './utils'

interface ProgressProps extends SVGAttributes<SVGPathElement> {
  color?: string
  arcWidth?: number
  lineCap?: SVGAttributes<SVGPathElement>['strokeLinecap']
}

export default function Progress({
  color,
  arcWidth = 5,
  lineCap,
  ...rest
}: ProgressProps) {

  const {
    accentColor,
    radius,
    lineCap: globalLineCap,
    currentFillAngle,
  } = useContext(Context)

  const progressPath = useMemo(() => getCirclePath(
    radius,
    radius,
    radius - arcWidth / 2,
    0,
    currentFillAngle
  ), [radius, arcWidth, currentFillAngle])

  return (
    <path
      d={progressPath}
      stroke={color || accentColor}
      strokeWidth={arcWidth}
      strokeLinecap={lineCap || globalLineCap}
      fill="transparent"
      {...rest}
    />
  )
}