import React, { useState, useEffect, useCallback } from "react";
import EditorTopBar from "./components/EditorTopBar";
import EditorBody from "./components/EditorBody";
import { CContainer, CAlert } from "@coreui/react";
import { EditorView } from "@codemirror/view";
import { langs } from "@uiw/codemirror-extensions-langs";
import { extractIOC } from "ioc-extractor";
import { toXML } from "jstoxml";
import { jsonToCsv, jsonToText } from "./helpers/fromJson.js"
import xss from "xss";

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

  const changeCodeFormat = useCallback((format) => {
    switch (format) {
      case "json":
        setEditorMode("json");
        break;
      case "xml":
        setEditorMode("xml");
        break;
      case "csv":
        setEditorMode("csv");
        break;
      case "txt":
        setEditorMode("txt");
        break;
      default:
        break;
    }
  }, []);

  const formatData = useCallback((data) => {
    if (Object.keys(data).length === 0) {
      setParsedData({ json: "🥲", csv: "🥲", txt: "🥲", xml:"🥲" });
      return;
    }

    let json = data;
    let csv = jsonToCsv(data);
    let text = jsonToText(data);
    let xml = toXML(data, {header:false, indent : "   "}).trim();

    setParsedData({ json: json, csv: csv, txt: text, xml: xml });
  }, []);

  const writeParsedData = useCallback((data) => {
    switch (editorMode) {
      case "json":
        setRightValue(JSON.stringify(data["json"], null, 2));
        setExtensions([EditorView.lineWrapping, langs.json()]);
        break;
      case "xml":
        setRightValue(data["xml"]);
        setExtensions([EditorView.lineWrapping, langs.xml()]);
        break;
      case "csv":
        setRightValue(data["csv"]);
        setExtensions([EditorView.lineWrapping]);
        break;
      case "txt":
        setRightValue(data["txt"]);
        setExtensions([EditorView.lineWrapping]);
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

  const showAlert = useCallback((type) => {
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
  }, []);


  const onChangeLeft = useCallback((val) => {
    setLeftValue(val);
  }, []);

  const onChangeRight = useCallback((val) => {
    setRightValue(val);
  }, []);

  const onClickCopy = useCallback((direction) => {
    if (direction === "left") {
      navigator.clipboard.writeText(leftValue);
    } else if (direction === "right") {
      navigator.clipboard.writeText(rightValue);
    }
    showAlert("success");
  }, [leftValue, rightValue, showAlert]);

  const getParsedIOCs = useCallback(() => {
    const iocText = xss(leftValue);
    const iocs = extractIOC(iocText);
    let filteredIOCs = {};

    Object.keys(iocs).forEach((key) => {
      if (iocs[key].length > 0) {
        filteredIOCs[key] = iocs[key];
      }
    });

    formatData(filteredIOCs);
  }, [leftValue, formatData]);

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
