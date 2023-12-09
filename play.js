function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
}