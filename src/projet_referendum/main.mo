// Import base modules
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Cycles "mo:base/ExperimentalCycles";


shared(msg) actor class(){

    type Mention = {
        identifiant : Nat;
        nomReferendum: Text;
        var oui : Nat;
        var non : Nat;
        prixContribution : Nat;
        var balance : Nat64;
    };

    stable var maMention : Mention = {
        identifiant = 0;
        nomReferendum = "AMAZON";
        var oui = 10;
        var non = 9;
        prixContribution = 1;
        // Une variable balance stable qui va conserver le solde du canister (qui évolue via les dons)
        var balance = 0;
    };

    // Une liste "stable" (~ statique) hasVoted qui liste tous les Principal (~ identifiant) qui ont voté
    private stable var listHasVoted: [Principal] = [];
    
    // Retourner le principal du caller (=identité de l'utilisateur)
    public shared(msg) func callerPrincipal() : async Principal {
        return msg.caller;
    };

    // Renvoyer le nom du référundum
    public query func getNomReferendum() : async Text {
        return maMention.nomReferendum;
    };

    // Renvoyer le nombre de oui au référundum enregistrés
    public query func getOui() : async Nat {
        return maMention.oui;
    };

    // Renvoyer le nombre de non au référundum enregistrés
    public query func getNon() : async Nat {
        return maMention.non;
    };

    // Renvoyer le montant à dépenser pour un don
    public query func getPrixDon() : async Nat {
        return maMention.non;
    };

    // Renvoyer le montant des dons effectués jusqu'à présent
    public query func getContribution() : async Nat64 {
        return maMention.balance;
    };

    // Tester l'égalité de deux Principal
    private func eq(x : Principal, y : Principal) : Bool {
        return x == y;
    };

    // Vérifier que l'id n'a pas déjà voté
    func hasPermissionToVote(pal: Principal) : Bool {
        var canVote = true;
        for (prin in listHasVoted.vals()){
            canVote := canVote and prin!=pal;
        };
        return canVote;
    };

    public shared(msg) func voteOui() : async Text {
        if (hasPermissionToVote(msg.caller)){
            listHasVoted := Array.append(listHasVoted,Array.make(msg.caller));
            maMention.oui := maMention.oui + 1;
            return "Votre vote oui a bien été enregistré";
        };
        return "Vous avez déjà voté";
    };

    public shared(msg) func greet() : async Text {
        return "Hello, " # Principal.toText(msg.caller) # "!";
    };
};
