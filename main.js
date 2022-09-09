const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const title = $('.title h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.disk');
const toggle = $('.toggle');
const container = $('.container');
const progress = $('.progress');
const backward = $('.backward');
const forward = $('.forward');
const repeat = $('.repeat');
const shuffle = $('.shuffle');
const playlist = $('.playlist');
const option = $('.option-i');


const app = {
    _isplaying : false,
    _isrepeat : false,
    _isshuffle : false,
    currentIndex : 0,

    songs:[
        {
            name:"THICHTHICH",
            singer: 'Phuong Ly',
            path: './audio/Thichthich-PhuongLy-7647106.mp3',
            img: './img/loi-bai-hat-thichthich-phuong-ly-lyrics-8d1839df.jpg'
        },
        {
            name:"Shay Nắnggg",
            singer: 'Amee',
            path: './audio/Shay-Nanggg-AMEE-Obito.mp3',
            img: './img/photo-1-16545836604251981328407.jpg'
        },
        {
            name:"Mặt trời của em",
            singer: 'Phuong Ly',
            path: './audio/MatTroiCuaEmKynbbRemix-JustaTeePhuongLy-5290457.mp3',
            img: './img/049fd24a-5036-4199-905a-e43c2499be1d.jpg'
        },
        {
            name:"Count on me",
            singer: 'Bruno Mark',
            path: './audio/Shay-Nanggg-AMEE-Obito.mp3',
            img: './img/artworks-000141291075-uyqdpr-t500x500.jpg'
        },
        {
            name:"Có em chờ",
            singer: 'MIN',
            path: './audio/Co-Em-Cho-MIN-Mr-A.mp3',
            img: './img/f3ccdd27d2000e3f9255a7e3e2c48800_1493277779.jpg'
        },

        {
            name:"Love Story",
            singer: 'Taylor Swift',
            path: './audio/Love Story - Taylor Swift.mp3',
            img: './img/loi-bai-hat-thichthich-phuong-ly-lyrics-8d1839df.jpg'
        },
        {
            name:"Leave The Door Open",
            singer: 'Bruno Mars',
            path: './audio/Leave The Door Open - Bruno Mars_ Anders.mp3',
            img: './img/photo-1-16545836604251981328407.jpg'
        },
        {
            name:"Faded",
            singer: 'Alan Walker',
            path: './audio/Fade - Alan Walker.mp3',
            img: './img/049fd24a-5036-4199-905a-e43c2499be1d.jpg'
        },
        {
            name:"Save Your Tears",
            singer: 'The Weeknd',
            path: './audio/Save Your Tears - The Weeknd.mp3',
            img: './img/artworks-000141291075-uyqdpr-t500x500.jpg'
        },
        {
            name:"Sugar",
            singer: 'Maroon 5',
            path: './audio/Sugar - Maroon 5.mp3',
            img: './img/f3ccdd27d2000e3f9255a7e3e2c48800_1493277779.jpg'
        }
    ],
    render: function(){
        const htmls = this.songs.map((song, index) =>{
           return `
           <div class="song ${ index == this.currentIndex ? 'active' : ''}" data-index="${ index }">
                <div class="thumbnail" style="background-image: url(' ${song.img} ')"></div>
                <div class="name">
                    <h2> ${song.name}</h2>
                    <div class="artist">${song.singer}</div>
                </div>
                <div class="option"><i class="fa-solid fa-heart option-i"></i></div>
            </div>
           `
        })
        playlist.innerHTML = htmls.join('\n')
    },

    handleEvent: function(){

        const cdWidth = cd.offsetWidth;
     //phong to thu nho cd
        document.onscroll = function(){
            const scrollchance = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollchance ;
            
            cd.style.width = newWidth+ 'px';
            if(newWidth < 0){
                cd.style.width = 0;
            }

            cd.style.opacity = newWidth / cdWidth;
            

        }

    //xu ly khi bam vao nut play
    
        toggle.onclick = function(){
            if(app._isplaying){
                audio.pause();
            } else {audio.play()}
            
        }
        audio.onplay = function(){
            app._isplaying = true;
            container.classList.add('playing');
            cdThumbAnimate.play();
        }
        audio.onpause = function(){
            app._isplaying = false;
            container.classList.remove('playing');
            cdThumbAnimate.pause()
        }

        //xu ly khi tua bai hat
        audio.ontimeupdate = function(){
            const percent = audio.currentTime / audio.duration *100;
            progress.value = percent;
        }

        //xu ly khi bam tua progress
        progress.oninput = function(){
            const seekTime = progress.value * audio.duration / 100;
            audio.currentTime = seekTime;
        }

        //xu ly quay cd
        const cdThumbAnimate = cdThumb.animate(
            [
                {transform: 'rotate(360deg)'}
            ],{
                duration :10000,
                iterations : Infinity
            }
        );
        cdThumbAnimate.pause();

        //xu ly khi bam forwardSong
        forward.onclick = function() {
            if (app._isshuffle) {
                app.shuffleSong();
            }else{app.forwardSong();}
            audio.play();
            app.render();
            app.scrollToActiveSong();
        };

        //xu ly khi bam backwardSong
        backward.onclick = function() {
            app.backwardSong();
            audio.play();
            app.render();
            app.scrollToActiveSong();

        };  

        // xu ly khi bam shuffleSong
        shuffle.onclick = function() {
            app._isshuffle = !app._isshuffle;
            shuffle.classList.toggle("active", app._isshuffle);
        };
        //xu ly khi bam repeat
        repeat.onclick = function() {
            app._isrepeat = !app._isrepeat;
            repeat.classList.toggle("active", app._isrepeat);
        };

        //xu ly khi ket thuc bai hat
        audio.onended = function() {
            if (app._isrepeat) {
                audio.play();
            }else {forward.click();}

            
        };

        //xu ly quay option
        // const optionAnimate = option.animate(
        //     [
        //         {
        //             transform: 'rotate(360deg)'
        //         }
        //     ],
        //     {
        //         duration: 500,
        //         interations: 1,
        //     }
        // );
        // optionAnimate.pause();

        //xu ly khi bam vao bai hat
      playlist.onclick = function(e) {
        songNode = e.target.closest('.song:not(.active)')
        if (songNode || e.target.closest('.option')) {
            if(songNode){
                app.currentIndex = songNode.getAttribute('data-index');
                app.loadcurrentSong();
                audio.play();
                app.render();
            }
            if(e.target.closest('.option')){
                
                console.log(this);
            }
        }
      }
      


        

        // repeat.onclick = function() {
        //     app._isrepeat = !app._isrepeat;
        //     repeat.classList.toggle("active", app._isrepeat);
        //     if(!app._isrepeat==true) {
        //         audio.loop = true;
        //     }else {
        //         audio.loop = false;

        //     }

        // };

    },  


//day la 3 constructor
    forwardSong: function(){
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadcurrentSong();
    },
    backwardSong: function(){
        this.currentIndex--;
        if (this.currentIndex <0) {
            this.currentIndex = app.songs.length-1;
        }
        this.loadcurrentSong();
    },

    shuffleSong: function () {
        let newIndex;
        do {
            newIndex =Math.floor(Math.random() *app.songs.length) ;
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadcurrentSong();
    },

    repeatSong: function () {
        audio.play();
    },


    defineProperties : function(){
        Object.defineProperty(this, 'currentSong',{
           get : function(){
            return this.songs[this.currentIndex];
           }
        })
    },

    loadcurrentSong : function(){

    
        title.innerHTML = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        audio.src = this.currentSong.path;
    },

    scrollToActiveSong: function(){
        setTimeout(function(){
            $(".song.active").scrollIntoView({
                behavior : "smooth",
                block: "center"
            });
        },300)

    },

    start: function(){
        this.handleEvent();
        this.defineProperties();
        this.render();
        this.loadcurrentSong();
    },
}

app.start();
