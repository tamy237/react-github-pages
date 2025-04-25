import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTint, FaUsers, FaBuilding, FaClinicMedical,
  FaHome, FaPlusCircle, FaUserCog, FaHandshake, FaHandsHelping,
  FaCalendarAlt, FaGift, FaMapMarkedAlt, FaBars
} from "react-icons/fa";
import axios from "axios";

export default function Ajout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "donneur", // Par défaut un donneur
    // D'autres champs spécifiques seront ajoutés en fonction du type
  });
  const [lieux, setLieux] = useState([]);
  const [partenaires, setPartenaires] = useState([]);
  const [cts, setCts] = useState([]);
  const [associations, setAssociations] = useState([]);
  
  const links = [
    { name: "Accueil", icon: <FaHome />, to: "/dashboard" },
    { name: "Ajouter", icon: <FaPlusCircle />, to: "/ajouter" },
    { name: "Donneurs", icon: <FaUsers />, to: "/ldon" },
    { name: "Utilisateur", icon: <FaUserCog />, to: "/dashboard" },
    { name: "CTS", icon: <FaClinicMedical />, to: "/cts" },
    { name: "Association", icon: <FaHandshake />, to: "/associations" },
    { name: "Partenaires", icon: <FaBuilding />, to: "/partenaires" },
    { name: "Bénévoles", icon: <FaHandsHelping />, to: "/benevoles" },
    { name: "Collecte", icon: <FaCalendarAlt />, to: "/collecte" },
    { name: "Dons", icon: <FaGift />, to: "/dons" },
    { name: "Lieu de Collecte", icon: <FaMapMarkedAlt />, to: "/lieucollecte" },
  ];

  useEffect(() => {
    // Charger les données nécessaires pour les listes déroulantes
    const fetchData = async () => {
      try {
        const lieuxResponse = await axios.get("/api/lieux");
        const partenairesResponse = await axios.get("/api/partenaires");
        const ctsResponse = await axios.get("/api/cts");
        const associationsResponse = await axios.get("/api/associations");
        setLieux(lieuxResponse.data);
        setPartenaires(partenairesResponse.data);
        setCts(ctsResponse.data);
        setAssociations(associationsResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    axios.get('http://localhost:3001/api/donors')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des donneurs :', error);
  });

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises:", formData);
    // Ajoute ici la logique pour envoyer les données vers l'API ou la base de données
  };
  
    const [quartiers, setQuartiers] = useState([]);
  
    // Tableau des quartiers par commune
    const quartiersParCommune = {
      'Yaoundé 1': ['Quartier 1A', 'Quartier 1B', 'Quartier 1C'],
      'Yaoundé 2': ['Quartier 2A', 'Quartier 2B', 'Quartier 2C'],
      'Yaoundé 3': ['Quartier 3A', 'Quartier 3B', 'Quartier 3C'],
      'Yaoundé 4': ['Quartier 4A', 'Quartier 4B', 'Quartier 4C'],
      'Yaoundé 5': ['Quartier 5A', 'Quartier 5B', 'Quartier 5C'],
      'Yaoundé 6': ['Quartier 6A', 'Quartier 6B', 'Quartier 6C'],
      'Yaoundé 7': ['Quartier 7A', 'Quartier 7B', 'Quartier 7C'],
    };
  
    // Fonction pour gérer le changement de commune
    const handleCommuneChange = (e) => {
        const commune = e.target.value;
        setFormData((prev) => ({
          ...prev,
          commune,
          quartier: '',
        }));
        setQuartiers(quartiersParCommune[commune] || []);
      };
      
    // Fonction pour gérer le changement de quartier
    const handleQuartierChange = (e) => {
        const quartier = e.target.value;
        setFormData((prev) => ({
          ...prev,
          quartier,
        }));
      };

    

  return (
    <div className="flex flex-col h-screen bg-gray-100  bg-centermt-0">
                {/* Logo Banque de Sang - Desktop uniquement */}
            <div className="hidden border-blue-400 md:flex items-center h-16 px-4 py-2 bg-red-600 text-white gap-4">
                <div className="bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-white text-xl">
                    B
                </div>
                <h1 className="text-xl font-semibold">Banque de Sang</h1>
            </div>

            {/* Burger menu + logo - Mobile uniquement */}
            {/* <div className="flex md:hidden justify-between items-center px-4 py-2 bg-red-600 text-white">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-white text-sm">
                    B
                    </div>
                    <span className="text-sm font-semibold">Banque de Sang</span>
                </div>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <FaBars size={24} />
                </button>
            </div> */}


        {/* Burger menu on small screens */}
        <div className="flex justify-between border-blue-400  items-center px-4 h-16 mt-0 bg-red-600 text-white md:hidden">
              <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <div className="flex items-center gap-2">
                <div className="bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-white text-sm">
                B
                </div>
                <span className="text-lg font-semibold">Banque de Sang</span>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars size={24} />
            </button>
       </div>


        {menuOpen && (
            <div className="md:hidden bg-red-100 text-white px-4 py-2 space-y-2">
                {links.map((link) => (
                    <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-1 hover:bg-red-800"
                    >
                    {link.icon}
                    {link.name}
                    </Link>
                ))}
            </div>
        )}

            <div className="flex-1 flex h-screen w-full border-blue-400  overflow-hidden">
                
                        {/* Vertical nav for large screens */}
             <div className="flex flex-1">
                        {/* Barre de navigation verticale (visible uniquement sur grand écran) */}
                    <div className="hidden md:flex flex-col bg-gray-200 text-white p-6 space-y-4 w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                        {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="flex items-center gap-3 hover:bg-red-700 px-2 py-2 rounded"
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                        ))}
                

                    {/* Contenu principal scrollable à droite */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* Ton formulaire ici */}
                    </div>
                </div>

                        {/* Formulaire d'ajout */}
                        <div className="w-full h-full bg-[url('/public/dds1.jpg')]  bg-cover bg-center p-6 rounded-lg text-gray-900 shadow-md overflow-y-auto max-h-[calc(100vh-6rem)]">
                            <h2 className="text-3xl font-semibold mb-6 text-center">
                                Ajouter un {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
                            </h2>

                            <form onSubmit={handleSubmit} > 
                                 {/* Type de personne */}
                                 <div className="mb-4">
                                    <label htmlFor="type" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                        Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2  bg-amber-100 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                    >
                                        <option value="donneur">Donneur</option>
                                        <option value="collecte">Collecte</option>
                                        <option value="donneur-collecte">Donneur à la collecte</option>
                                        <option value="appel-benevole">appel benevoles et donneurs</option>
                                    </select>
                                </div>


                                {/* Dynamically rendered fields based on type */}
                                {formData.type === "donneur" && (
                                <div>
                                    {/* Formulaire Donneur */}
                                     {/* Nom */}
                                    <div className="mb-4 text md:text-lg lg:text-2xl">
                                        <label htmlFor="name" className="block md:text-lg lg:text-2xlfont-medium text-gray-800">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 text-gray-800 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-amber-50"
                                            required
                                        />
                                    </div>
                                
                                    <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Prénom
                                        </label>
                                        <input
                                            type="text"
                                            id="prenom"
                                            name="prenom"
                                            value={formData.prenom}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 text-gray-800 rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Date de Naissance
                                        </label>
                                        <input
                                            type="date"
                                            id="datenaissance"
                                            name="datenaissance"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 text-gray-800   rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Numero de Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            id="tel"
                                            name="contact"
                                            value={formData.telephone}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 text-gray-800 rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="type" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Commune
                                        </label>
                                        <select
                                            name="commune"
                                            value={formData.commune || ''}
                                            onChange={handleCommuneChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                            >
                                            <option value="" className="text-gray-400">Sélectionner une commune</option>
                                            <option value="Yaoundé 1">Yaoundé 1</option>
                                            <option value="Yaoundé 2">Yaoundé 2</option>
                                            <option value="Yaoundé 3">Yaoundé 3</option>
                                            <option value="Yaoundé 4">Yaoundé 4</option>
                                            <option value="Yaoundé 5">Yaoundé 5</option>
                                            <option value="Yaoundé 6">Yaoundé 6</option>
                                            <option value="Yaoundé 7">Yaoundé 7</option>
                                        </select>
                                </div>
                                    <div className="mb-4">
                                        <label htmlFor="quartier" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                        Quartier
                                        </label>
                                        <select
                                        name="quartier"
                                        value={formData.quartier}
                                        onChange={handleQuartierChange}
                                        className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                        disabled={!formData.commune} // Désactiver le sélecteur de quartier si aucune commune n'est sélectionnée
                                        >
                                        <option value="">...</option>
                                        {quartiers.map((quartier, index) => (
                                            <option key={index} value={quartier}>
                                            {quartier}
                                            </option>
                                        ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="adresse" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Adresse
                                        </label>
                                        <input
                                            type="text"
                                            id="adresse"
                                            name="localisation"
                                            value={formData.adresse}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Sexe
                                        </label>
                                        <div className="flex flex-row md:text-lg lg:text-2xl mx-30 p-2 justify-around items-center w-1/2">
                                            <input
                                                type="radio"
                                                id="choix"
                                                name="sexe"
                                                value={formData.telephone}
                                                onChange={handleChange}
                                                className="mt-1 block w-1/10 p-2 border border-gray-400 shadow-sm  bg-amber-50"
                                                required
                                            />Masculin
                                            <input
                                                type="radio"
                                                id="choix"
                                                name="sexe"
                                                value={formData.telephone}
                                                onChange={handleChange}
                                                className="mt-1 block w-1/10 p-2 border border-gray-400  shadow-sm  bg-amber-50"
                                                required
                                            /> Feminin
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Poids(kg)
                                        </label>
                                        <input
                                            type="number"
                                            id="poids"
                                            name="poids"
                                            value={formData.telephone}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Groupage
                                        </label>
                                        <select
                                            name="groupage"
                                            value={formData.groupage}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                        >
                                            <option value="groupeage">Select a value ...</option>
                                            <option value="A+"> A+ </option>
                                            <option value="A-"> A- </option>
                                            <option value="B+"> B+ </option>
                                            <option value="B-"> B- </option>
                                            <option value="O+"> O+ </option>
                                            <option value="O-"> O- </option>
                                            <option value="AB+"> AB+ </option>
                                            <option value="AB-"> AB- </option>
                                        </select>
                                    </div>

                                    {/* Ajouter d'autres champs comme "date de naissance", "poids", etc */}
                                </div>
                                )}

                               

                                {formData.type === "collecte" && (
                                <div>
                                    {/* Formulaire Collecte */}
                                    <div className="mb-4">
                                        <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                           Type de collecte
                                        </label>
                                        <select
                                            name="typecollecte"
                                            value={formData.typecollecte}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                        >
                                            <option value="groupeage">Select a value ...</option>
                                            <option value="don total"> Don de sang total </option>
                                            <option value="don plasma"> Don de plasma </option>
                                            <option value="don plaquettes"> Don de plaquettes </option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Date
                                        </label>
                                        <input
                                            type="time"
                                            id="heuredebut"
                                            name="heured"
                                            value={formData.timed}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Date
                                        </label>
                                        <input
                                            type="time"
                                            id="heurefin"
                                            name="heuref"
                                            value={formData.timef}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                           Nombre de don
                                        </label>
                                        <input
                                            type="number"
                                            id="nbdon"
                                            name="nbdon"
                                            value={formData.nbdon}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                           Idlieu
                                        </label>
                                        <select
                                            name="lieu"
                                            value={formData.idlieu}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                        >
                                            <option value="">Select a value ...</option>
                                            <option value="l1"> lieu1 </option>
                                            <option value="l2"> lieu 2 </option>
                                            <option value="ln"> lieu n </option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                           Idpartenaire
                                        </label>
                                        <select
                                            name="partenaire"
                                            value={formData.idpartenaire}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                        >
                                            <option value="">Select a value ...</option>
                                            <option value="l1"> partenaire1 </option>
                                            <option value="l2"> partenaire 2 </option>
                                            <option value="ln"> partenaire n </option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                           Idcts
                                        </label>
                                        <select
                                            name="idcts"
                                            value={formData.idcts}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                        >
                                            <option value="">Select a value ...</option>
                                            <option value="l1"> cts 1 </option>
                                            <option value="l2"> cts 2 </option>
                                            <option value="ln"> cts n </option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                           Idassociation
                                        </label>
                                        <select
                                            name="Idassociation"
                                            value={formData.idassociation}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                        >
                                            <option value="">Select a value ...</option>
                                            <option value="l1"> association 1 </option>
                                            <option value="l2"> association 2 </option>
                                            <option value="ln"> association n </option>
                                        </select>
                                    </div>

                                    {/* Ajouter d'autres champs comme "idlieu", "idpartenaire", etc sous forme de listes déroulantes */}
                                </div>
                                )}

                                {formData.type === "donneur-collecte" && (
                                    <div>
                                        {/* Formulaire ajout donneur a la Collecte */}
                                        <div className="mb-4">
                                            <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Idcollecte
                                            </label>
                                            <select
                                                name="Idcollecte"
                                                value={formData.idcollecte}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                            >
                                                <option value="groupeage">Select a value ...</option>
                                                <option value="don total"> collecte 1</option>
                                                <option value="don plasma"> collecte 2 </option>
                                                <option value="don plaquettes"> collecte n </option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Num carte
                                            </label>
                                            <select
                                                name="numcarte"
                                                value={formData.numcarte}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                            >
                                                <option value="groupeage">Select a value ...</option>
                                                <option value="don total"> Idcarte 1</option>
                                                <option value="don plasma"> Idcarte 2 </option>
                                                <option value="don plaquettes"> Idcarte n </option>
                                            </select>
                                        </div>
                                         <div className="mb-4">
                                            <label className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                                Remarque
                                            </label>
                                            <textarea 
                                               type="commentaires"
                                                id="remarque"
                                                name="rmq"
                                                value={formData.remarque}
                                                onChange={handleChange}
                                                className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm  bg-white"
                                                required />
                                         </div>

                                    </div>
                                        ) }

                            {formData.type === "appel-benevole" && (
                                <div>
                                    {/* Formulaire appel benevoles et donneurs */}
                                    <div className="mb-4">
                                            <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Idcollecte
                                            </label>
                                            <select
                                                name="Idcollecte"
                                                value={formData.idcollecte}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                            >
                                                <option value="groupeage">Select a value ...</option>
                                                <option value="don total"> collecte 1</option>
                                                <option value="don plasma"> collecte 2 </option>
                                                <option value="don plaquettes"> collecte n </option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Num carte
                                            </label>
                                            <select
                                                name="numcarte"
                                                value={formData.numcarte}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                            >
                                                <option value="groupeage">Select a value ...</option>
                                                <option value="don total"> Idcarte 1</option>
                                                <option value="don plasma"> Idcarte 2 </option>
                                                <option value="don plaquettes"> Idcarte n </option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Statut appel
                                            </label>
                                            <select
                                                name="statutapp"
                                                value={formData.statutapp}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                            >
                                                <option value="groupeage">Select a value ...</option>
                                                <option value="don total"> Bénévole </option>
                                                <option value="don plasma"> Donneur contacté </option>
                                                <option value="don plaquettes"> Pas de reponse </option>
                                                <option value="don plaquettes"> Faux numéro </option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label  className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                            Reponse donneur
                                            </label>
                                            <select
                                                name="statutdonn"
                                                value={formData.statutdonn}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500  bg-amber-50"
                                            >
                                                <option value="groupeage">Select a value ...</option>
                                                <option value="don total"> Sera présent </option>
                                                <option value="don plasma"> Ne pourra pas etre présent </option>
                                                <option value="don plaquettes"> N'est pas sur de venir </option>
                                                <option value="don plaquettes"> Aucune réponse </option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                        <label htmlFor="prenom" className="block md:text-lg lg:text-2xl font-medium text-gray-800">
                                           Nombre de tentatives
                                        </label>
                                        <input
                                            type="number"
                                            id="nbessaie"
                                            name="nbessaie"
                                            value={formData.nbessaie}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-400 rounded-md shadow-sm  bg-amber-50"
                                            required
                                        />
                                    </div>
                                </div>
                                        ) }

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-red-600 md:text-lg lg:text-2xl text-white py-2 rounded-md hover:bg-red-700"
                                    >
                                    Ajouter
                                </button>
                            </form>
                        </div>
            </div>
        </div>
    </div>
  );
}
