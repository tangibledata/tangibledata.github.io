//UN문서 카테고리 로드
d3.json("data/un_category.json").then(function(data){
	console.log(data);
	var category_list =  d3.select("#un_o_category_list").selectAll("div")
								 .data(data)
								 .enter()
								 .append("div")
								 .attr("class","category_item flex_col");

	//Add Chapter Number
	category_list.append("p")
				 .attr("class", "margin_zero un_o_chapter un_blue")
				 .style("font-family","'Roboto', sans-serif")
				 .html(function(d, i){
				 	return "Chapter" + (i+1);
				 });

	category_list.append("h3")
	 			 .attr("class", "un_o_category margin_zero")
				 .html(function(d){
				 	return d.topic_title;
				 });

	
	/*카테고리 클릭 이벤트*/
	category_list.on("click",function(d,i){

		/*Subcategory popup*/
		var sub_category = d3.select("#un_o_category_list")
							 .append("div")
							 .attr("class","subcat_popup col flex_row");



		var sub_category_list = sub_category.selectAll("div")
										    .data(d.subjects)
										    .enter()
										    .append("div")
										    .attr("class","category_item flex_col");

		sub_category_list.append("p")
				 .attr("class", "margin_zero un_o_chapter un_blue")
				 .style("font-family","'Roboto', sans-serif")
				 .html(function(d, i){
				 	return "Subject" + (i+1);
				 });
		

		sub_category_list.append("h3")
			 			 .attr("class", "un_o_category margin_zero")
						 .html(function(d){
						 	return d;
						 });

		/*Exit Button*/
		var exit = sub_category.append("div")
									.attr("class","category_item flex_row exit align_center");

		exit.append("img")										
			.attr("src","img/ic_back.svg");

		exit.append("p")
			.attr("class","instruct")
			.html("Back to main");

		exit.on("click",function(){
			d3.select(".subcat_popup").remove();
		});

		/*Sub Category List Even*/
		sub_category_list.on("click",function(d){
			/*디스플레이로 메세지 전송*/
			console.log(d);
			var message = d + " un";
			un_channel.postMessage(message);

			
		});
	});
});
