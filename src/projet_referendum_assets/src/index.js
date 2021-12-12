import { projet_referendum } from "../../declarations/projet_referendum";

App = {

    render: async () => {

    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#account').html(App.account);
      }
    })

    const prixDon = await projet_referendum.getPrixDon()
    $('#prix').html(prixDon.toString(10))
    const ouiVote = await projet_referendum.getOui()
    $('#ouiVote').html(ouiVote.toString(10))
    const nonVote = await projet_referendum.getNon()
    $('#nonVote').html(nonVote.toString(10))
    const nomReferendum = await projet_referendum.getNomReferundum()
    $('#nomReferendum').html(nomReferendum)
    const contribution = await projet_referendum.getContribution()
    $('#donRealiser').html(contribution.toString(10))
    const laPage = $('#laPage')
    laPage.show()


  }

/*  donner: async () => {
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

  }*/

}  



$(function() {
  $(window).load(function() {
    App.init();
  });
});
