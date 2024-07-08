import { useState, useRef } from "react";
import { CContainer } from "@coreui/react";
import { CCol } from "@coreui/react";
import { CRow } from "@coreui/react";
import { CButton } from "@coreui/react";
import { CFormCheck } from "@coreui/react";
import { CButtonGroup } from "@coreui/react";
import { CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilCopy,
  cilDataTransferUp,
  cilDataTransferDown,
  cilTrash,
} from "@coreui/icons";

export default function EditorTopBar({
  changeCodeFormat,
  editorMode,
  setLeftValue,
  rightValue,
  onClickTrashLeft,
  onClickTrashRight,
  onClickCopy,
  parseIOCs,
}) {
  const handleRadioChange = (event) => {
    const value = event.target.id;

    switch (value) {
      case "btnradiocsv":
        changeCodeFormat("csv");
        break;
      case "btnradiojson":
        changeCodeFormat("json");
        break;
      case "btnradiotext":
        changeCodeFormat("txt");
        break;
      default:
        break;
    }
  };

  const inputFile = useRef(null);

  const handleClick = () => {
    inputFile.current.click();
  };

  const handleChange = (event) => {
    const maxSize = 100 * 1024;

    let file = event.target.files[0];

    if (file.size > maxSize) {
      alert("File size limit is 100KB.");
      event.target.value = null;
    } else {
      event.stopPropagation();
      event.preventDefault();
      console.log(file);
      processFile(file);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setLeftValue(reader.result);
    };
    reader.readAsText(file);
  };

  const downloadFile = () => {
    const file = new File([rightValue], `parsedIOCs.${editorMode}`, {
      type: "text/plain",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <CContainer>
        <CRow className="pt-2 pb-2 align-items-center border-top border-bottom">
          <CCol className="col-4 d-flex px-2">
            <CTooltip content="Copy" placement="bottom">
              <CButton onClick={() => onClickCopy("left")}>
                <CIcon
                  icon={cilCopy}
                  style={{ "--ci-primary-color": "white" }}
                />
              </CButton>
            </CTooltip>
            <CTooltip content="Upload" placement="bottom">
              <CButton onClick={handleClick}>
                <CIcon
                  icon={cilDataTransferUp}
                  style={{ "--ci-primary-color": "white" }}
                />
              </CButton>
            </CTooltip>
            <input
              type="file"
              id="fileUpload"
              ref={inputFile}
              accept=".txt,.csv,.json,.xml"
              onChange={handleChange}
              style={{ display: "none" }}
            ></input>
            <CTooltip content="Trash" placement="bottom">
              <CButton onClick={onClickTrashLeft}>
                <CIcon
                  icon={cilTrash}
                  style={{ "--ci-primary-color": "white" }}
                />
              </CButton>
            </CTooltip>
          </CCol>
          <CCol className="col-4 d-flex justify-content-center">
            <CButton
              className="w-50"
              type="submit"
              color="primary"
              onClick={parseIOCs}
            >
              <b>PARSE</b>
            </CButton>
          </CCol>
          <CCol className="col-4 px-2 d-flex justify-content-end">
            <CButtonGroup
              className="d-flex px-2 align-items-center"
              role="group"
              size="sm"
              aria-label="Basic checkbox toggle button group"
            >
              <CFormCheck
                type="radio"
                button={{ color: "primary", variant: "outline" }}
                name="btnradio"
                id="btnradiojson"
                autoComplete="off"
                label="JSON"
                onChange={handleRadioChange}
                checked={editorMode === "json"}
              />
              <CFormCheck
                type="radio"
                button={{ color: "primary", variant: "outline" }}
                name="btnradio"
                id="btnradiocsv"
                autoComplete="off"
                label="CSV"
                onChange={handleRadioChange}
                checked={editorMode === "csv"}
              />
              <CFormCheck
                type="radio"
                button={{ color: "primary", variant: "outline" }}
                name="btnradio"
                id="btnradiotext"
                autoComplete="off"
                label="TEXT"
                onChange={handleRadioChange}
                checked={editorMode === "txt"}
              />
            </CButtonGroup>
            <CTooltip content="Copy" placement="bottom">
              <CButton onClick={() => onClickCopy("right")}>
                <CIcon
                  icon={cilCopy}
                  style={{ "--ci-primary-color": "white" }}
                />
              </CButton>
            </CTooltip>
            <CTooltip content="Download" placement="bottom">
              <CButton onClick={downloadFile}>
                <CIcon
                  icon={cilDataTransferDown}
                  style={{ "--ci-primary-color": "white" }}
                />
              </CButton>
            </CTooltip>
            <CTooltip content="Trash" placement="bottom">
              <CButton onClick={onClickTrashRight}>
                <CIcon
                  icon={cilTrash}
                  style={{ "--ci-primary-color": "white" }}
                />
              </CButton>
            </CTooltip>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
