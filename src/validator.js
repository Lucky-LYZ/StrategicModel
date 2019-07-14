import strategies from "./strategies";

let Validator = function() {
  this.cache = [];
};
Validator.prototype.add = function(dom, rules) {
  debugger;
  let self = this;
  if (Array.isArray(rules)) {
    rules.map(rule => {
      (function(rule) {
        let strategyAry = rule.strategy.split(":");
        let errMsg = rule.errMsg;
        self.cache.push(function() {
          let strategy = strategyAry.shift();
          strategyAry.unshift(dom.value);
          strategyAry.push(errMsg);
          let strategyFunc = strategies[strategy];
          return strategyFunc.apply(dom, strategyAry);
        });
      })(rule);
    });
  }
};

/**
 * @method 启动各项验证
 */
Validator.prototype.start = function() {
  return this.cache.map(strategy => {
    let errMsg = strategy();
    if (errMsg) {
      return errMsg;
    }
  });
};

export default Validator;
