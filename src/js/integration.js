document.addEventListener('DOMContentLoaded', function() {
    const formationContainer = document.querySelector('#FormationContainer .formaContainer');

    if (formationContainer) {
        fetch('../models/formationCard.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur HTTP : ' + response.status);
                }
                return response.text();
            })
            .then(template => {
                fetch('../donner/formation.json') // Chargement du fichier JSON contenant les informations sur les formations
                    .then(response => {
                        if (!response.ok) {document.addEventListener('DOMContentLoaded', function () {
                            const popupBtns = document.querySelectorAll('.button');
                            const popupWrap = document.querySelector('.popup-wrap');
                            const popupBox = document.querySelector('.popup-box');
                            const popupClose = document.querySelector('.popup-close');
                            const modalImage = document.querySelector('#modalImage'); // Sélectionner l'élément de l'image dans le modal
                        
                            // Fonction pour afficher l'image correspondante dans le modal
                            function showImage(imageUrl) {
                                modalImage.src = imageUrl; // Définir l'image à afficher dans le modal
                                popupWrap.style.display = 'block'; // Afficher la popup
                                popupWrap.style.opacity = 1; // Ajouter un effet de fondu
                                popupBox.classList.remove('transform-out');
                                popupBox.classList.add('transform-in');
                            }
                        
                            // Gestion du clic sur les boutons pour ouvrir la popup avec l'image correspondante
                            popupBtns.forEach(function (btn) {
                                btn.addEventListener('click', function (e) {
                                    const imageUrl = btn.getAttribute('data-image'); // Récupérer l'URL de l'image à partir de l'attribut data-image
                                    showImage(imageUrl); // Appeler la fonction showImage avec l'URL de l'image correspondante

                                    e.preventDefault();
                                });
                            });
                        
                            // Gestion du clic pour fermer la popup

                            popupClose.addEventListener('click', function (e) {
                                popupWrap.style.opacity = 0; // Effet de fondu avant de masquer
                                setTimeout(function () {
                                    popupWrap.style.display = 'none'; // Masquer après fondu
                                }, 500); // Durée de l'effet de fondu

                                popupBox.classList.remove('transform-in');
                                popupBox.classList.add('transform-out');

                                e.preventDefault();
                            });
                        
                            const formationContainer = document.querySelector('#FormationContainer .formaContainer');
                        
                            if (formationContainer) {
                                fetch('../models/formationCard.html')
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Erreur HTTP : ' + response.status);
                                        }
                                        return response.text();
                                    })
                                    .then(template => {
                                        fetch('../donner/formation.json') // Chargement du fichier JSON contenant les informations sur les formations
                                            .then(response => {
                                                if (!response.ok) {
                                                    throw new Error('Erreur HTTP : ' + response.status);
                                                }
                                                return response.json();
                                            })
                                            .then(data => {
                                                NbCart(data, template); // Appel de la fonction NbCart avec les données JSON
                                            })
                                            .catch(error => {
                                                console.error('Erreur lors du chargement du fichier JSON :', error);
                                            });
                                    })
                                    .catch(error => {
                                        console.error('Erreur lors du chargement du fichier formationCard.html :', error);
                                    });
                        
                                // Fonction pour afficher les cartes de formation à partir des données JSON
                                function NbCart(formations, template) {
                                    formations.forEach((formation, index) => {
                                        const card = document.createElement('article');
                                        card.classList.add('cardFor');
                                        
                                        // Remplacer le contenu de la carte avec le template
                                        let cardHtml = template
                                            .replace(/{{number}}/g, index + 1)
                                            .replace(/{{description}}/g, formation.Description)
                                            .replace(/{{For_titile}}/g, formation.Formation_Title)
                                            .replace(/{{Module1_titile}}/g, formation.Modules[0]?.Module_Title || '')
                                            .replace(/{{Module2_titile}}/g, formation.Modules[1]?.Module_Title || '')
                                            .replace(/{{Module3_titile}}/g, formation.Modules[2]?.Module_Title || '');
                        
                                        card.innerHTML = cardHtml;
                        
                                        // Ajouter un attribut data-image pour chaque carte afin de stocker l'image correspondante
                                        const imageUrl = `./img/formation/formation${index + 1}.png`; // Exemple d'URL d'image
                                        const popupBtn = card.querySelector('.popup-btn');
                                        popupBtn.setAttribute('data-image', imageUrl); // Associer l'URL de l'image à chaque bouton de la carte
                        
                                        // Ajouter la carte dans le conteneur
                                        formationContainer.appendChild(card);
                                    });
                                }
                            } else {
                                console.error('Le conteneur de formation est introuvable.');
                            }
                        });
                        
                            throw new Error('Erreur HTTP : ' + response.status);
                        }
                        return response.json();
                    })
                    .then(data => {
                        NbCart(data, template); // Appel de la fonction NbCart avec les données JSON
                    })
                    .catch(error => {
                        console.error('Erreur lors du chargement du fichier JSON :', error);
                    });
            })
            .catch(error => {
                console.error('Erreur lors du chargement du fichier formationCard.html :', error);
            });

        // Fonction pour afficher les cartes de formation à partir des données JSON
        function NbCart(formations, template) {
            formations.forEach((formation, index) => {
                const card = document.createElement('article');
                card.classList.add('cardFor');
                
                // Remplacer le contenu de la carte avec le template
                let cardHtml = template
                    .replace(/{{number}}/g, index + 1)
                    .replace(/{{description}}/g, formation.Description)
                    .replace(/{{For_titile}}/g, formation.Formation_Title)
                    .replace(/{{Module1_titile}}/g, formation.Modules[0]?.Module_Title || '')
                    .replace(/{{Module2_titile}}/g, formation.Modules[1]?.Module_Title || '')
                    .replace(/{{Module3_titile}}/g, formation.Modules[2]?.Module_Title || '');

                card.innerHTML = cardHtml;

                // Ajouter la carte dans le conteneur
                formationContainer.appendChild(card);
            });
        }
    } else {
        console.error('Le conteneur de formation est introuvable.');
    }
});
