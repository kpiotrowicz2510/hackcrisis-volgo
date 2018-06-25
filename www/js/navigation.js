let reloading = false;
(function () {

    let anchors = document.querySelectorAll("a");
    for (var i = 0; i < anchors.length; i++) {

        anchors[i].onclick = function () {

            if (this.dataset.function != undefined) {

                this.dataset.function();
                return false;
            }

            if (reloading)
                return false;

            reloading = true;
            let section = this.dataset.section;
            let direction = this.dataset.direction;

            let appElements = document.querySelectorAll('.app');
            for (let i = 0; i < appElements.length; i++)
                appElements[i].style.zIndex = 0;

            let element = document.querySelector("." + section);
            element.style.top = '0px';

            if (direction != undefined && direction == 'right')
                element.style.left = '-100vw';
            else
                element.style.left = '100vw';

            element.style.display = 'block';
            element.style.zIndex = 1;

            let pos = 100;
            let time = 600; // ms
            let intervalTime = 10; //ms
            let id = setInterval(frame, intervalTime);
            function frame() {
                if (pos <= 0.0) {
                    element.style.left = '0';
                    clearInterval(id);
                    reloading = false;
                } else {
                    pos -= (intervalTime * 100) / time;

                    if (direction != undefined && direction == 'right')
                        element.style.left = '-' + pos + 'vw';
                    else
                        element.style.left = pos + 'vw';
                 }
            }
            
            return false;
        }

    }


})();