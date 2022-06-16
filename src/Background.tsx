import { SVGAttributes, useContext, useMemo } from 'react'
import Context from './context'
import { getCirclePath } from './utils'

interface BackgroundProps extends SVGAttributes<SVGPathElement> {
  angle?: number
  color?: string
  opacity?: number
}

export default function Background({
  angle = 360,
  color = 'black',
  opacity = 0.5,
  ...rest
}: BackgroundProps) {

  const { rotation, radius } = useContext(Context)
  const backgroundStart = rotation + angle / 2

  const backgroundPath = useMemo(() => getCirclePath(
    radius,
    radius,
    radius,
    -backgroundStart,
    -backgroundStart + angle
  ), [radius, backgroundStart, angle])

  return (
    <path
      d={backgroundPath}
      fill={color}
      fillOpacity={opacity}
      {...rest}
    />
  )
}