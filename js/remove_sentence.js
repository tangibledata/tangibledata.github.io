all_channel.onmessage = function (ev) { 

	if(ev.data = "remove"){
		/*기존 문장 제거*/
		d3.select(".un_sentence").remove();
		d3.selectAll(".un_subject").remove();

		/*기존 문장 제거*/
		d3.select(".uno_sentence").remove();
		d3.selectAll(".uno_subject").remove();

		d3.select("#earth").transition()
						   .style("opacity",1);

		d3.select("body").style("background-image","none");
	}
}