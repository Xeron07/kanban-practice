const colors: Array<string> = [
  "#ffedd5",
  "#ecfccb",
  "#ccfbf1",
  "#cffafe",
  "#e0f2fe",
  "#e0e7ff",
  "#f3e8ff",
  "#ffe4e6",
];

let colorPicker = (inx: number) => {
  if (inx >= colors.length) inx = 0;
  return colors[inx];
};

const randomColorPicker = () => {
  return colorPicker(Math.floor(Math.random() * colors.length));
};

export { randomColorPicker };
export default colorPicker;
