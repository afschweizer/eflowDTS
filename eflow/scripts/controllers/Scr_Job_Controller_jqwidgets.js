DTS_APP.controller('Scr_Job_Controller_jqwidgets',function($scope) {
	
$scope.init = function() {
	
		To_Reload_Eflow_Config();
$scope.Select();
};	
	
	$scope.Select = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
            }
        };
		var onSuccess = function(JsonData){
		$scope.ArrayVisitPoint = JsonData;
		$scope.$apply($scope.ArrayVisitPoint);
		var ArrayJobs = [];
		for(var i=0; i<$scope.ArrayVisitPoint.length;i++){
		var obj_Job = {};
			obj_Job.IDDelivery_Location = $scope.ArrayVisitPoint[i].VisitPoint.IDDelivery_Location;
			obj_Job.Jobs = $scope.ArrayVisitPoint[i].Jobs;
			ArrayJobs.push(obj_Job);
			
			}
		
		 // prepare the data
            var data = $scope.ArrayVisitPoint;
            var source =
            {
                localdata: data,
                datatype: "array",
                datafields:
                [
                    { name: 'Manager', map:'VisitPoint>Manager'},
                    { name: 'Name', map:'VisitPoint>Name'},
                    { name: 'IDDelivery_Location', map:'VisitPoint>IDDelivery_Location'},
                    { name: 'Address', map:'VisitPoint>Address'},
                    { name: 'TelephoneNumber', map:'VisitPoint>TelephoneNumber', type: 'string'},
                    { name: 'EstimatedDate',type: 'date|medium'},
                    { name: 'EstimatedDeliveryTime',type:'number'},
                    { name: 'Start', map:'DeliveryPeriod>Start', type:'datetime'},
                    { name: 'End', map:'DeliveryPeriod>End', type:'datetime'},
                    { name: 'User'},
                    { name: 'Mail', map:'VisitPoint>Mail'},
                    { name: 'Longitude', map:'VisitPoint>Geolocation>Longitude'},
                    { name: 'Latitude', map:'VisitPoint>Geolocation>Latitude'},
                    { name: 'Sequence'},
                ],
				pagenum: 0,
                pagesize: 20,
                pager: function (pagenum, pagesize, oldpagenum) {
                    // callback called when a page or page size is changed.
                },
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failder.
                    commit(true);
                }
            };
 			var dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1; 
            // initialize jqxGrid
            $("#jqxgrid").jqxGrid(
            {
                width: 1250,
                source: dataAdapter,
                showfilterrow: true,
                filterable: true,               
                altrows: true,
				sortable: true,
                pageable: true,
                autoheight: true,
                columnsresize: true, 
                localization: getLocalization('ES'),
                selectionmode: 'multiplecellsextended',
                theme:'darkblue',
                columns: [
                    { text: 'Editar', showfilterrow: false,
                filterable: false, columntype: 'button', cellsrenderer: function () {
                     return "Editar";
                  }, buttonclick: function (row) {
                     // open the popup window when the user clicks a button.
                     editrow = row;
                     var offset = $("#jqxgrid").offset();
                     $("#popupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60 } });
                     // get the clicked row's data and initialize the input fields.
                     var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                     $("#Manager").val(dataRecord.Manager);
                     $("#Name").val(dataRecord.Name);
                     $("#IDDelivery_Location").val(dataRecord.IDDelivery_Location);
                     $("#Address").val(dataRecord.Address);
                     $("#TelephoneNumber").val(dataRecord.TelephoneNumber);
                     $("#EstimatedDate").val(dataRecord.EstimatedDate);
                     $("#EstimatedDeliveryTime").val(dataRecord.EstimatedDeliveryTime );
                     $("#Start").val( dataRecord.Start );
                     $("#End").val(dataRecord.End );
                     $("#User").val(dataRecord.User);
                     $("#Mail").val(dataRecord.Mail);
                     $("#Sequence").val(dataRecord.Sequence);
                     $("#Longitude").val(dataRecord.Longitude);
                     $("#Latitude").val(dataRecord.Latitude);
                     $scope.JS=(dataRecord.Job);
                     // show the popup window.
                     $("#popupWindow").jqxWindow('open');
                 }
                 },
                    { text: 'Gerente',  datafield: 'Manager', width: 130 },
                    { text: 'Nombre',  datafield: 'Name',width: 130 },
                    { text: 'Dirección', datafield: 'Address', width: 250 },
                    { text: 'Número De Teléfono',  datafield: 'TelephoneNumber',width: 130  },
                    { text: 'Fecha Estimada',filtertype: 'date', datafield: 'EstimatedDate',width: 130  },
                    { text: 'Tiempo Estimado De Entrega', datafield: 'EstimatedDeliveryTime',width: 80  },
                    { text: 'Ventana de entrega Inicio',  datafield: 'Start', width: 130 },
                    { text: 'Ventana de entrega finalicacion',  datafield: 'End', width: 130 },
                    { text: 'Usuario',datafield: 'User', width: 80 },
                    { text: 'Correo', datafield: 'Mail', width: 200 }
                    
                ]
            });
        
    $("#popupWindow").jqxWindow({
                width: 1250, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01           
            });
           
			 $('#events').jqxPanel({ width: 300, height: 150});

            $("#jqxgrid").on("pagechanged", function (event) {
                $("#eventslog").css('display', 'block');
                if ($("#events").find('.logged').length >= 5) {
                    $("#events").jqxPanel('clearcontent');
                }

                var args = event.args;
                var eventData = "pagechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + "</div>";
                $('#events').jqxPanel('prepend', '<div class="logged" style="margin-top: 5px;">' + eventData + '</div>');

                // get page information.
                var paginginformation = $("#jqxgrid").jqxGrid('getpaginginformation');
                $('#paginginfo').html("<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>");
            });

            $("#jqxgrid").on("pagesizechanged", function (event) {
                $("#eventslog").css('display', 'block');
                $("#events").jqxPanel('clearcontent');

                var args = event.args;
                var eventData = "pagesizechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + ", Old Page Size: " + args.oldpagesize + "</div>";
                $('#events').jqxPanel('prepend', '<div style="margin-top: 5px;">' + eventData + '</div>');

                // get page information.          
                var paginginformation = $("#jqxgrid").jqxGrid('getpaginginformation');
                $('#paginginfo').html("<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>");
            });
			
			
			// Orders Grid
            // prepare the data
            
            var dataObj = $scope.ArrayJobs;
            source =
            {
                localdata: dataObj,
                datatype: "array",
                dataFields : [
                        { name: 'id', map:'JobID'},
                        { name: 'name', map:'JobName'},
                        { name: 'type', map:'JobType'},
                        { name: 'description', map:'JobDescription'},
                        { name: 'uom', map:'UOM'},
                        { name: 'quantity', map:'Quantity'},
                        { name: 'instructions', map:'JobInstructions'}
                    ]
			};
			var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            $("#jqxgrid").on('rowselect', function (event) {
                var IDDelivery_Location = event.args.row.IDDelivery_Location;
                var records = new Array();
                var length = dataAdapter.records.length;
                for (var i = 0; i < length; i++) {
                    var record = dataAdapter.records[i];
                    if (record.VisitPoint.IDDelivery_Location == IDDelivery_Location) {
                        records[records.length] = record;
                    }
                }
                var dataSource = {
                    datafields: dataFields,
                    localdata: records
                }
                var adapter = new $.jqx.dataAdapter(dataSource);
                // update data source.
                $("#ordersGrid").jqxGrid({ source: adapter });
            });
            $("#ordersGrid").jqxGrid(
            {
                width: 850,
                height: 250,
                keyboardnavigation: false,
                columns: [
                        { text: 'id', datafield: 'id', width: 100},
                        { text: 'name', datafield: 'name', width: 100},
                        { text: 'type', datafield: 'type', width: 100},
                        { text: 'description', datafield: 'description', width: 100},
                        { text: 'uom', datafield: 'uom', width: 100},
                        { text: 'quantity', datafield: 'quantity', width: 100},
                        { text: 'instructions', datafield: 'instructions', width: 100}
                ]
            });
            $("#customersGrid").jqxGrid('selectrow', 0);
    
			
			
		};
		var onError = function(JsonData){
		alert(JsonData);
		};
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (err) {
        onError(err);
    }
};
    $scope.myFunction =function(option){
    	
    	switch(option) {
    	 
    	 case 'excelExport':
    	  	$("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid');           
         	break; 
         case 'xmlExport':
    		$("#jqxgrid").jqxGrid('exportdata', 'xml', 'jqxGrid');
         	break; 
    	 case 'csvExport':
            $("#jqxgrid").jqxGrid('exportdata', 'csv', 'jqxGrid');
         	break; 
    	case 'tsvExport':
    		$("#jqxgrid").jqxGrid('exportdata', 'tsv', 'jqxGrid');
            break; 
    	 case 'htmlExport':
    	 	$("#jqxgrid").jqxGrid('exportdata', 'html', 'jqxGrid');
            break; 
    	 case 'jsonExport':
    	 	$("#jqxgrid").jqxGrid('exportdata', 'json', 'jqxGrid');
            break; 
    	 case 'pdfExport':
            $("#jqxgrid").jqxGrid('exportdata', 'pdf', 'jqxGrid');
            break; 
    	 case 'print':
    	 var gridContent = $("#jqxgrid").jqxGrid('exportdata', 'html');
                var newWindow = window.open('', '', 'width=800, height=500'),
                document = newWindow.document.open(),
                
                pageContent =
                    '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '<head>\n' +
                    '<meta charset="utf-8" />\n' +
                    '<title>jQWidgets Grid</title>\n' +
                    '</head>\n' +
                    '<body>\n' + gridContent + '\n</body>\n</html>';
                document.write(pageContent);
                document.close();
                newWindow.print();
    		break;  
    	 default: 
       alert('Debe elegir una opción...');
		}    	

};
	});
	
	