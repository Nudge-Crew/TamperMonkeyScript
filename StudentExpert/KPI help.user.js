// ==UserScript==
// @name         KPI help
// @namespace    https://fhict.instructure.com/*
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match      https://fhict.test.instructure.com/courses/*/assignments/*
// @grant        none
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    $(document).ready(function(){
        function myfunction(outcomeId, rubricId, courseId){
            var myObject = new Object();
            myObject.outcomeId = outcomeId;
            myObject.rubricId = rubricId;
            myObject.courseId = courseId;
            console.log(outcomeId)
            $.ajaxSetup({
                headers:{
                    'X-Canvas-Authorization': localStorage.getItem("Canvas")
                }
            });

            $.post( "https://europe-west1-nudge-crew.cloudfunctions.net/requestStudentExperts",
                  JSON.stringify(myObject),
                  alert( "done" ),
                  "json" );
        };
        var outcomes;
        var elements = $(".criterion   ");
        var rubricId = $(".rubric_container").attr("id")
        var stringToCut = "rubric_"
        rubricId = rubricId.slice(stringToCut.length,rubricId.length)

        var courseLink = window.location.href;
        var pos = courseLink.indexOf("courses");
        var pos2 = courseLink.indexOf("assignments");
        var courseId = courseLink.slice(pos + 8, pos2 - 1);

        outcomes = elements.filter(function(){
            return $(this).attr("class") === "criterion   "
        });

        outcomes.each(function(){
            var element = $(this).find("td:first").find(".container").find(".description_content")
            element.append("<button class='Button Button--primary help_btn'>vraag om hulp</button>");
            stringToCut = "criterion_"
            var id = $(this).attr("id");
            id = id.slice(stringToCut.length, id.length)

            element.find(".help_btn").click(function(){
                myfunction(id,rubricId, courseId)
            })
            console.log()
        });
    });
};
addJQuery(main);
