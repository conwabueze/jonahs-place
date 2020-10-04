class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //filter out general fields
    const queryObj = { ...this.queryString };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'size',
      'priceTo',
      'priceFrom',
    ];
    excludedFields.forEach((field) => delete queryObj[field]);
    //filtering for less than greater than operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sizeFilter() {
    if (this.queryString.size) {
      const sizes = this.queryString.size;
      if (typeof sizes === 'string') {
        this.query = this.query.find({
          [`sizesAndQuantity.${sizes}`]: { $exists: true },
        });
      } else if (typeof sizes === 'object') {
        const filterArr = [];
        sizes.forEach((size) => {
          filterArr.push({ [`sizesAndQuantity.${size}`]: { $exists: true } });
        });
        this.query = this.query.find({
          $or: filterArr,
        });
      }
    }
    return this;
  }

  priceFilter() {
    if (this.queryString.priceFrom && this.queryString.priceTo) {
      this.query = this.query.find({
        price: {
          $gte: this.queryString.priceFrom,
          $lte: this.queryString.priceTo,
        },
      });
    } else if (this.queryString.priceFrom && !this.queryString.priceTo) {
      this.query = this.query.find({
        price: {
          $gte: this.queryString.priceFrom,
        },
      });
    } else if (this.queryString.priceTo && !this.queryString.priceFrom) {
      this.query = this.query.find({
        price: {
          $lte: this.queryString.priceTo,
        },
      });
    }

    return this;
  }

  limitFields() {
    //field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  sort() {
    //sorting
    if (this.queryString.sort) {
      const fields = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(fields);
    } else {
      this.query = this.query.sort('price');
    }

    return this;
  }

  paginate() {
    ///pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
