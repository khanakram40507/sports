const matchesDiv = document.getElementById('matches');
const loadingText = document.getElementById('loading');

const apiURL = 'https://v3.football.api-sports.io/fixtures?next=5';
const apiKey = 'http://localhost:5000/api/matches';  // Replace with your real API key

function loadMatches() {
  loadingText.style.display = 'block';
  matchesDiv.innerHTML = '';

  fetch(apiURL, {
    method: 'GET',
    headers: {
      'x-apisports-key': apiKey
    }
  })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not OK');
      return response.json();
    })
    .then(data => {
      loadingText.style.display = 'none';

      if (!data.response || data.response.length === 0) {
        matchesDiv.innerHTML = '<p>No upcoming matches found.</p>';
        return;
      }

      data.response.forEach(event => {
        const match = document.createElement('div');
        match.className = 'match';

        const homeTeam = event.teams.home.name || 'TBD';
        const awayTeam = event.teams.away.name || 'TBD';
        const dateTime = new Date(event.fixture.date);
        const formattedDate = isNaN(dateTime) ? 'Date/Time TBD' : dateTime.toLocaleString(undefined, {
          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true
        });

        match.innerHTML = `
          <strong>${homeTeam} vs ${awayTeam}</strong>
          <div>Date: ${formattedDate}</div>
        `;
        matchesDiv.appendChild(match);
      });
    })
    .catch(error => {
      loadingText.style.display = 'none';
      matchesDiv.innerHTML = `<p>Error fetching matches: ${error.message}</p>`;
      console.error('Error fetching data:', error);
    });
}

document.getElementById('home').addEventListener('click', e => {
  e.preventDefault();
  loadMatches();
});
document.getElementById('next').addEventListener('click', e => {
  e.preventDefault();
  loadMatches();
});

window.onload = () => loadMatches();
