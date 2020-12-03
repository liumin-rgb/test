const cache={
 clearCookie() {
    var keys = document.cookie.split(';');
    if (keys) {
        for (var i = keys.length; i--;) {
            var a = keys[i].split('=')[0];
            console.log(a);
            this.DelCookie(a, keys[i].replace(a + '=', ''));
        }
    }
},
GetCookie(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return decodeURIComponent(document.cookie.substring(offset, endstr));
},


DelCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = value;
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() + "; path=/";
}
}
