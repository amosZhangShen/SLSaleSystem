//获取功能菜单列表
$('.roleNameAuthority').click(function(){
	var authority = $(this);
	var roleId = authority.attr("roleid");
	$("#selectrole").html("当前配置角色为："+authority.attr("rolename"));
	$("#roleidhide").val(roleId);
	//get functionList
	$.ajax({
		url:'/backend/functios.html',
		type:'POST',
		data:{rid:roleId},
		dataType:'json',
		timeout:1000,
		error:function(){
			alert("加载功能列表失败");
		},
		success:function(result){
			if(result == "nodata"){
				alert("对不起，功能列表获取失败，请重试！");
			}else{
				listr = "";
				for(var i=0;i<result.length;i++){
					listr +="<li>";
					listr += "<ul id=\"subfuncul"+result[i].mainFunction.id+"\" class=\"subfuncul\">";
					listr += "<li class=\"functiontitle\" > <input id='functiontitle"+result[i].mainFunction.id+"' onchange='mainFunctionSelectChange(this,"+result[i].mainFunction.id+");' funcid=\""+result[i].mainFunction.id+"\" type='checkbox' />"+result[i].mainFunction.functionName+"</li>";
					for(var j=0;j<result[i].subFunctions.length;j++){
						listr += "<li> <input onchange='subFunctionSelectChange(this,"+result[i].mainFunction.id+");' funcid=\""+result[i].subFunctions[j].id+"\" type='checkbox' />"+result[i].subFunctions[j].functionName+"</li>";
					}
					listr += "</ul></li>"
				}
				$("#functionList").html(listr);
				
				//通过roleId去回显勾选checkbox框的状态（循环）
				$("#functionList :checkbox").each(function(){
					var checkbox = $(this);
					$.ajax({
						url:'/backend/getAuthorityDefault.html',
						type:'POST',
						data:{rid:$("#roleidhide").val(),fid:$(this).attr("funcid")},
						dataType:'html',
						timeout:1000,
						error:function(){
							alert("回显勾选失败！");
						},
						success:function(result){
							if("success" == result){
								//alert("ok");
								checkbox.attr("checked",true);
							}else{
								checkbox.attr("checked",false);
							}
						}
						
					});
					
				});
			}
		}
		
	});
});

//提交授权修改
$("#confirmsave").click(function(){
	if(confirm("您要确定修改当前角色的权限吗？")){
		//roleId functionIds
		var ids = $("#roleidhide").val()+"-";
		$("#functionList :checkbox").each(function(){
			if($(this).attr("checked") == 'checked'){
				ids += $(this).attr("funcid") + "-";
			}
		});
		alert(ids);
		//ajax 提交
		$.ajax({
			url:'/backend/modifyAuthority.html',
			type:'POST',
			data:{ids:ids},
			dataType:'html',
			timeout:1000,
			error:function(){
				alert("修改权限失败!");
			},
			success:function(result){
				if(result == "nodata"){
					alert("对不起，功能列表获取失败，请重试");
				}else{
					alert("恭喜你，权限修改成功！");
				}
			}
			
		});
	}
});













function subFunctionSelectChange(obj,id){
	if(obj.checked){
		$("#functiontitle"+id).attr("checked", true);  
	}
}

function mainFunctionSelectChange(obj,id){
	if(obj.checked){
		$("#subfuncul"+id+" :checkbox").attr("checked", true);  
	}else{
		$("#subfuncul"+id+" :checkbox").attr("checked", false);  
	}
	//alert($(this) +　id);
}

$("#selectAll").click(function () {//全选  
    $("#functionList :checkbox").attr("checked", true);  
});  

$("#unSelect").click(function () {//全不选  
    $("#functionList :checkbox").attr("checked", false);  
});  

$("#reverse").click(function () {//反选  
    $("#functionList :checkbox").each(function () {  
        $(this).attr("checked", !$(this).attr("checked"));  
    });  
});  
