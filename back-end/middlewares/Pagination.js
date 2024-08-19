module.exports = (req, res, next) => {
  const { page = 1, perPage = 20 } = req.query;
  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);

  if (
    isNaN(pageNumber) ||
    isNaN(perPageNumber) ||
    pageNumber < 1 ||
    perPageNumber < 1
  ) {
    return res
      .status(400)
      .json({ error: "Invalid page or perPage parameters" });
  }

  req.pagination = {
    perPage: perPageNumber,
    skip: (pageNumber - 1) * perPageNumber,
  };

  next();
};
