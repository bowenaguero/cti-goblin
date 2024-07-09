import { CContainer } from "@coreui/react";
import { CCol } from "@coreui/react";
import { CRow } from "@coreui/react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { aura } from "@uiw/codemirror-theme-aura";

export default function EditorBody({
  leftValue,
  rightValue,
  onChangeLeft,
  onChangeRight,
  extensions,
}) {
  return (
    <>
      <CContainer>
        <CRow>
          <CCol className="p-0" style={{ width: "50%" }}>
            <div>
              <CodeMirror
                value={leftValue}
                placeholder={"Let the goblin feast."}
                theme={aura}
                extensions={[EditorView.lineWrapping]}
                height={"80vh"}
                onChange={onChangeLeft}
              />
            </div>
          </CCol>
          <CCol className="p-0" style={{ width: "50%" }}>
            <CodeMirror
              value={rightValue}
              theme={aura}
              extensions={extensions}
              height={"80vh"}
              onChange={onChangeRight}
            />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
