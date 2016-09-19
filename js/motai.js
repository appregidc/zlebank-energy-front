//提示框,需传一个参数，参数cot为提示内容
function alerts(cot){ 
	  $(".alert_cont").text(cot);
	  layer.open({
		  type: 1,
		  //shadeClose:true,
		  // shade:0,
		  id:'a',
		  tipsMore:true,
		  title:  ['提示', 'border-bottom: 1px solid #ddd;font-size: 16px;color: #666;'],
		  area: ['346px', '188px'], //宽高
		  content: $(".alert_box")
	  });
	  $(".alert_btn").click(function(){layer.closeAll();});
}
//模态窗口，需传两个参数，参数cot为提示内容,href为网页跳转地址
function motai(cot,href){ 
	$(".motai_cont").text(cot);
	layer.open({
		type: 1,
		id:'a',
		title:  ['提示', 'border-bottom: 1px solid #ddd;font-size: 16px;color: #666;'],
		area: ['400px', '230px'], //宽高
		content: $(".motai_box")
	});
	$(".motai_cancel").click(function(){
		layer.closeAll();
	});
	$(".motai_sure").click(function(){
		location.href=href;
	});
}