var MVC = {};

MVC.model = function () {
    this.draw = function () {
        return 'works!';
    }
}

MVC.view = function () {

}

MVC.controller = function () {
    canvas = document.getElementById('gc');
    canvasContext = canvas.getContext('2d');

    model = new MVC.model();

    this.draw = function () {
        canvasContext.fillText(model.draw(), 100, 100, 100);
    }
}

window.onload = function () {
    controller = new MVC.controller();
    controller.draw();
}
