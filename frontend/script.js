// Track played matches to prevent duplicates
let playedMatches = []
// Reset all match statistics and clear match history
const reset = () => {
    for (let club of clubs) {
        club.wins = 0
        club.draws = 0
        club.losses = 0
    }
    playedMatches = []
    printClubs(clubs)
}
// Update the match dropdowns with current club list
const updateMatchDropdowns = () => {
    const team1Select = document.getElementById('match__team1')
    const team2Select = document.getElementById('match__team2')
    team1Select.innerHTML = '<option value="">-- Team 1 --</option>'
    team2Select.innerHTML = '<option value="">-- Team 2 --</option>'
    clubs.forEach(club => {
        team1Select.innerHTML += `<option value="${club.name}">${club.name}</option>`
        team2Select.innerHTML += `<option value="${club.name}">${club.name}</option>`
    })
}
// Record a head-to-head match result
const recordMatch = () => {
    const team1Name = document.getElementById('match__team1').value
    const team2Name = document.getElementById('match__team2').value
    const result = document.getElementById('match__result').value
    if (!team1Name || !team2Name) {
        alert('Please select both teams')
        return
    }
    if (team1Name === team2Name) {
        alert('A team cannot play against itself')
        return
    }
    // Check if these teams have already played
    const matchKey = [team1Name, team2Name].sort().join(' vs ')
    if (playedMatches.includes(matchKey)) {
        alert('These teams have already played each other')
        return
    }
    const team1 = clubs.find(c => c.name === team1Name)
    const team2 = clubs.find(c => c.name === team2Name)
    if (result === 'W') {
        team1.wins++
        team2.losses++
    } else if (result === 'D') {
        team1.draws++
        team2.draws++
    } else if (result === 'L') {
        team1.losses++
        team2.wins++
    }
    // Mark this match as played
    playedMatches.push(matchKey)
    // Reset dropdowns
    document.getElementById('match__team1').value = ''
    document.getElementById('match__team2').value = ''
    document.getElementById('match__result').value = 'W'
    printClubs(clubs)
}
// Render the table HTML
const printClubs = (clubs) => {
    // Sort by points first for correct position numbering
    clubs.sort((a, b) => (b.wins * 3 + b.draws) - (a.wins * 3 + a.draws))
    let element = ""
    for (let i = 0; i < clubs.length; i++) {
        element +=
        `<tr>
        <td class="table__ClubColumn">
          <span class="table__PosNumber">${Number([i]) + 1}</span>
          <img class="table__badges" src="${clubs[i].badge}" alt="${clubs[i].name} badge">
          <span class="table__NameColumn">${clubs[i].name}</span>
        </td>
        <td class="table__PGColumn">${clubs[i].wins + clubs[i].draws + clubs[i].losses}</td>
        <td class="table__WColumn">${clubs[i].wins}</td>
        <td class="table__DColumn">${clubs[i].draws}</td>
        <td class="table__LColumn">${clubs[i].losses}</td>
        <td class="table__PointsColumn">${clubs[i].wins * 3 + clubs[i].draws}</td>
        </tr>`
    }
    document.getElementById("clubsTable").innerHTML = element
    updateMatchDropdowns()
}
// Add a new club to the table
const addClub = () => {
    let clubName = capitalizeFirstLetter(document.getElementById('club__name').value)
    let clubBadge = document.getElementById('club__badge').value
    if (clubName === '') {
        console.error('Club name is empty')
    } else if (clubBadge === '') {
        console.error('Badge URL is empty')
    } else {
        for (let i = 0; i < clubs.length; i++) {
            if (clubs[i].name === clubName) {
                clearInput()
                return console.error('This club is already on the table')
            }
        }
        let newClub = { name: clubName, wins: 0, draws: 0, losses: 0, badge: clubBadge }
        clubs.push(newClub)
        printClubs(clubs)
    }
    clearInput()
}
// Remove a club from the table
const removeClub = () => {
    let clubName = capitalizeFirstLetter(document.getElementById('club__name').value)
    if (clubName === '') {
        console.error('Club name is empty')
    } else {
        for (let i = 0; i < clubs.length; i++) {
            if (clubs[i].name === clubName) {
                clearInput()
                clubs.splice(i, 1)
                // Remove any matches involving this club
                playedMatches = playedMatches.filter(m => !m.includes(clubName))
                return printClubs(clubs)
            }
        }
        console.error(`There's not a club called ${clubName}`)
    }
}
// Clear the input fields
const clearInput = () => {
    document.getElementById('club__name').value = ''
    document.getElementById('club__badge').value = ''
}
// Capitalize first letter of each word
const capitalizeFirstLetter = (string) => {
    let arr = string.split(' ')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(' ')
}
// Initial club data with short names
let clubs = [
    { name: "Liverpool", wins: 4, draws: 2, losses: 0, badge: "https://resources.premierleague.com/premierleague/badges/25/t14.png" },
    { name: "ManCity", wins: 4, draws: 1, losses: 1, badge: "https://resources.premierleague.com/premierleague/badges/25/t43.png" },
    { name: "Chelsea", wins: 4, draws: 1, losses: 1, badge: "https://resources.premierleague.com/premierleague/badges/25/t8.png" },
    { name: "ManUtd", wins: 4, draws: 1, losses: 1, badge: "https://resources.premierleague.com/premierleague/badges/25/t1.png" },
    { name: "Everton", wins: 4, draws: 1, losses: 1, badge: "https://resources.premierleague.com/premierleague/badges/25/t11.png" },
    { name: "Brighton", wins: 4, draws: 1, losses: 1, badge: "https://resources.premierleague.com/premierleague/badges/25/t36.png" },
    { name: "West Ham", wins: 3, draws: 2, losses: 1, badge: "https://resources.premierleague.com/premierleague/badges/25/t21.png" },
    { name: "Aston Villa", wins: 3, draws: 1, losses: 2, badge: "https://resources.premierleague.com/premierleague/badges/25/t7.png" },
    { name: "Brentford", wins: 2, draws: 3, losses: 1, badge: "https://resources.premierleague.com/premierleague/badges/25/t94.png" },
    { name: "Arsenal", wins: 3, draws: 0, losses: 3, badge: "https://resources.premierleague.com/premierleague/badges/25/t3.png" },
    { name: "Tottenham", wins: 3, draws: 0, losses: 3, badge: "https://resources.premierleague.com/premierleague/badges/25/t6.png" },
    { name: "Watford", wins: 2, draws: 1, losses: 3, badge: "https://resources.premierleague.com/premierleague/badges/25/t57.png" },
    { name: "Leicester", wins: 2, draws: 1, losses: 3, badge: "https://resources.premierleague.com/premierleague/badges/25/t13.png" },
    { name: "Wolves", wins: 2, draws: 0, losses: 4, badge: "https://resources.premierleague.com/premierleague/badges/25/t39.png" },
    { name: "Crystal Palace", wins: 1, draws: 3, losses: 2, badge: "https://resources.premierleague.com/premierleague/badges/25/t31.png" },
    { name: "Southampton", wins: 0, draws: 4, losses: 2, badge: "https://resources.premierleague.com/premierleague/badges/25/t20.png" },
    { name: "Newcastle", wins: 0, draws: 3, losses: 3, badge: "https://resources.premierleague.com/premierleague/badges/25/t4.png" },
    { name: "Leeds", wins: 0, draws: 3, losses: 3, badge: "https://resources.premierleague.com/premierleague/badges/25/t2.png" },
    { name: "Burnley", wins: 0, draws: 2, losses: 4, badge: "https://resources.premierleague.com/premierleague/badges/25/t90.png" },
    { name: "Norwich", wins: 0, draws: 0, losses: 6, badge: "https://resources.premierleague.com/premierleague/badges/25/t45.png" },
]
// Initialize the table on page load
printClubs(clubs)
