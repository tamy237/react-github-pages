import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import {
    FaTint, FaUsers,FaUser , FaBuilding, FaClinicMedical,FaWeight,
    FaHome, FaPlusCircle, FaUserCog, FaHandshake, FaHandsHelping,
    FaCalendarAlt, FaGift, FaMapMarkedAlt, FaBars, FaFileExport,
    FaCity,
    FaDatabase,
    FaPhone,
    FaAddressCard,
    FaGenderless,
    FaTimes,
    FaSortNumericDown,
    FaSortNumericUp,
    FaDailymotion,
    FaSearch
  } from "react-icons/fa";
  import { Link } from "react-router-dom";


export default function Ldon() {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [donors, setDonors] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = true; // Modifier selon le rôle de l'utilisateur
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Recherche :", searchTerm);
    // Tu peux faire appel à une fonction de filtrage ici
  };

    useEffect(() => {
        axios
          .get("http://localhost:3001/donors")
          .then((response) => {
            setDonors(response.data);
            const uniqueBloodGroups = [...new Set(response.data.map(d => d.groupage))];
            setBloodGroups(uniqueBloodGroups);
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des donneurs :", error);
          });
      }, []);
      

  // Configuration de l'export CSV
  const csvHeaders = [
    { label: "Nom", key: "name" },
    { label: "Groupe Sanguin", key: "bloodGroup" },
    { label: "Poids (kg)", key: "weight" },
    { label: "Ville", key: "city" }
  ];
  const links = [
      { name: "Accueil", icon: <FaHome />, to: "/dashboard" },
      { name: "Ajouter", icon: <FaPlusCircle />, to: "/ajouter" },
      { name: "Donneurs", icon: <FaUsers />, to: "/Ldon" },
      { name: "Utilisateur", icon: <FaUserCog />, to: "/utilisateur" },
      { name: "CTS", icon: <FaClinicMedical />, to: "/cts" },
      { name: "Association", icon: <FaHandshake />, to: "/associations" },
      { name: "Partenaires", icon: <FaBuilding />, to: "/partenaires" },
      { name: "Bénévoles", icon: <FaHandsHelping />, to: "/benevoles" },
      { name: "Collecte", icon: <FaCalendarAlt />, to: "/collecte" },
      { name: "Dons", icon: <FaGift />, to: "/dons" },
      { name: "Lieu de Collecte", icon: <FaMapMarkedAlt />, to: "/lieucollecte" },
      ];

  return (
    <div className="flex flex-col h-screen bg-gray-100  bg-centermt-0">
        <div className="hidden border-blue-400 md:flex items-center h-16 px-4 py-2 bg-red-600 text-white gap-4">
                       <div className="bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-white text-xl">
                           B
                       </div>
                       <h1 className="text-xl font-semibold">Banque de Sang</h1>

                       <form
                        onSubmit={handleSearch}
                        className="relative border-white" // affichée seulement sur écran moyen et plus
                    > 
                        <input
                        type="text"
                        name="recherche"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-full px-4 py-1 text-black w-64 focus:outline-none border-white"
                        />
                        <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600"
                        >
                        <FaSearch size={20} />
                        </button>
                    </form>
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
                   <div className="flex items-center gap-2">
                       <div className="bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-white text-sm">
                       B
                       </div>
                       <span className="text-lg font-semibold">Banque de Sang</span>
                   </div>
                   <form
                        onSubmit={handleSearch}
                        className="relative border-white" // affichée seulement sur écran moyen et plus
                    >
                        <input
                        type="text"
                        name="recherche"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-full px-4 py-1 text-black w-64 focus:outline-none border-white"
                        />
                        <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600"
                        >
                        <FaSearch size={20} />
                        </button>
                    </form>
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
                                <div className="hidden md:flex flex-col bg-gray-100 text-white p-6 space-y-4 w-64">                                    {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.to}
                                        className="flex items-center gap-3 hover:bg-red-700 px-2 py-2 rounded"
                                    >
                                        {link.icon}
                                        {link.name}
                                    </Link>
                                    ))}
                                    <input type="search"
                                    className="border-white" />
                              </div>
                            
                    {/* Contenu principal */}
                    <div className="flex-1 p-6 bg-white flex flex-col h-screen  bg-centermt-0">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste des Donneurs</h1>

                        {/* Bouton Export CSV */}
                        <div className="mb-4">
                            <CSVLink
                                data={donors}
                                headers={csvHeaders}
                                filename="donneurs.csv"
                                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:bg-green-600"
                            >
                                <FaFileExport />
                                Exporter en CSV
                            </CSVLink>
                        </div>

                        <div className="w-full max-w-5xl bg-[url('/public/donor.jpg')]  bg-cover shadow-lg rounded-lg overflow-hidden flex-grow p-4 space-y-4">
                            <table className=" w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className=" lg:w-full md:w-1/2 bg-red-500 text-white">
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaUser className="inline-block mr-2" /> Nom
                                        </th>
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaCalendarAlt className="inline-block mr-2" /> Date de naissance
                                        </th>
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaPhone className="inline-block mr-2" /> Numero de telephone
                                        </th>
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaAddressCard className="inline-block mr-2" /> Adresse
                                        </th>
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaUsers className="inline-block mr-2" /> Sexe
                                        </th>
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaWeight className="inline-block mr-2" /> Poids
                                        </th>
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaTint className="inline-block mr-2" /> Groupe Sanguin
                                        </th>
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaCity className="inline-block mr-2" /> Ville
                                        </th>
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaCalendarAlt className="inline-block mr-2" /> Date dernier don
                                        </th>
                                        <th className="p-3 text-center border border-gray-300">
                                        <FaSortNumericUp className="inline-block mr-2" /> Nombre de dons
                                        </th>
                                        {isAdmin && (
                                        <th className="p-3 text-center border border-gray-300">Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {donors.map((donor, index) => (
                                        <tr key={index} className="border-bold hover:bg-gray-500">
                                        <td className="p-3 text-center border border-gray-800">{donor.nom}</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.prenom}</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.datenaissance}</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.telephone}</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.commune}</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.adresse}</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.sexe}</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.poids}(kg)</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.groupage}</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.datedernierdon}</td>
                                        <td className="p-3 text-center border border-gray-800">{donor.nbdon}</td>
                                        {isAdmin && (
                                            <td className="p-3 text-center border border-gray-300">
                                            <button className="text-blue-500 hover:text-blue-700 mr-2">
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <FaTrash />
                                            </button>
                                            </td>
                                        )}
                                        </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
}