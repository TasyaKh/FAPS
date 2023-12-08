import React, {FC, ReactNode} from 'react'
import { CollapsibleItem, Collapsible } from "react-materialize"
import './DefaultModal.scss'
interface DefaultModalProps {
  header:string,
  child:ReactNode,
  onHide: (show:boolean) => void;
}

export const DefaultModal:
    FC<DefaultModalProps> = ({header,child,onHide }) => {

  return (
    <div className={`modal-panel shadow `}>
      {/*close btn*/}
      <button
        className="modal-panel__close"
        onClick={()=>onHide(false)}
      >
        &#10006;
      </button>

        <Collapsible
          className="modal-panel__collapsible"
          accordion
        >
          <CollapsibleItem
            expanded
            header={header}
            node="div"
            className="modal-panel__collapsible-item"
          >
            {child}
          </CollapsibleItem>
        </Collapsible>
    </div>
  )
}