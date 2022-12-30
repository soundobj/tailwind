import { useEffect, useRef } from "react"
import { Cell as CellType } from "./MineSweeper/utils"


const getRandomSign = () => Math.random() >= 0.5 ? "" : "-"
const getRandomValue = (max: number) => `${getRandomSign()}${Math.random() * max}` 

const Cell = (props: CellType) => {
  const { className, value } = props
  const valRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (className === 'blank' || className === 'adjacent') {
      const progressKeyframes = new KeyframeEffect(
        valRef.current,
        [
          {
            transform: `rotate(0deg) translateX(0) translateY(0) skew(0deg, 0deg) scale(1)`,
            opacity: 1
          },
          {
            transform: `
              rotate(${getRandomValue(120)}deg)
              translateX(${getRandomValue(30)}px)
              translateY(${getRandomValue(30)}px)
              skew(${getRandomValue(90)}deg,${getRandomValue(90)}deg)
              scale(0)
            `,
            opacity: 0,
            display: "none"
          }
        ],
        { duration: 600, fill: 'forwards', easing: 'ease-in-out' }
      );

      const progressAnimation = new Animation(progressKeyframes, document.timeline);
      progressAnimation.play();
    }
  }, [className])

  return (
    <>
      {value !== 'M' &&
        <div ref={valRef} className={`w-full p-3 bg-green-500 h-full z-10 absolute before:top-0 left-0 bottom-0`} />
      }
      <div className={`${value === 'M' ? 'bg-orange-300' : ''}`}>
        {value}
      </div>
    </>
  )
}

export default Cell