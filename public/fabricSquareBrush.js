;(function(global){

  var fabric = global.fabric;

  // dependancy not met
  if (!fabric) {
    return;
  }

  var getRandomInt = fabric.util.getRandomInt;

  fabric.SquareBrush = fabric.util.createClass(fabric.BaseBrush, {

    /**
     * Width of the brush
     * @type {Number}
     */
    width: 10,

    /**
     * Constructor
     * @param {fabric.Canvas} canvas
     * @return {fabric.RectBrush} Instance of a circle brush
     */
    initialize: function(canvas){
      this.canvas = canvas;
      this.points = [];
    },

    /**
     * Invoked on mouse down
     * @param {Object} pointer
     */
    onMouseDown: function(){
      this.points.length = 0;
      this.canvas.clearContext(this.canvas.contextTop);
    },

    /**
     * Invoked on mouse move
     * @param {Object} pointer
     */
    onMouseMove: function(pointer){
      var point = this.addPoint(pointer),
          ctx = this.canvas.contextTop;

      ctx.fillStyle = point.fill;
      ctx.fillRect(point.x - point.width/2, point.y - point.height/2, point.width, point.height);
    },

    /**
     * Invoked on mouse up
     */
    onMouseUp: function(){
      var originalRenderOnAddition = this.canvas.renderOnAddition;
      this.canvas.renderOnAddition = false;

      for (var i = 0, len = this.points.length; i < len; i++) {
        var point = this.points[i];
        this.canvas.add(new fabric.Rect({
          width: point.width,
          height: point.height,
          top: point.y,
          left: point.x,
          fill: point.fill
        }));
      }

      this.canvas.clearContext(this.canvas.contextTop);
      this.canvas.renderOnAddition = originalRenderOnAddition;
      this.canvas.renderAll();
    },

    addPoint: function(pointer) {
      var pointerPoint = new fabric.Point(pointer.x, pointer.y),
          width = getRandomInt(0, this.width),
          color = new fabric.Color(this.color)
                    .setAlpha(fabric.util.getRandomInt(0, 100) / 100)
                    .toRgba();

      pointerPoint.width = pointerPoint.height = width;
      pointerPoint.fill = color;

      this.points.push(pointerPoint);
      return pointerPoint;
    }
  });
    
})(this);