var queEmotions = FixedQueue(250, []);
var fill = d3.scale.category20b();

var w = window.innerWidth,
        h = window.innerHeight;

var max,
        fontSize;

var layout = d3.layout.cloud()
        .timeInterval(Infinity)
        .size([w, h])
        .fontSize(function(d) {
            return fontSize(+d.value);
        })
        .text(function(d) {
            return d.emotions;
        })
        .on("end", draw);

var svg = d3.select("#vis").append("svg")
        .attr("width", w)
        .attr("height", h);

var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

function loadEmotions() {
      console.log('load emotions');
        // Reference to the clicks in Firebase.
        var tblEmotions = firebase.database().ref().child('emotions');
        tblEmotions.limitToLast(5).on("child_added", function(snapshot){
          var emotion = snapshot.val();
          addEmotionToList(emotion.emotions);
        });
      }
  function addEmotionToList(inEmotion){
          console.log(inEmotion);
          queEmotions.push({"emotions":inEmotion, "value":1});
          //$('#divEmotionList').prepend(inEmotion + '<br />');
  }
function draw(data, bounds) {
    var w = window.innerWidth,
        h = window.innerHeight;

    svg.attr("width", w).attr("height", h);

    scale = bounds ? Math.min(
            w / Math.abs(bounds[1].x - w / 2),
            w / Math.abs(bounds[0].x - w / 2),
            h / Math.abs(bounds[1].y - h / 2),
            h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

    var text = vis.selectAll("text")
            .data(data, function(d) {
                return d.text.toLowerCase();
            });
    text.transition()
            .duration(1000)
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
                return d.size + "px";
            });
    text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .style("opacity", 1e-6)
            .transition()
            .duration(1000)
            .style("opacity", 1);
    text.style("font-family", function(d) {
        return d.font;
    })
            .style("fill", function(d) {
                return fill(d.text.toLowerCase());
            })
            .text(function(d) {
                return d.text;
            });

    vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
}
function update() {
    console.log('update called');
    layout.font('impact').spiral('archimedean');
    fontSize = d3.scale['sqrt']().range([10, 100]);
    if (queEmotions.length){
        //fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
    }
    console.log(queEmotions.length);
    layout.stop().words(queEmotions).start();
}
function setupPage() {
    loadEmotions();
    update();    
}  
  setupPage();


