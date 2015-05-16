var test = {
  'Calculator pow e2e test example' : function (client) {
    client
      .url('http://localhost:8080/')
      .waitForElementVisible('body', 1000)
      .assert.title('TypeScriptTesting')
      .assert.visible('input[@id=base]')
      .assert.visible('input[@id=exponent]')
      .setValue('input[@id=base]', '2')
      .setValue('input[@id=exponent]', '3')
      .waitForElementVisible('button[@id=submit]', 1000)
      .click('button[@id=submit]')
      .pause(1000)
      .assert.containsText('input[@id=result]', '8')
      .end();
  }
};

export = test;
