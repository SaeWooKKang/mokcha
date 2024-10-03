import { type DragControls, motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  controls: DragControls
  constraints: {
    left: number
    right: number
    top: number
    bottom: number
  }
  tocSize: {
    width: number
    height: number
  }
}

export const MotionLayout = (props: Props) => {
  return (
    <motion.div
      drag
      dragConstraints={props.constraints}
      dragControls={props.controls}
      dragListener={false}
      animate={{ x: 200, y: 200 }}
      layout
      whileHover={{
        scale: 1.05,
      }}
      className="fixed bg-white overflow-hidden pointer-events-auto rounded-[10px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)]"
      style={{
        width: props.tocSize.width,
        height: props.tocSize.height,
      }}
    >
      {props.children}
    </motion.div>
  )
}
