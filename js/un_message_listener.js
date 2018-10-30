//메세지 수신 이벤트 리스너
	un_channel.onmessage = function (ev) { 

		/*기존 문장 제거*/
		d3.select(".un_sentence").remove();
		d3.selectAll(".un_subject").remove();

		var message = ev.data;
		var source;
		var sub;
		console.log(message);

		//"subject source"형태로 메세지가 옴. 
		//사용자 인풋이 UN인지 확인
		if(message.includes("un")){
			
			//메세지에서 subject만 분리
			sub = message.split(" ")[0];
			console.log(sub);

			//해당 subject가 포함된 모든 문장 리스트 저장
			sub_sentence_list = un_sentences.filter(function(d){return d.subject.includes(sub)});
			console.log(sub_sentence_list);

			//문장 리스트에서 랜돔으로 한문장 추출
			var length = sub_sentence_list.length;
			var index = parseInt(Math.random() * length);
			console.log(index);
			var sentence = sub_sentence_list[index].clean_text;
			var subjects = sub_sentence_list[index].subject;
			console.log(subjects);
			
			d3.select(".sentence_containner").append("h3")
											 .attr("class","un_sentence")
											 .html(sentence);

			d3.select(".sentence_containner").selectAll("p")
											 .data(subjects)
											 .enter()
											 .append("p")
											 .attr("class","un_subject un_blue")
											 .html(function(d){
											 	return "#" + d;
											 });

			//Subject List, Twitter화면으로 전달
			cross_channel.postMessage(subjects);
		}

	}
