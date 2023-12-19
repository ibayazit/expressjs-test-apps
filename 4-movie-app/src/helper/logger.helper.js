module.exports = (title, content) => {
  console.log(
    `LOG [%c${title}] : %c${content}`,
    "color:orange;",
    "color:green;"
  );
};
