function searchBeaches() {
    var searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    if (searchQuery === 'goa') {
        window.location.href = 'goa.html';
    } else if (searchQuery === 'andaman') {
        window.location.href = 'andaman.html';
    } else if (searchQuery === 'kerala') {
        window.location.href = 'kerala.html';
    } else if (searchQuery === 'lakshadweep') {
        window.location.href = 'lakshadweep.html';
    } else if (searchQuery === 'tamilnadu') {
        window.location.href = 'tamil_nadu.html';
    } else if (searchQuery === 'westbengal') {
        window.location.href = 'westbengal.html';
    } else if (searchQuery === 'marine') {
        window.location.href = 'marine.html';
    } else if (searchQuery === 'juhu') {
        window.location.href = 'juhu.html';
    } else {
        alert('No matching beaches found.');
    }
}