$(document).ready(function () {
    $('#search').keyup(function () {
        searchPara($(this).val());
    })
})

function searchPara(searchText) {
    if (searchText) {
        let content = $('.para').text();
        let searchExp = new RegExp(searchText, 'ig');
        let matches = content.match(searchExp);
        if (matches) {
            $('.para').html(content.replace(searchExp, function (match) {
                return "<span class='highlight'>" + match + "</span>"
            }));
        }
    }
    else {
        $('.highlight').removeClass('highlight');
    }
}