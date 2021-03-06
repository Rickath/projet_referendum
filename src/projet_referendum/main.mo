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
    };

    stable var maMention : Mention = {
        identifiant = 0;
        nomReferendum = "AMAZON";
        var oui = 10;
        var non = 9;
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

    //Fonction pour voter oui
    public shared(msg) func voteOui() : async Text {
        if (hasPermissionToVote(msg.caller)){
            listHasVoted := Array.append(listHasVoted,Array.make(msg.caller));
            maMention.oui := maMention.oui + 1;
            return "Votre vote oui a bien été enregistré";
        };
        return "Vous avez déjà voté";
    };

    //Fonction pour voter non
    public shared(msg) func voteNon() : async Text {
        if (hasPermissionToVote(msg.caller)){
            listHasVoted := Array.append(listHasVoted,Array.make(msg.caller));
            maMention.non := maMention.non + 1;
            return "Votre vote non a bien été enregistré";
        };
        return "Vous avez déjà voté";
    };

    //Fonction example qui renvoie hello + l'identité (le principal)
    public shared(msg) func greet() : async Text {
        return "Hello, " # Principal.toText(msg.caller) # "!";
    };

};
