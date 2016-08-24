DTS_APP.controller('Scr_Prueba_Controller',function($scope){

$scope.init = function(){
		
	$scope.Name = "sdfsf";
		$scope.Value = "15";
		
		$scope.Array_Objs = [
		{
		"Name":"Ruta A",
		"Value":50,
		//click=(Show_Detail_VisitPoint:true;
		},
		{
	    "Name":"Ruta B",
	    "Value":25
		},
		{
		"Name":"Ruta C",
		"Value":63
		},
		{
		"Name":"Ruta D",
		"Value":100
		}
		];
	
		$scope.Generate_Charts();
		
	 google.charts.load("current", {packages:["corechart" , "bar"]}); 
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Rutas', 'Numero de puntos de visita'],
          ['Ruta A',     12],
          ['Ruta B',      20],
          ['Ruta C',  32],
          ['Ruta D', 5]
        ]);

        var options= {
          title: 'Numero de puntos de visita '+69,
          is3D: true,
        };
        var data1 = google.visualization.arrayToDataTable([
          ['Tipo', 'Numero'],
          ['Problema con la Mercaderia', 12],
          ['Problema con la Ubicación', 5],
          ['Problema con el Vehiculo', 10],
          ['Problema con el Encargado', 8],
          ['Retraso', 5],
          ['No visito', 10],
          ['Otros', 0]
        ]);

        var options1= {
          title: 'Numero de Incidentes '+50,
          is3D: true,
        };
        
var data2= google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses', 'Profit'],
          ['2014', 1000, 400, 200],
          ['2015', 1170, 460, 250],
          ['2016', 660, 1120, 300],
          ['2017', 1030, 540, 350]
        ]);

        var options2  = {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          }
        };
         var data3 = google.visualization.arrayToDataTable([
        ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', { role: 'annotation' } ],
        ['2010', 10, 24, 20, ''],
        ['2020', 16, 22, 23, ''],
        ['2030', 30, 12, 13, '']
      ]);

      var options3 = {
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
      };
        
        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
		var chart1 = new google.visualization.PieChart(document.getElementById('Incidents_3d'));
        chart1.draw(data1, options1);
        var chart2 = new google.charts.Bar(document.getElementById('columnchart_material'));
		chart2.draw(data2, options2);
        var chart3 = new google.charts.Bar(document.getElementById('columnchart_material1'));
		chart3.draw(data3, options3);
      }
		
};

$scope.Generate_Charts = function(){
     
     $(".knob").knob({
      /*change : function (value) {
       //console.log("change : " + value);
       },
       release : function (value) {
       console.log("release : " + value);
       },
       cancel : function () {
       console.log("cancel : " + this.value);
       },*/
      draw: function () {

        // "tron" case
        if (this.$.data('skin') === 'tron') {

          var a = this.angle(this.cv)  // Angle
              , sa = this.startAngle          // Previous start angle
              , sat = this.startAngle         // Start angle
              , ea                            // Previous end angle
              , eat = sat + a                 // End angle
              , r = true;

          this.g.lineWidth = this.lineWidth;

          this.o.cursor
          && (sat = eat - 0.3)
          && (eat = eat + 0.3);

          if (this.o.displayPrevious) {
            ea = this.startAngle + this.angle(this.value);
            this.o.cursor
            && (sa = ea - 0.3)
            && (ea = ea + 0.3);
            this.g.beginPath();
            this.g.strokeStyle = this.previousColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
            this.g.stroke();
          }

          this.g.beginPath();
          this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
          this.g.stroke();

          this.g.lineWidth = 2;
          this.g.beginPath();
          this.g.strokeStyle = this.o.fgColor;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
          this.g.stroke();

          return false;
        }
      }
    });
     
		
	};
});