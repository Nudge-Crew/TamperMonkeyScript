// ==UserScript==
// @name         Emotion API
// @namespace    https://fhict.instructure.com/*
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        https://fhict.test.instructure.com/courses/*/assignments/*/submissions/*
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
        function myfunction(courseId, assignmentId, submissionId){
            var myObject = new Object();
            myObject.assignment_id = assignmentId;
            myObject.submission_id = submissionId;
            myObject.course_id = courseId;
            $.ajaxSetup({
                headers:{
                    'X-Canvas-Authorization': localStorage.getItem("Canvas")
                }
            });

            $.ajax({
                  url: "https://europe-west1-nudge-crew.cloudfunctions.net/emotion",
                  type: 'get',
                  data: {
                   assignment_id: myObject.assignment_id,
                   submission_id: myObject.submission_id,
                   course_id: myObject.course_id
                  },
                  success: function(res){
                    alert(JSON.stringify(res))
                  },
                 });
        };
        var url = document.URL;
        var courseId = url.split('courses/').pop().split('/')[0]
        var assignmentId = url.split('assignments/').pop().split('/')[0]
        var submissionId = url.split('submissions/').pop().split('/')[0]
        console.log(courseId)
        console.log(assignmentId)
        console.log(submissionId)

        var element = $(this).find('.ic-Action-header').find('.ic-Action-header__Secondary')
        element.append("<button class='Button Button--primary' id='emotion_btn'>Krijg Sentimentele analyse</button>");

        element.find("#emotion_btn").click(function(){
                myfunction(courseId,assignmentId, submissionId)
            });
    });
};
addJQuery(main);
