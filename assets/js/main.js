(async () => {
    const {data} = await axios.get("https://api.spiget.org/v2/authors/1026558/resources?size=100&sort=-downloads");

    for (const resource of data) {
        let name = resource.name;
        const description = resource.tag;
        const downloads = format(resource.downloads);
        const id = resource.id;

        if (!resource.icon.url) continue;

        if (name.length > 25) {
            name = name.substring(0, 25) + "...";
        }

        const html = `
        <div class="card" href="https://spigotmc.org/resources/${id}">
            <p class="downloads">${downloads} <i class="fa-solid fa-download"></i> </p>
            <img src="https://icons.lorenzo0111.me/${id}.png" alt="${name}" draggable="false">
            <h2>${name}</h2>
            <p>${description}</p>
        </div>
        `;

        $("#resources").append(html);

    }

    const response = await fetch("/assets/json/teams.json");
    const teams = await response.json();

    for (const team of teams) {
        const html = `
        <div class="card" href="${team.link}">
            <img style="padding-top: 15px;" width="105" src="assets/images/${team.image}" alt="${team.name}" draggable="false">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
        </div>
        `;

        $("#teams").append(html);
    }

    $("div[href]").click(function() {
        window.location = $(this).attr("href");
    });
})();

const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
];

function format(num) {
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(2).replace(rx, "$1") + item.symbol : "0";
}