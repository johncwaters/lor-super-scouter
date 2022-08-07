
//as soon as page loads grab top 10 players on the leadboard and display

//API CALL
$.getJSON("load/topplayers", function () {
    console.log("success");
})
    .done(function (data) {
        console.log(data);
        //UPDATE LAST UPDATED BY FIELD
        var today = new Date();
        var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + ' ' + today.toLocaleTimeString();
        $("#last-updated")
            .append("<p>Last updated: " + date + "</p>")
        //DISPLAY DATA
        let i = 0;

        //dynamically add all players to the html page
        for (i in data) {


            //MATCH WIN PERCENT COLOR
            //TODO update this so it looks at proper match stats
            if (data[i].win_percent >= 69) {
                var match_win_percent = `<div class="stat-desc text-success">(` + data[i].win_percent + `% WR)</div>`
            } else if (data[i].win_percent <= 39) {
                var match_win_percent = `<div class="stat-desc text-error">(` + data[i].win_percent + `% WR)</div>`
            } else {
                var match_win_percent = `<div class="stat-desc text-warning">(` + data[i].win_percent + `% WR)</div>`
            }

            //GAME WIN PERCENT COLOR
            if (data[i].win_percent >= 69) {
                var game_win_percent = `<div class="stat-desc text-success">(` + data[i].win_percent + `% WR)</div>`
            } else if (data[i].win_percent <= 39) {
                var game_win_percent = `<div class="stat-desc text-error">(` + data[i].win_percent + `% WR)</div>`
            } else {
                var game_win_percent = `<div class="stat-desc text-warning">(` + data[i].win_percent + `% WR)</div>`
            }

            //leaderboard cards for top 10 players
            $("#load-leadboard")
                .append(`
        <div class="card w-11/12 bg-neutral text-neutral-content shadow-xl m-auto">
            <div class="card-body pb-1 p-3.5">
                <h2 class="card-title">`+ data[i].position + `. ` + data[i].owner_name + `</h2>
                <div tabindex="0" class="collapse">
                    <!--STATS-->
                    <div class="stats shadow">
                        <!-- Match wins -->
                        <div class="stat place-items-center p-2">
                            <div class="stat-title">Matches</div>
                            <div class="stat-value text-primary text-2xl">`+ data[i].wins + ` / ` + (data[i].total_games - data[i].wins) + `</div>
                            <div class="stat-desc">`+ (data[i].total_games) + ` total Bo3's </div>
                            `+ match_win_percent + `
                        </div>
                        <!-- Win / Lose Games -->
                        <div class="stat place-items-center p-2">
                            <div class="stat-title">Games</div>
                            <div class="stat-value text-secondary text-2xl">`+ data[i].wins + ` / ` + (data[i].total_games - data[i].wins) + `</div>
                            <div class="stat-desc">`+ (data[i].total_games) + ` total games </div>
                            `+ game_win_percent + `
                        </div>
                    </div>
                    <!-- Down arrow to expand -->
                    <div class="container mx-auto text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 24" fill="none"
                            stroke="#919191" stroke-width="2" style="margin:auto" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                    <!-- DROPDOWN STATS -->
                    <div class="collapse-content pl-0 pr-0 pt-2">
                        <div class="stats shadow w-full">
                            <!-- Deck 1 stats -->
                            <div class="stat place-items-center p-2">
                                <div class="stat-title">Deck 1</div>
                                <div class="stat-value text-primary text-2xl">
                                    <div class="avatar">
                                        <div class="w-8 rounded-full">
                                            <img src="../imgs/regions/icon-bandlecity.png" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class="w-8 rounded-full">
                                            <img src="../imgs/regions/icon-ionia.png" />
                                        </div>
                                    </div>
                                </div>
                                <div class="stat-desc">5 / 6 WL</div>
                                <div class="stat-desc">(100% WR)</div>
                            </div>
                            <!-- Deck 2 stats -->
                            <div class="stat place-items-center p-2">
                                <div class="stat-title">Deck 2</div>
                                <div class="stat-value text-primary text-2xl">
                                    <div class="avatar">
                                        <div class="w-8 rounded-full">
                                            <img src="../imgs/regions/icon-demacia.png" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class="w-8 rounded-full">
                                            <img src="../imgs/regions/icon-freljord.png" />
                                        </div>
                                    </div>
                                </div>
                                <div class="stat-desc">5 / 6 WL</div>
                                <div class="stat-desc">(100% WR)</div>
                            </div>
                            <!-- Deck 3 stats -->
                            <div class="stat place-items-center p-2">
                                <div class="stat-title">Deck 3</div>
                                <div class="stat-value text-primary text-2xl">
                                    <div class="avatar">
                                        <div class="w-8 rounded-full">
                                            <img src="../imgs/regions/icon-shadowisles.png" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class="w-8 rounded-full">
                                            <img src="../imgs/regions/icon-shurima.png" />
                                        </div>
                                    </div>
                                </div>
                                <div class="stat-desc">5 / 6 WL</div>
                                <div class="stat-desc">(100% WR)</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>    
        `);
        }

        //add final card to the bottom of the leaderboard
        $("#load-leadboard")
            .append(`
    <div class="card bg-neutral text-neutral-content shadow-xl m-auto">
        <div class="card-body p-3.5">
            <button onclick="window.location.href='/leaderboard';" class="btn btn-outline">View entire leaderboard</button>
        </div>
    </div>        
`);


    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
        $("#load-leadboard")
            .append(`
    <div class="card bg-neutral text-neutral-content shadow-xl m-auto">
        <div class="card-body text-center p-3.5">
            <p>Unable to load.</p>
            <p>Please check your internet connection then try again.</p>
        </div>
    </div>        
`);
    });




