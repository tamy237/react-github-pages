import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Connexion() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    motdepasse: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Vérifie si l'utilisateur est déjà connecté
    if (localStorage.getItem("utilisateur") && location.pathname === "/connexion") {
      navigate("/");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/utilisateurs",
        formData
      );

      if (response.status === 201 || response.status === 200) {
        setMessage("Connexion réussie !");
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          motdepasse: "",
        });

        // ✅ Enregistrer dans le localStorage
        localStorage.setItem("utilisateur", JSON.stringify(response.data));

        // ✅ Rediriger immédiatement vers le dashboard
        navigate("/");
      }
    } catch (error) {
      setMessage("Erreur lors de la connexion.");
      console.error(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-white font-sans">
      {/* Barre supérieure */}
      <div className="bg-red-500 px-4 py-2 shadow-md text-white font-semibold text-lg flex items-center">
        <div className="bg-blue-900 rounded-md w-6 h-6 flex items-center justify-center mr-2 text-sm">B</div>
        Banque de sang
      </div>

      {/* Formulaire */}L
      <div className="flex items-center text-gray-800 justify-center min-h-[calc(100vh-64px)] p-4">
        <div className="bg-white rounded-2xl border p-8 w-full max-w-sm"
             style={{ boxShadow: "0 10px 30px rgba(255, 25, 25, 0.3)" }}>
          <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

          {message && (
            <div className="mb-4 text-center text-sm text-green-600 font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required
                   className="w-full border rounded-md px-3 py-2 text-gray-500 text-sm outline-none" />

            <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required
                   className="w-full border rounded-md px-3 py-2 text-sm outline-none" />

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required
                   className="w-full border rounded-md px-3 py-2 text-sm outline-none" />

            <input type="password" name="motdepasse" placeholder="Mot de passe" value={formData.motdepasse} onChange={handleChange} required
                   className="w-full border rounded-md px-3 py-2 text-sm outline-none" />

            <button type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
