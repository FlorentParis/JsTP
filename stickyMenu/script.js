(function(){

    let scrollY = function () {
        let supportPageOffset = window.pageOffset !== undefined;
        let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    var makeSticky = function (element){
        let rect = element.getBoundingClientRect();
        let offset = parseInt(element.getAttribute('data-offset') || 0, 10);
        if(element.getAttribute('data-constraint')){
            var constraint = document.querySelector(element.getAttribute('data-constraint'));
        }else{
            var constraint = document.body;
        }
        console.log(constraint);
        let constraintRect = constraint.getBoundingClientRect();
        let constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height; 
        let top = rect.top + scrollY();
        let width = rect.width;
        let fake = document.createElement('div');
        fake.style.width = rect.width + "px";
        fake.style.height = rect.height + "px";
        let onScroll = function () {
            var hasScrollClass = element.classList.contains('fixed');
            if(scrollY() > constraintBottom && element.style.position != "absolute"){
                element.style.position = "absolute";
                element.style.bottom = "0";
                element.style.top = "auto";
            }else if(scrollY() > top - offset && scrollY() < constraintBottom && element.style.position != "fixed"){
                element.classList.add('fixed');
                element.style.position = "fixed";
                element.style.top = offset + "px";
                element.style.bottom = "auto";
                element.style.width = width + "px";
                element.parentNode.insertBefore(fake, element);
            }else if(scrollY() < top - offset && element.style.position != "static"){
                element.classList.remove('fixed');
                element.style.position = "static";
                if(element.parentNode.contains(fake)){
                    element.parentNode.removeChild(fake);
                }
            }
        }

        let onResize = function () {
            element.style.width = "auto";
            element.classList.remove('fixed');
            element.style.position = "static";
            fake.style.display = "none";
            react = element.getBoundingClientRect();
            constraintRect = constraint.getBoundingClientRect();
            constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height; 
            top = rect.top + scrollY();
            fake.style.width = rect.width + "px";
            fake.style.height = rect.height + "px";
            fake.style.display = "block";
            onScroll();
        }

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);
    }

    var elements = document.querySelectorAll(`[data-sticky]`);
    for (var i = 0; i < elements.length; i++){
        makeSticky(elements[i]);
    }

})()