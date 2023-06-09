
/// {% set globals %}

// insert globals that will transfer between cards here (but also can disappear at any point)
// this section is best used for temporary caches
// ...

/// {% endset %}






/// {% set functions %}

// =========
//  Example
// =========

const JPMNExample = (() => {

  const logger = new JPMNLogger("example");

  // private functions and variables here
  // ...

  class JPMNExample {
    constructor() {
      // ...
    }

    run() {
      logger.warn("Hello world!");
      // ...
    }
  }


  return JPMNExample;

})();

/// {% endset %}






/// {% set run %}

if ({{ utils.opt("modules", "example", "enabled") }}) {
  const example = new JPMNExample()
  example.run();
}

/// {% endset %}

