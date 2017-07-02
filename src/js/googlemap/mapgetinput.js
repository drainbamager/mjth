var map;
var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
};
var arrEmotions = ['Happy', 'Thankful', 'Proud', 'Joy', 'Admiring', 'Humble', 'Gracious', 'Grateful', 'Blissful', 'Optimistic', 'Thrilled', 'Wonderful', 'Motivated', 'Exhilarated', 'Loved', 'Youthful', 'Inspired', 'Hopeful', 'Motivated', 'Honored', 'Privileged', 'Good', 'Comfortable', 'Blessed', 'Uplifted', 'Smiling', 'Supported'];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), { center: new google.maps.LatLng(10, 0), zoom: 2 });
    map.addListener('click', function (e) {
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
function setupPage() {
    reSortEmotion();
    $('#txtMyEmotion').val('');
    initMap();
}
function reSortEmotion() {
    var arrEmotionRank = [];
    for (var i = 0; i < arrEmotions.length; i++) {
        var objEmotionRank = { emotion: null, rank: null };
        var lgRank = Math.random();
        objEmotionRank.emotion = arrEmotions[i];
        objEmotionRank.rank = lgRank;
        arrEmotionRank.push(objEmotionRank);
    }
    arrEmotionRank.sort(compareEmotionRank);
    for (var i = 0, len = 7; i < len; i++) {
        var strButtonID = i + 1;
        $('#btnEmotion' + strButtonID).html(arrEmotionRank[i].emotion);
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
    setupPage();
})
$('#btnCloseModal').on('click', function (e) {
    $('#modGetEmotion').modal('hide');
    $('#modConfirmation').modal('show');
    var strEmotion = $('#txtMyEmotion').val();
    var strEmotionList = $('#txtEmotions').val();
    strEmotionList  = strEmotionList + ' ' + strEmotion;
    $('#txtEmotions').val('');
    $('#txtMyEmotion').val('');
    strEmotionList = $.trim(strEmotionList);
    if (strEmotionList.length > 0){
        addEmotionToFirebase({timestamp:'',emotions:strEmotionList})
    }
    startCounter();
    setTimeout(function () { $('#modConfirmation').modal('hide'); }, 5000);
});


$('.MJTHEmotion').on('click', function (e) {
    var strEmotion = $(this).text();
    var strEmotionList = $('#txtEmotions').val();
    if ($(this).hasClass('active').toString()=='true'){//If going from active to inactive
        strEmotionList = strEmotionList.replace(strEmotion, '');
    }
    else{//If going from inactive to active
        strEmotionList = strEmotionList + ' ' + strEmotion;
    }
    $('#txtEmotions').val(strEmotionList);
});

function startCounter() {
    var counter = 5;
    id = setInterval(function () {
        counter--;
        if (counter < 0) {
            clearInterval(id);
        } else {
            $('#spCounter').html(counter.toString());
        }
    }, 1000);
}
setupPage();