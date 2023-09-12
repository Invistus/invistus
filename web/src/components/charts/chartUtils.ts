export const DEFAULT_PATH_COLOR: string = 'gray';
export const DEFAULT_AREA_COLOR: string = 'gray';
export const DEFAULT_TICKER_FONT_SIZE: number = 12;
export const DEFAULT_TICKER_DISTANCE: number = 35;
export const X_AXIS_TITLE_GAP: number = 35;
export const Y_AXIS_TITLE_GAP: number = 15;
export const LEGEND_GAP: number = 15;


let measurementSVG: SVGSVGElement | null = null;
let measurementText: SVGTextElement | null = null;

export const measureText = (text: string, fontSize: number = DEFAULT_TICKER_FONT_SIZE): number => {
  // Create an SVG namespace
  const svgNS = "http://www.w3.org/2000/svg";
  
  if (!measurementSVG) {
    // Create a new SVG element
    measurementSVG = document.createElementNS(svgNS, "svg");
    measurementSVG.style.position = "absolute";
    measurementSVG.style.top = "-9999px";
    measurementSVG.style.left = "-9999px";
    document.body.appendChild(measurementSVG);

    // Create a new text element
    measurementText = document.createElementNS(svgNS, "text");
    measurementSVG.appendChild(measurementText);
  }

  if (measurementText) {
    // Set the text content and font size
    measurementText.textContent = text;
    measurementText.setAttribute("font-size", fontSize.toString());

    // Get the bounding box of the text
    const bbox = measurementText.getBBox();
    
    // Return the width
    return bbox.width;
  }
  
  return 0;
};
