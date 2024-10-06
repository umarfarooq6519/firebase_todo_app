import * as chrono from "chrono-node";

const parseFormatDate = (desc) => {
  // function to parse and format date/time
  const parsedDate = chrono.parseDate(desc);
  if (!parsedDate) return null;

  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedTime = parsedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  //   returns date/time string
  return `${formattedDate}, ${formattedTime}`;
};

export default parseFormatDate;
