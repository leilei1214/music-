song = window.localStorage.getItem('song');
singer = window.localStorage.getItem('singer');
song_name = window.localStorage.getItem('song_name');
web = window.localStorage.getItem('web');
end2 = window.localStorage.getItem('end2');

document.getElementById("aside").innerHTML =end2;

let content = " "
 content += (
    `<div>${song_name}</div>
        <div class="embed-container">
                <iframe src="${web}" width="853" height="480"   frameborder="0" allow="autoplay; encrypted-media" allowfullscreen ></iframe>

        </div>

    </div>
    `
    )
console.log(content)
document.getElementById("message").innerHTML = content;
window.localStorage.clear()