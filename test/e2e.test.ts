var test = {
  'Calculator pow e2e test example' : function (client) {
    client
      .url('http://localhost:8080/')
      .waitForElementVisible('body', 1000) // loading time 1 second
      .assert.title('TypeScriptTesting')
      .assert.visible('input#base')
      .assert.visible('input#exponent')
      .setValue('input#base', '2')
      .setValue('input#exponent', '3')
      .click('button#submit')
      .pause(100) // pow() should be really fast
      .assert.value('input#result', '8')
      .end();
  }
};

export = test;
