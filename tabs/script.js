(function() {
    let afficherOnglet = function(a, animations) {
        if(animations === undefined){
            animations = true;
        }
        let li = a.parentNode;
        let div = a.parentNode.parentNode.parentNode;
    
        if(li.classList.contains('active')){
            return false;
        }
    
        div.querySelector('.tabs .active').classList.remove('active');
        li.classList.add('active');
    
        // div.querySelector('.tab-content.active').classList.remove('active');
        // div.querySelector(a.getAttribute('href')).classList.add('active');

        let activeTab = div.querySelector('.tab-content.active');
        let aAfficher = div.querySelector(a.getAttribute('href'));

        if(animations){
            activeTab.classList.add('fade');
            activeTab.classList.remove('in');
            var transitionend = function () {
                this.classList.remove('fade');
                this.classList.remove('active');
                aAfficher.classList.add('active');
                aAfficher.classList.add('fade');
                aAfficher.offsetWidth;
                aAfficher.classList.add('in');
                activeTab.removeEventListener('transitionend', transitionend);
                activeTab.removeEventListener('webkitTransitionEnd', transitionend);
                activeTab.removeEventListener('oTransitionEnd', transitionend);
            }
            activeTab.addEventListener('transitionend', transitionend);
            activeTab.addEventListener('webkitTransitionEnd', transitionend);
            activeTab.addEventListener('oTransitionEnd', transitionend);
        }else{
            aAfficher.classList.add('active');
            activeTab.classList.remove('active');
        }
    }
    
    let tabs = document.querySelectorAll('.tabs a');
    for (let i = 0; i < tabs.length; i++){
        tabs[i].addEventListener('click', function (e) {
            afficherOnglet(this);
        });
    }

    let hashChange = function (e) {
        let hash = window.location.hash;
        let a = document.querySelector('a[href="' + hash + '"]');
        if(a !== null && !a.classList.contains('active')){
            afficherOnglet(a, e !== undefined);
        }
    }

    window.addEventListener('hashchange', hashChange);
    hashChange();

})()