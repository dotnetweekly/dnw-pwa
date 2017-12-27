const errorHelper = {
  hasError(field) {
    const errors = this.errors;
    for (var i = 0; i < errors.length; i++) {
      const error = errors[i];
      if (error.field === field) {
        return true;
      }
    }

    return false;
  },
  getError(field) {
    const errors = this.errors;
    for (var i = 0; i < errors.length; i++) {
      const error = errors[i];
      if (error.field === field) {
        return error.error.replace("{VALUE}", field).replace("{PATH}", field);
      }
    }

    return "";
  }
};

module.exports = errorHelper;
