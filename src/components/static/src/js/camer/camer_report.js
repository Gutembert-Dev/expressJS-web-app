import $ from "jquery";

export default {
  name: 'CamerReport',
  data: () => ({
    template: `
      <a href="report">Go to the Report`
  }),
  methods:  {
    onSubmit(event) {
      // $('button#app').hide()
        var data = {"Sales":[{"id":"1","created_at":"2020-05-16 13:11:16","updated_at":"2020-05-16 13:11:16","subtotal":"50","taxes":"9","total":"20","saledetails":[{"id":"2","created_at":"2020-05-16 13:11:16","updated_at":"2020-05-16 13:11:16","product":"Yams4","quantity":"42","price":"452","totalprice":"","sales_id":"1"},{"id":"3","created_at":"2020-05-16 13:11:16","updated_at":"2020-05-16 13:11:16","product":"Yams","quantity":"2","price":"52","totalprice":"","sales_id":"1"},{"id":"4","created_at":"2020-05-16 13:11:16","updated_at":"2020-05-16 13:11:16","product":"Yams2","quantity":"22","price":"52","totalprice":"","sales_id":"1"}]},{"id":"2","created_at":"2020-05-16 18:53:57","updated_at":"2020-05-16 18:53:57","subtotal":"50","taxes":"9","total":"20","saledetails":[{"id":"5","created_at":"2020-05-16 18:53:57","updated_at":"2020-05-16 18:53:57","product":"Yams4","quantity":"42","price":"452","totalprice":"","sales_id":"2"},{"id":"6","created_at":"2020-05-16 18:53:57","updated_at":"2020-05-16 18:53:57","product":"Yams","quantity":"2","price":"52","totalprice":"","sales_id":"2"},{"id":"7","created_at":"2020-05-16 18:53:58","updated_at":"2020-05-16 18:53:58","product":"Yams2","quantity":"22","price":"52","totalprice":"","sales_id":"2"}]},{"id":"3","created_at":"2020-05-16 18:54:33","updated_at":"2020-05-16 18:54:33","subtotal":"50","taxes":"9","total":"20"},{"id":"4","created_at":"2020-05-17 18:14:08","updated_at":"2020-05-17 18:14:08","subtotal":"50","taxes":"9","total":"20","saledetails":[{"id":"8","created_at":"2020-05-17 18:14:08","updated_at":"2020-05-17 18:14:08","product":"Yams4","quantity":"42","price":"452","totalprice":"","sales_id":"4"},{"id":"9","created_at":"2020-05-17 18:14:09","updated_at":"2020-05-17 18:14:09","product":"Yams","quantity":"2","price":"52","totalprice":"","sales_id":"4"},{"id":"10","created_at":"2020-05-17 18:14:09","updated_at":"2020-05-17 18:14:09","product":"Yams2","quantity":"22","price":"52","totalprice":"","sales_id":"4"}]},{"id":"5","created_at":"2020-05-24 18:59:57","updated_at":"2020-05-24 18:59:57","subtotal":"0","taxes":"0","total":"0"},{"id":"6","created_at":"2020-05-24 19:02:09","updated_at":"2020-05-24 19:02:09","subtotal":"0","taxes":"0","total":"0"},{"id":"7","created_at":"2020-05-24 19:09:17","updated_at":"2020-05-24 19:09:17","subtotal":"0","taxes":"0","total":"0"},{"id":"8","created_at":"2020-05-24 19:15:53","updated_at":"2020-05-24 19:15:53","subtotal":"0","taxes":"0","total":"0"},{"id":"9","created_at":"2020-05-24 19:21:32","updated_at":"2020-05-24 19:21:32","subtotal":"0","taxes":"0","total":"0"},{"id":"10","created_at":"2020-05-24 19:23:17","updated_at":"2020-05-24 19:23:17","subtotal":"0","taxes":"0","total":"0","saledetails":[{"id":"11","created_at":"2020-05-24 19:23:17","updated_at":"2020-05-24 19:23:17","product":"4","quantity":"","price":"","totalprice":"","sales_id":"10"}]},{"id":"11","created_at":"2020-05-24 19:27:11","updated_at":"2020-05-24 19:27:11","subtotal":"0","taxes":"0","total":"0"},{"id":"12","created_at":"2020-05-24 19:30:02","updated_at":"2020-05-24 19:30:02","subtotal":"0","taxes":"0","total":"0"},{"id":"13","created_at":"2020-05-24 19:56:07","updated_at":"2020-05-24 19:56:07","subtotal":"0","taxes":"0","total":"0"},{"id":"14","created_at":"2020-05-24 20:12:41","updated_at":"2020-05-24 20:12:41","subtotal":"2","taxes":"-2","total":"5"},{"id":"15","created_at":"2020-05-24 21:10:44","updated_at":"2020-05-24 21:10:44","subtotal":"33","taxes":"65","total":"88"},{"id":"16","created_at":"2020-05-24 21:22:31","updated_at":"2020-05-24 21:22:31","subtotal":"0","taxes":"0","total":"0"},{"id":"17","created_at":"2020-05-24 21:23:26","updated_at":"2020-05-24 21:23:26","subtotal":"0","taxes":"0","total":"0"},{"id":"18","created_at":"2020-05-24 21:25:10","updated_at":"2020-05-24 21:25:10","subtotal":"0","taxes":"0","total":"0"},{"id":"19","created_at":"2020-05-24 21:27:54","updated_at":"2020-05-24 21:27:54","subtotal":"0","taxes":"0","total":"0"},{"id":"20","created_at":"2020-05-24 21:30:03","updated_at":"2020-05-24 21:30:03","subtotal":"0","taxes":"0","total":"0"},{"id":"21","created_at":"2020-05-24 21:30:51","updated_at":"2020-05-24 21:30:51","subtotal":"0","taxes":"0","total":"0"},{"id":"22","created_at":"2020-05-24 21:32:34","updated_at":"2020-05-24 21:32:34","subtotal":"0","taxes":"0","total":"0"},{"id":"23","created_at":"2020-05-24 21:42:26","updated_at":"2020-05-24 21:42:26","subtotal":"1","taxes":"-1","total":"1"},{"id":"24","created_at":"2020-05-25 19:36:46","updated_at":"2020-05-25 19:36:46","subtotal":"0","taxes":"0","total":"0"},{"id":"25","created_at":"2020-05-25 21:06:00","updated_at":"2020-05-25 21:06:00","subtotal":"","taxes":"","total":""},{"id":"26","created_at":"2020-05-25 21:23:33","updated_at":"2020-05-25 21:23:33","subtotal":"","taxes":"","total":""},{"id":"27","created_at":"2020-05-25 21:28:10","updated_at":"2020-05-25 21:28:10","subtotal":"1","taxes":"-1","total":"-1"},{"id":"28","created_at":"2020-05-25 21:29:34","updated_at":"2020-05-25 21:29:34","subtotal":"-2","taxes":"-1","total":"2"},{"id":"29","created_at":"2020-05-25 22:05:21","updated_at":"2020-05-25 22:05:21","subtotal":"","taxes":"","total":""},{"id":"30","created_at":"2020-05-25 22:09:39","updated_at":"2020-05-25 22:09:39","subtotal":"","taxes":"","total":""},{"id":"31","created_at":"2020-05-25 22:12:59","updated_at":"2020-05-25 22:12:59","subtotal":"","taxes":"","total":""},{"id":"32","created_at":"2020-05-25 22:16:12","updated_at":"2020-05-25 22:16:12","subtotal":"","taxes":"","total":""},{"id":"33","created_at":"2020-05-25 22:18:01","updated_at":"2020-05-25 22:18:01","subtotal":"1","taxes":"-1","total":"1"},{"id":"34","created_at":"2020-05-25 22:25:03","updated_at":"2020-05-25 22:25:03","subtotal":"1","taxes":"-1","total":"-1"},{"id":"35","created_at":"2020-05-25 22:27:03","updated_at":"2020-05-25 22:27:03","subtotal":"1","taxes":"-1","total":"-1"},{"id":"36","created_at":"2020-05-25 22:28:16","updated_at":"2020-05-25 22:28:16","subtotal":"1","taxes":"-1","total":"-2"},{"id":"37","created_at":"2020-05-26 17:44:31","updated_at":"2020-05-26 17:44:31","subtotal":"0","taxes":"0","total":"0"},{"id":"38","created_at":"2020-05-26 18:13:36","updated_at":"2020-05-26 18:13:36","subtotal":"0","taxes":"0","total":"0"},{"id":"39","created_at":"2020-05-26 18:39:22","updated_at":"2020-05-26 18:39:22","subtotal":"0","taxes":"0","total":"0"},{"id":"40","created_at":"2020-05-26 18:49:56","updated_at":"2020-05-26 18:49:56","subtotal":"-1","taxes":"1","total":"-1"},{"id":"41","created_at":"2020-05-26 20:05:40","updated_at":"2020-05-26 20:05:40","subtotal":"-2","taxes":"-1","total":"3"},{"id":"42","created_at":"2020-05-26 20:22:36","updated_at":"2020-05-26 20:22:36","subtotal":"2","taxes":"1","total":"-1"},{"id":"43","created_at":"2020-05-26 20:25:32","updated_at":"2020-05-26 20:25:32","subtotal":"2","taxes":"1","total":"-1"},{"id":"44","created_at":"2020-05-26 21:00:05","updated_at":"2020-05-26 21:00:05","subtotal":"0","taxes":"0","total":"0"},{"id":"45","created_at":"2020-05-26 22:06:07","updated_at":"2020-05-26 22:06:07","subtotal":"0","taxes":"0","total":"0"},{"id":"46","created_at":"2020-05-26 22:58:09","updated_at":"2020-05-26 22:58:09","subtotal":"0","taxes":"0","total":"0"},{"id":"47","created_at":"2020-05-27 19:03:58","updated_at":"2020-05-27 19:03:58","subtotal":"0","taxes":"0","total":"0"},{"id":"48","created_at":"2020-05-27 19:30:24","updated_at":"2020-05-27 19:30:24","subtotal":"0","taxes":"0","total":"0"},{"id":"49","created_at":"2020-05-27 19:34:46","updated_at":"2020-05-27 19:34:46","subtotal":"-1","taxes":"1","total":"-1"},{"id":"50","created_at":"2020-05-27 19:38:05","updated_at":"2020-05-27 19:38:05","subtotal":"-1","taxes":"1","total":"-1","saledetails":[{"id":"12","created_at":"2020-05-27 19:38:05","updated_at":"2020-05-27 19:38:05","product":"aa","quantity":"-1","price":"1","totalprice":"-1","sales_id":"50"}]},{"id":"51","created_at":"2020-05-27 20:15:42","updated_at":"2020-05-27 20:15:42","subtotal":"-1","taxes":"1","total":"1","saledetails":[{"id":"13","created_at":"2020-05-27 20:15:42","updated_at":"2020-05-27 20:15:42","product":"Apple","quantity":"-1","price":"1","totalprice":"-1","sales_id":"51"}]},{"id":"52","created_at":"2020-05-27 20:22:25","updated_at":"2020-05-27 20:22:25","subtotal":"-1","taxes":"1","total":"-1","saledetails":[{"id":"14","created_at":"2020-05-27 20:22:26","updated_at":"2020-05-27 20:22:26","product":"Apple","quantity":"-1","price":"1","totalprice":"-1","sales_id":"52"}]},{"id":"53","created_at":"2020-05-27 20:24:38","updated_at":"2020-05-27 20:24:38","subtotal":"-1","taxes":"1","total":"-1","saledetails":[{"id":"15","created_at":"2020-05-27 20:24:38","updated_at":"2020-05-27 20:24:38","product":"Apple","quantity":"-1","price":"1","totalprice":"1","sales_id":"53"}]},{"id":"54","created_at":"2020-05-27 22:26:17","updated_at":"2020-05-27 22:26:17","subtotal":"-1","taxes":"-1","total":"1","saledetails":[{"id":"16","created_at":"2020-05-27 22:26:18","updated_at":"2020-05-27 22:26:18","product":"Apple","quantity":"-1","price":"1","totalprice":"1","sales_id":"54"}]},{"id":"55","created_at":"2020-05-28 00:37:38","updated_at":"2020-05-28 00:37:38","subtotal":"-1","taxes":"1","total":"-1","saledetails":[{"id":"17","created_at":"2020-05-28 00:37:38","updated_at":"2020-05-28 00:37:38","product":"Apple","quantity":"-1","price":"1","totalprice":"1","sales_id":"55"}]}]};
        var model = Object.keys(data)[0];
        $(function () {
        //make request to your WebAPI and get data of registeredCarriers
        //then use the data you got (like below) to generate source and populate bootstrap4 treeview

        var tree = [];
        
        $.each(data[model], function (index, object) {
            generateNodes(object, tree);
        });
    });

    function generateNodes(object, arr_tree) {
        var relationMappingsKey = ""
        for(var keyValue of Object.entries(object)){
            if(typeof keyValue[1] === "object"){
                relationMappingsKey = keyValue[0];
                alert("Hi " + relationMappingsKey);
            }
        }
        var view = "<button type='button' id='btnView_" + object.id + "' class='btn btn-primary' style='float: right;' onclick='viewFunction()'>" +
            "<i class='glyphicon glyphicon-eye-open'></i> view" +
            "</button>";
        var edit = "<button type='button' id='btnEdit_" + object.id + "' class='btn btn-primary' style='float: right;' onclick='editFunction()'>" +
            "<i class='glyphicon glyphicon-edit'></i> Edit" +
            "</button>";
        var del = "<button type='button' id='btnDel_" + object.id + "' class='btn btn-primary' style='float: right;' onclick='deleteFunction()'>" +
            "<i class='glyphicon glyphicon-trash'></i> Del" +
            "</button>";
        var button = view + edit + del;
        // var parentNode = { "text": object.id + button };
        var parentNode = { "text": button };

        if(relationMappingsKey !== ""){
            parentNode.nodes = []
            $.each(object[relationMappingsKey], function (index, relationMappingObject) {
                var view = "<button type='button' id='btnView_" + relationMappingObject.id + "' class='btn btn-primary' style='float: right;' onclick='viewFunction()'>" +
                    "<i class='glyphicon glyphicon-eye-open'></i> view" +
                    "</button>";
                var edit = "<button type='button' id='btnEdit_" + relationMappingObject.id + "' class='btn btn-primary' style='float: right;' onclick='editFunction()'>" +
                    "<i class='glyphicon glyphicon-edit'></i> Edit" +
                    "</button>";
                var del = "<button type='button' id='btnDel_" + relationMappingObject.id + "' class='btn btn-primary' style='float: right;' onclick='deleteFunction()'>" +
                    "<i class='glyphicon glyphicon-trash'></i> Del" +
                    "</button>";
                var button = view + edit + del;
                // var childNode = { "text": relationMappingObject.id + button};
                var childNode = { "text": button};
                parentNode.nodes.push(childNode);
            });
        }

        arr_tree.push(parentNode);

        var $searchableTree = $('div#treeForm').treeview({ data: arr_tree,
                                multiSelect: false,
                                showCheckbox: true,
                                onNodeChecked: function (event, data) {  },
                                onNodeUnchecked: function (event, data) {  },
                                onNodeSelected: function (event, data) {  } 
                            });

        $('div#treeForm').treeview('collapseAll', { silent: true });
    }

    // $("[id=btnEdit_1]").on('click', function(){
    //     alert("Create?")
    // })

    // $("button.btn-primary").click(function(){
    //     alert("Edit/Delete?")
    // })

    function viewFunction(){
        alert('Working on View??')
    }

    function editFunction(){
        alert('Working on Edit??')
    }

    function deleteFunction(){
        alert('Working on Delete??')
    }
    }
  }
}
