        var map;
      var data = {
        sender: null,
        timestamp: null,
        lat: null,
        lng: null
      };
       var mapOptions = {
          center: new google.maps.LatLng(10  ,0),
          zoom: 3
      };        
      var arrEmotions = ['Happy','Thankful','Proud','Joy','Admiring', 'Humble', 'Gracious', 'Grateful','Blissful','Optimistic','Thrilled','Wonderful','Motivated','Exhilarated','Loved','Youthful', 'Inspired', 'Hopeful','Motivated', 'Honored','Privileged', 'Good','Comfortable','Blessed','Uplifted', 'Smiling', 'Supported'];
       function initMap() {
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
         map.addListener('click', function(e) {
              console.log('click');
              data.lat = e.latLng.lat();
              data.lng = e.latLng.lng();
              addToFirebase(data);              
              var marker = new google.maps.Marker({
                      position: e.latLng, 
                      map: map
                  });           
            $('#modGetEmotion').modal('show');
            });
       }
            function resetPage(){
                reSortEmotion();   
                $('#txtMyEmotion').val('');
                initMap();           
            }
            function reSortEmotion(){
                var arrEmotionRank = [];
                for (var i = 0; i < arrEmotions.length; i++) {
                  var objEmotionRank = {emotion: null, rank:null};
                  var lgRank = Math.random();
                  objEmotionRank.emotion = arrEmotions[i];
                  objEmotionRank.rank = lgRank;
                  arrEmotionRank.push(objEmotionRank);
                }
                arrEmotionRank.sort(compareEmotionRank);
                for (var i = 0, len = 7; i < len; i++) {
                    var strButtonID = i+1;
                    $('#btnEmotion'+strButtonID).html(arrEmotionRank[i].emotion);
                }
            }
            function compareEmotionRank(a, b) {
              // Use toUpperCase() to ignore character casing
              const genreA = a.rank;
              const genreB = b.rank;

              var comparison = 0;
              if (genreA > genreB) {
                comparison = 1;
              } else if (genreA < genreB) {
                comparison = -1;
              }
              return comparison;
            }  
            $('#modGetEmotion').on('hidden.bs.modal', function (e) {
              resetPage();
            })
            $('#btnCloseModal').on('click', function (e) {
              $('#modGetEmotion').modal('hide');
             $('#modConfirmation').modal('show');  
             startCounter();
             setTimeout(function(){ $('#modConfirmation').modal('hide'); }, 5000);            
            })

            function startCounter(){
              var counter = 5;
              id = setInterval(function() {
                  console.log(counter);
                  counter--;
                  if(counter < 0) {
                      clearInterval(id);
                  } else {
                      $('#spCounter').html(counter.toString());
                  }
              }, 1000);
            }
            resetPage();

