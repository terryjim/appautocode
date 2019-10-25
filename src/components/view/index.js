import React from 'react';


function BCC_View() {
  return (
    

    <div
    className="droppable-element"
    draggable={true}
    unselectable="on"
    // this is a hack for firefox
    // Firefox requires some kind of initialization
    // which we can do by adding this attribute
    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
    onDragStart={e => e.dataTransfer.setData("text/plain", "")}
  >
    Droppable Element
  </div>
  );
}

export default BCC_View;