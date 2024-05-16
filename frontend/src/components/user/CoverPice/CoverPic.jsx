import React, { useState } from 'react';

// Définition du composant CoverPic qui accepte une prop storageKey pour identifier de manière unique le localStorage utilisé.
const CoverPic = ({ storageKey, iscurrentuser }) => {
    // Initialiser coverImage à partir du localStorage en utilisant la clé fournie ou à '' si rien n'est trouvé.
    const [coverImage, setCoverImage] = useState(localStorage.getItem(storageKey) || '');

    // Gestionnaire d'événements pour le changement de l'image de couverture
    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        // Action à la fin du chargement du fichier
        reader.onloadend = () => {
            setCoverImage(reader.result); // Mettre à jour l'état local avec l'image
            localStorage.setItem(storageKey, reader.result); // Stocker l'image en base64 dans le localStorage avec la clé unique
        };

        if (file) {
            reader.readAsDataURL(file); // Lire le fichier comme une URL de données
        }
    };

    // Style pour le conteneur de l'image de couverture
    const coverStyle = {
        background: '#D7D9F9',
        height: '315px',
        width: '815px',
        backgroundImage: `url(${coverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    // ID unique pour l'input de fichier basé sur la storageKey
    const inputId = `cover-image-input-${storageKey}`;

    return (
        <div className="profile-cover" style={coverStyle}>
            <input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                style={{ display: 'none' }}
            />
            {iscurrentuser && <button
                className="change-cover-button"
                onClick={() => document.getElementById(inputId).click()}
                style={{ margin: '10px' }}
            >
                Modifier la photo de couverture
            </button>}
        </div>
    );
};

export default CoverPic;
