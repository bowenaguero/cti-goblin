export function jsonToCsv(json) {
  let csv = "type,value\n";

  Object.keys(json).forEach((key) => {
    if (json[key].length > 0) {
      json[key].forEach((entry) => {
        csv += `${key},${entry}\n`;
      });
    }
  });

  return csv.trim();
}

export function jsonToText(json) {
  let text = "";

  Object.keys(json).forEach((key) => {
    if (json[key].length > 0) {
      json[key].forEach((entry) => {
        text += `${entry}\n`;
      });
    }
  });

  return text.trim();
}
