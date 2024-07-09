import React, { useState, useEffect, useCallback } from "react";
import EditorTopBar from "./components/EditorTopBar";
import EditorBody from "./components/EditorBody";
import { CContainer, CAlert } from "@coreui/react";
import { EditorView } from "@codemirror/view";
import { langs } from "@uiw/codemirror-extensions-langs";
import { extractIOC } from "ioc-extractor";
import xss from "xss";

function jsonToCsv(json) {
  let csv = "type,value\n";

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const values = json[key];

      values.forEach((value) => {
        csv += `${key},${value}\n`;
      });
    }
  }

  return csv;
}

function jsonToText(json) {
  let text = "";

  Object.keys(json).forEach((key) => {
    if (json[key].length > 0) {
      json[key].forEach((entry) => {
        text += `${entry}\n`;
      });
    }
  });

  return text;
}

export default function App() {
  const [leftValue, setLeftValue] = useState(undefined);
  const [rightValue, setRightValue] = useState(undefined);
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isDangerAlertVisible, setIsDangerAlertVisible] = useState(false);
  const [extensions, setExtensions] = useState([
    EditorView.lineWrapping,
    langs.json(),
  ]);
  const [editorMode, setEditorMode] = useState("json");
  const [parsedData, setParsedData] = useState(undefined);

  function changeCodeFormat(format) {
    switch (format) {
      case "json":
        setEditorMode("json");
        setExtensions([EditorView.lineWrapping, langs.json()]);
        console.log("Editor format changed to json");
        break;
      case "csv":
        setEditorMode("csv");
        setExtensions([EditorView.lineWrapping, langs.mathematica()]);
        console.log("Editor format changed to csv");
        break;
      case "txt":
        setEditorMode("txt");
        setExtensions([EditorView.lineWrapping]);
        console.log("Editor format changed to txt");
        break;
      default:
        setEditorMode("json");
        setExtensions([EditorView.lineWrapping]);
        console.log("Editor format changed to json");
        break;
    }
  }

  const showAlert = (type) => {
    switch (type) {
      case "success":
        setIsSuccessAlertVisible(true);

        setTimeout(() => {
          setIsSuccessAlertVisible(false);
        }, 2000);
        break;
      case "danger":
        setIsDangerAlertVisible(true);

        setTimeout(() => {
          setIsDangerAlertVisible(false);
        }, 2000);
        break;
      default:
    }
  };

  const onChangeLeft = useCallback((val) => {
    setLeftValue(val);
  }, []);

  const onChangeRight = useCallback((val) => {
    setRightValue(val);
  }, []);

  const onClickCopy = (direction) => {
    if (direction === "left") {
      navigator.clipboard.writeText(leftValue);
    } else if (direction === "right") {
      navigator.clipboard.writeText(rightValue);
    }
    showAlert("success");
  };

  const getParsedIOCs = () => {
    const iocText = xss(leftValue);
    const iocs = extractIOC(iocText);
    let filteredIOCs = {};

    Object.keys(iocs).forEach((key) => {
      if (iocs[key].length > 0) {
        filteredIOCs[key] = iocs[key];
      }
    });

    formatData(filteredIOCs);
  };

  const formatData = (data) => {
    if (Object.keys(data).length === 0) {
      setParsedData({ json: "🥲", csv: "🥲", txt: "🥲" });
      return;
    }

    let json = data;
    let csv = jsonToCsv(data);
    let text = jsonToText(data);

    setParsedData({ json: json, csv: csv, txt: text });
  };

  const writeParsedData = useCallback((data) => {
    switch (editorMode) {
      case "json":
        setRightValue(JSON.stringify(data["json"], null, 2));
        break;
      case "csv":
        setRightValue(data["csv"]);
        break;
      case "txt":
        setRightValue(data["txt"]);
        break;
      default:
        break;
    }
  }, [editorMode]);

  useEffect(() => {
    if (parsedData !== undefined) {
      writeParsedData(parsedData);
    }
  }, [parsedData, editorMode, writeParsedData]);

  return (
    <>
      <CAlert
        color="success"
        className="position-fixed w-100"
        visible={isSuccessAlertVisible}
      >
        Successfully copied text to clipboard.
      </CAlert>
      <CAlert
        color="danger"
        className="position-fixed w-100"
        visible={isDangerAlertVisible}
      >
        Payload too large.
      </CAlert>
      <div className="app-container">
        <CContainer className="border rounded bg-dark p-0">
          <EditorTopBar
            onClickTrashLeft={() => setLeftValue(undefined)}
            onClickTrashRight={() => setRightValue(undefined)}
            onClickCopy={onClickCopy}
            showAlert={showAlert}
            parseIOCs={getParsedIOCs}
            setLeftValue={setLeftValue}
            rightValue={rightValue}
            changeCodeFormat={changeCodeFormat}
            editorMode={editorMode}
          />
          <EditorBody
            leftValue={leftValue}
            rightValue={rightValue}
            onChangeLeft={onChangeLeft}
            onChangeRight={onChangeRight}
            extensions={extensions}
          />
        </CContainer>
      </div>
    </>
  );
}
