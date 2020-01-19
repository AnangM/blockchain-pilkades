App = {
  web3Provider: null,
  contracts: {},
  account:"0x0",

  init :function(){
    console.log('Init app')
    return App.initWeb3();
  },

  initWeb3: async function() {

    if(typeof web3 !== "undefined"){
      console.log(typeof web3);
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);

      try{
        await ethereum.enable();
      }catch(err){
        console.log(err);
      }
    }else{
      console.log('undefined web3');
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
      web3 = new Web3(App.web3Provider);
    }
    console.log("init web3 success")
    return App.initContract();
  },

  initContract: function() {
   $.getJSON("Election.json",function(election){
     App.contracts.Election = TruffleContract(election);
     App.contracts.Election.setProvider(App.web3Provider);
     return App.render()
   })
  },

  render: function(){
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase((err,account) => {
      if(err === null){
        App.account = account;
        $("#accountAddress").html("Your account : " + account);
      }
      console.log(err, account)
    });

    App.contracts.Election.deployed().then(function(inst){
      electionInstance = inst;
      return electionInstance.candidatesCount();
    }).then(function(count){
      var candidatesResult = $("#candidateResult");
      candidatesResult.empty();
      console.log(count);
      for(var i =1 ; i <= count;i++){
        electionInstance.candidates(i).then(function(candidate){
          var id = candidate[0];
          var name = candidate[1];
          var vote = candidate[2];
          console.log(name);

          var candidateTemplate = `<tr><th>${id}</th><td>${name}</td><td>${vote}</td></tr>`;
          candidatesResult.append(candidateTemplate);
        });
      }

      loader.hide();
      content.show();

      console.log("idk whats happening")
    }).catch(function(err){
      console.warn(err);
    })
  }

}

$(function() {
  $(window).load(function() {
    App.init();
  });
});
