function swapCards(clickedCard) {
    if (clickedCard.classList.contains('card-center')) return;

    const container = document.getElementById('reelsStack');
    const centerCard = container.querySelector('.card-center');
    
    const clickedIsLeft = clickedCard.classList.contains('card-left');

    if (clickedIsLeft) {
        clickedCard.classList.replace('card-left', 'card-center');
        centerCard.classList.replace('card-center', 'card-left');
    } else {
        clickedCard.classList.replace('card-right', 'card-center');
        centerCard.classList.replace('card-center', 'card-right');
    }

    // Explicitly update z-index for mobile browsers
    container.querySelectorAll('.stack-card').forEach(card => {
        card.style.zIndex = card.classList.contains('card-center') ? "10" : "1";
    });

    centerCard.classList.remove('active');
    clickedCard.classList.add('active');
}
