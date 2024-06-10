import Homebackground from "./HomeScreens/Homebackground";
import Search from "./QuittanceScreens/Quittance";
import Contrat from "./ContratScreens/Contrat";
import Sinistre from "./SinistreScreen/Sinistre";
import Services from "./Services";
import Reclamation from "./DemandeScreens/Reclamation";
import Quittance from "./QuittanceScreens/Quittance";
import AddAvenant from "./DemandeScreens/AddAvenant";
import ContraDetails from "./ContratScreens/ContratDetails";
import Categories from "./Categories/Categories"; 
import { AppRegistry, } from "react-native";
import { registerRootComponent } from "expo";
import App from "../App";

AppRegistry.registerComponent("main", () => App);
registerRootComponent(App);
export {
    Homebackground,
    Search, 
    Contrat, 
    Sinistre, 
    Services, 
    Quittance, 
    Reclamation, 
    AddAvenant , 
    Categories, 
    ContraDetails
}