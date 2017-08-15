



document.getElementById('button').onclick=function () {

  alert('sjji');
var w;


    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("demo_workers.js");
        }
        w.onmessage = function(event) {
            alert(event.data);
        };
    } else {
        alert("Your browser doesn't support Web Workers!");
    }




};




/*var w;

function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("demo_workers.js");
        }
        w.onmessage = function(event) {
            alert(event.data);
        };
    } else {
        alert("Your browser doesn't support Web Workers!");
    }
}

function stopWorker() 
{ 
    w.terminate();
    w = undefined;
}*/




