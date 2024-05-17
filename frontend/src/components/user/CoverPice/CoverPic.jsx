import React, { useState } from 'react';
import axios from "axios";

// Définition du composant CoverPic qui accepte une prop storageKey pour identifier de manière unique le localStorage utilisé.
const CoverPic = (props, { storageKey }) => {
    // Initialiser coverImage à partir du localStorage en utilisant la clé fournie ou à '' si rien n'est trouvé.
    const [coverImage, setCoverImage] = useState(props.mydata ? props.mydata.photo_couv : "");
    const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;
    const x = localStorage.getItem('token')

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
        let formData = new FormData();

        formData.append('Image', null);

        formData.append('first_name', props.mydata.first_name);
        formData.append('last_name', props.mydata.last_name);
        formData.append('birthday', props.mydata.birthday);
        formData.append('location', props.mydata.location);
        formData.append('photo_couv', file);




        axios.put(`${BASE_URL_HTTP}/user/register`,
            formData
            , {
                headers: {
                    'Authorization': `token ${x}`,
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryGNvWKJmmcVAPkS3a',
                    accept: 'application/json',
                },

            }).then((res) => {
                window.location.reload();

            }, (error) => { console.log(error.message, error.response) })
    };
    let covert = props.mydata && props.mydata.photo_couv ? BASE_URL_HTTP + props.mydata.photo_couv : coverImage
    // Style pour le conteneur de l'image de couverture
    const coverStyle = {
        background: '#D7D9F9',
        height: '315px',
        width: '815px',
        backgroundImage: `url(${covert})`,
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
            {props.iscurrentuser && <button
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
