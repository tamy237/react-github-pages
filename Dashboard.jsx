import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  FaTint, FaUsers, FaBuilding, FaClinicMedical,
  FaHome, FaPlusCircle, FaUserCog, FaHandshake, FaHandsHelping,
  FaCalendarAlt, FaGift, FaMapMarkedAlt, FaBars,FaSearch,
  FaFileExport,
  FaHospitalAlt
} from "react-icons/fa";


export default function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bloodStock, setBloodStock] = useState([]);
  const [stats, setStats] = useState({ donors: 0, cts: 0, associations: 0 });
   const [searchVisible, setSearchVisible] = useState("");
   const handleSearch = (e) => {
    e.preventDefault();
    console.log("Recherche :", searchTerm);
    // Tu peux faire appel à une fonction de filtrage ici
  };
  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible); // Afficher ou cacher le champ de recherche
  };
  const handleSearchAuto = (term) => {
    console.log("Recherche auto :", term);
    // Ici tu peux filtrer une liste ou appeler une API
    // Ex : fetch(`/api/donneurs?search=${term}`)
    // setSearchResults(...) après la réponse
  };
  useEffect(() => {
    if (searchVisible.trim() !== "") {
      // Appelle la fonction de recherche ici (API ou filtrage local)
      handleSearchAuto(searchVisible);
    }
}, [searchVisible] // Ce useEffect s'exécute uniquement quand searchVisible change

);
  const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/connexion"); // <- Fonctionnera si useNavigate est bien appelé dans ce composant
    
  
};
  useEffect(() => {
    setBloodStock([
      { group: "A", quantity: 10, rh: "+" },
      { group: "A", quantity: 5, rh: "-" },
      { group: "O", quantity: 20, rh: "+" },
      { group: "O", quantity: 8, rh: "-" },
      { group: "AB", quantity: 6, rh: "+" },
      { group: "AB", quantity: 3, rh: "-" },
      { group: "B", quantity: 12, rh: "+" },
      { group: "B", quantity: 4, rh: "-" },
    ]);

    setStats({ donors: 1000, cts: 5, associations: 8 });
  }, []);

  const links = [
    { name: "Accueil", icon: <FaHome />, to: "/dashboard" },
    { name: "Ajouter", icon: <FaPlusCircle />, to: "/ajouter" },
    { name: "Donneurs", icon: <FaUsers />, to: "/Ldon" },
    { name: "Utilisateur", icon: <FaUserCog />, to: "/utilisateur" },
    { name: "CTS", icon: <FaClinicMedical />, to: "/cts" },
    { name: "Association", icon: <FaHandshake />, to: "/associations" },
    { name: "Partenaires", icon: <FaBuilding />, to: "/partenaires" },
    { name: "Bénévoles", icon: <FaHandsHelping />, to: "/benevoles" },
    { name: "Collecte", icon: <FaHospitalAlt />, to: "/collecte" },
    { name: "Dons", icon: <FaGift />, to: "/dons" },
    { name: "Lieu de Collecte", icon: <FaMapMarkedAlt />, to: "/lieucollecte" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[url('/public/dds1.jpg')] bg-cover bg-center">
      {/* Burger menu on small screens */}
      <div className="hidden border-blue-400 md:flex lg:flex items-center h-16 px-4 py-2 bg-red-500 text-white gap-4">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center font-bold text-white text-xl">
                                 B
                             </div>
                             <h1 className="text-xl font-semibold">Banque de Sang</h1>

                    <div className="relative w-full px-4 mt-2">
                      {/* Barre de recherche affichée sur petit écran */}
                      {searchVisible && (
                        <div className="absolute top-0 left-0 w-full bg-white p-4 border-b border-blue-300 z-10">
                          <form
                            onSubmit={(e) => e.preventDefault()} // Empêcher l'envoi pour l'exemple
                            className="flex border rounded border-blue-300 bg-white w-full"
                          >
                            <input
                              type="text"
                              name="rechercher"
                              id="rechercher"
                              placeholder="Rechercher..."
                              className="flex-grow px-2 py-1 text-black"
                            />
                            <button
                              type="submit"
                              onClick={handleSearchToggle}
                              className="px-4 text-blue-600 hover:text-blue-900"
                            >
                              <FaSearch size={20} />
                            </button>
                          </form>
                        </div>
                      )}

                      {/* Icône de recherche qui affiche l'input sur mobile */}
                      <div className="flex justify-between items-center w-1/3 sm:w-md">
                        <button type="button"
                          onClick={handleSearchToggle}
                          className="sm:none bg-transparent text-blue-600 hover:text-blue-900"
                        >
                          <FaSearch size={24} />
                        </button>

                        {/* Bouton Se Déconnecter */}
                        <div className="w-lg sm:w-auto flex justify-end sm:justify-start">
                        <button
                              type="button"
                              onClick={handleLogout}
                              className="bg-blue-500 hover:bg-blue-900 text-white py-2 px-4 rounded font-medium w-full sm:w-auto text-sm sm:text-base"
                            >
                              Se déconnecter
                         </button>


                        </div>
                      </div>
                      </div>

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
                <div className="flex justify-between border-blue-400  items-center px-4 h-16 mt-0 bg-red-500 text-white md:hidden">
                         <div className="flex items-center w-64 gap-2">
                             <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center font-bold text-white text-sm">
                             B
                             </div>
                             <span className="text-lg font-semibold">Banque de Sang</span>
                         <button onClick={() => setMenuOpen(!menuOpen)}>
                             <FaBars size={24} />
                         </button>
                         </div>
                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full px-4 mt-2 gap-4 ">
                            {/* Barre de recherche */}
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                              <form
                                onSubmit={handleSearch}
                                className="flex border rounded border-blue-300 bg-white w-full"
                              >
                                <label htmlFor="search" className="sr-only">Recherche</label>

                                <input
                                  type="text"
                                  id="search"
                                  name="search"
                                  placeholder="Rechercher..."
                                  value={searchVisible}
                                  onChange={(e) => setSearchVisible(e.target.value)}
                                  className="flex-grow px-2 py-1 text-black text-sm sm:text-base"
                                />
                                <button
                                  type="submit"
                                  name="submit"
                                  disabled={!searchVisible.trim()}
                                  className={`px-1 sm:px-0 text-blue-600 hover:text-blue-900 text-sm sm:text-base ${ 
                                         searchVisible.trim()
                                                  ? "text-blue-600 hover:text-blue-900"
                                                  : "text-gray-400 cursor-not-allowed"
                                              }`}
                                >
                                  <FaSearch size={20} />
                                </button>
                              </form>
                            </div>

                            {/* Bouton Se Déconnecter */}
                            <div className="w-full sm:w-auto flex justify-end sm:justify-start">
                              <button
                                onClick={handleLogout}
                                type="button"
                                name="button"
                                
                                className="bg-blue-500 hover:bg-blue-900 text-white py-2 px-4 rounded font-medium w-full sm:w-auto text-sm sm:text-base"
                              >
                                Se déconnecter
                              </button>
                            </div>
                          </div>

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

                      {/* Main content */}
                      <div className="flex-1 p-6 overflow-y-auto">
                        <h2 className="text-3xl font-bold mb-6">Page d'Accueil</h2>

                        {/* Stock de sang */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                          {bloodStock.length > 0 ? (
                            bloodStock.map((blood, index) => (
                              <div key={index} className="bg-white p-6 rounded-lg text-gray-700 shadow-md">
                                <h3 className="text-xl font-semibold flex items-center">
                                  <FaTint className="mr-2 text-red-600" />
                                  Groupe {blood.group} {blood.rh}
                                </h3>
                                <p className="text-lg">{blood.quantity} Poches</p>
                              </div>
                            ))
                          ) : (
                            <p>Chargement des données...</p>
                          )}
                        </div>

                        {/* Statistiques */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          <div className="bg-white p-6 rounded-lg text-gray-700 shadow-md">
                            <h3 className="text-xl font-semibold flex items-center">
                              <FaUsers className="mr-2 text-blue-600" />
                              Nombre de Donneurs
                            </h3>
                            <p className="text-lg">{stats.donors}</p>
                          </div>
                          <div className="bg-white p-6 rounded-lg text-gray-700 shadow-md">
                            <h3 className="text-xl font-semibold flex items-center">
                              <FaClinicMedical className="mr-2 text-green-600" />
                              Nombre de CTS
                            </h3>
                            <p className="text-lg">{stats.cts}</p>
                          </div>
                          <div className="bg-white p-6 rounded-lg text-gray-700 shadow-md">
                            <h3 className="text-xl font-semibold flex items-center">
                              <FaBuilding className="mr-2 text-yellow-600" />
                              Nombre d'Associations
                            </h3>
                            <p className="text-lg">{stats.associations}</p>
                          </div>
                          
                    </div>
               </div>
            </div>
      </div>
    </div>
  );
}