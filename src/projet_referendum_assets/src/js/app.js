App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  contractInstance: null,



  init: async () => {
    await App.initWeb3()
    await App.initContract()
    await App.render()
  },

  initWeb3: async () => {

if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        await ethereum.enable()
        web3.eth.defaultAccount=web3.eth.accounts[0]
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
      }
    }
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      web3.eth.sendTransaction({/* ... */})
    }
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  initContract: async () => {

    const contract = await $.getJSON('Referendum.json')
    App.contracts.Referendum = TruffleContract(contract)
    App.contracts.Referendum.setProvider(App.web3Provider)
  },

    render: async () => {

    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#account').html(App.account);
      }
    })

    const contract = await App.contracts.Referendum.deployed()
    App.contractInstance = contract
    const prixDon = await App.contractInstance.getPrixDon()
    $('#prix').html(web3.fromWei(prixDon, "ether").toNumber())
    const ouiVote = await App.contractInstance.getOuiVote()
    $('#ouiVote').html(ouiVote.toString(10))
    const nonVote = await App.contractInstance.getNonVote()
    $('#nonVote').html(nonVote.toString(10))
    const nomReferendum = await App.contractInstance.get()
    $('#nomReferendum').html(nomReferendum)
    const contribution = await App.contractInstance.getContribution()
    $('#donRealiser').html(web3.fromWei(contribution, "ether").toNumber())
    const laPage = $('#laPage')
    laPage.show()


  },

  donner: async () => {
    console.log("Dans donner" );
    await App.contractInstance.donnation(10000000000000000, {
        from: App.account,
        value: 10000000000000000,
        gas: 500000 
      });
    window.alert('Rafraichir la page: Don effectuer')
  },

  addVote: async () => {

    const choix = $("input[name='optionVote']:checked").val();

    if (choix == 1){
      await App.contractInstance.addOui()
      window.alert('Rafraichir la page: Valeur OUI modifie')
    } else {
      await App.contractInstance.addNon()
      window.alert('Rafraichir la page: Valeur NON modifie')
    }

  }

}  



$(function() {
  $(window).load(function() {
    App.init();
  });
});
