import * as Uebersicht from 'uebersicht'
import * as Output from '../services/output'
import * as Slider from '../services/slider'

const getName = (app, title) => {
  if (!title.length || app === title) return app
  if (title.includes(app)) return title
  return `${app} | ${title}`
}

const Process = ({ currentWindow }) => {
  const ref = Uebersicht.React.useRef()

  const [output, setOutput] = Uebersicht.React.useState()

  const getFrontApp = async () => {
    const process = await Uebersicht.run(`osascript -e 'tell application "System Events" to get name of application processes whose frontmost is true and visible is true'`);
    setOutput({ process: Output.cleanup(process) })
  }
  
  
    Uebersicht.React.useEffect(() => {
      const init = async () => {
        await getFrontApp()
      }
      init()
    });
  const processName = () => {
    if (!currentWindow) {
      if (!output) {
        return ""
      }
      else {
        const { process } = output;
        return process
      }
    }

    else {
      const { app, title } = currentWindow
      return getName(app, title)
    }
  }

  const onMouseEnter = () => Slider.start(ref.current, '.spl-process__inner', '.spl-process__name')
  const onMouseLeave = () => Slider.stop(ref.current, '.spl-process__name')

  return (
    <div ref={ref} className="spl-process" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <span className="spl-process__inner">
        <span className="spl-process__name">{processName()}</span>
      </span>
    </div>
  )
}

export default Process
