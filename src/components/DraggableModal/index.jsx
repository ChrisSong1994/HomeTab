import React, { useRef, useState } from "react";
import { Modal } from "antd";
import { createRoot } from "react-dom";
import Draggable from "react-draggable";

const DraggableModal = () => {
  const [open, setOpen] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      maskClosable={false}
      mask={false}
      footer={null}
      title={
        <div
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
        >
          Draggable Modal
        </div>
      }
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      <p>
        Just don&apos;t learn physics at school and your life will be full of
        magic and miracles.
      </p>
      <br />
      <p>
        Day before yesterday I saw a rabbit, and yesterday a deer, and today,
        you.
      </p>
    </Modal>
  );
};

export function createDraggableModal() {
  const hole = document.createElement("div");
  hole.id = Date.now();
  document.body.appendChild(hole);
  const root = createRoot(hole);
  root.render(<DraggableModal />);
}
export default DraggableModal;
