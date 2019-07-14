export default {
  isNotEmpty: function(value, errMsg) {
    if (value === "") {
      return errMsg;
    }
  },
  minLength: function(value, length, errMsg) {
    if (value.length < length) {
      return errMsg;
    }
  },
  isMobile: function(value, errMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errMsg;
    }
  }
};
