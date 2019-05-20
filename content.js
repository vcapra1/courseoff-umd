$(".details-panel .tab-content .tab-pane .alert-warning", () => {
    let loadedCheck = () => {
        // Update the "automatic registration not available" message
        let warning = $(".details-panel .tab-content .tab-pane .alert-warning");

        if (warning.length == 0) {
            return false;
        }

        warning = warning.eq(0);

        warning.removeClass("alert-warning");
        warning.addClass("alert-info");
        warning.html("Click <a id=\"register_link\" style=\"text-decoration: underline;\">here</a> to register!");

        return true;
    };

    let interval = setInterval(() => {
        if (loadedCheck()) {
            clearInterval(interval);

            $("#register_link").on("click", () => {
                var query = "";
                $(".details-panel .tab-content .tab-pane").eq(2).find(".course-list div").each((i, e) => {
                    let course = $(e).find("strong").html().replace(/ /g, "");
                    let sections = [];
                    $(e).find("li").each((i, e) => {
                        sections[sections.length] = $(e).html();
                        query += course + "_/" + $(e).html() + "|";
                    });
                });
                let term = $(".navbar ul[data-visible=term] .dropdown a").text().trim();
                let term_year = term.match(/[0-9]{4}/);
                let term_sem = "";
                if (term.startsWith("Fall")) {
                    term_sem = "08";
                } else if (term.startsWith("Spring")) {
                    term_sem = "01";
                } else if (term.startsWith("Winter")) {
                    term_sem = "12";
                } else if (term.startsWith("Summer")) {
                    term_sem = "05";
                }
                let termid = term_year + term_sem;
                let link = "http://ntst.umd.edu/testudo/main/dropAdd?venusTermId=" + termid + "&crslist=" + query;

                chrome.runtime.sendMessage({"msg": "open_register_tab", "url": link})
            })
        }
    }, 100)
});
