exports.DateNow = () => {
  const date = new Date();
  const year = date.getFullYear(); // 2023
  const month = date.getMonth() + 1; // 2 (Note: month is zero-indexed)
  const day = date.getDate(); // 14

  const offset = day + "/" + month + "/" + year;
  // 0 (Note: UTC is the reference time zone)

  return offset;
};
