function counterUp(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const step = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, step);
}

// Quand la page est complètement chargée
window.addEventListener('DOMContentLoaded', () => {
    const clientsElement = document.getElementById('clients');
    const partenairesElement = document.getElementById('partenaires');
    const prixElement = document.getElementById('PrixGagner');

    // Définir les valeurs finales
    const clientsSatisfaits = 500;
    const partenaires = 100;     
    const prixGagnes = 20;       

    // Lancer les compteurs
    counterUp(clientsElement, 0, clientsSatisfaits, 2000);
    counterUp(partenairesElement, 0, partenaires, 2000);
    counterUp(prixElement, 0, prixGagnes, 2000); 
});
