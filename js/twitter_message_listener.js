//트위터 채널 수신 이벤트 리스너
	twitter_channel.onmessage = function (ev) { 

		/*기존 문장 제거*/
		d3.select(".uno_sentence").remove();
		d3.selectAll(".uno_subject").remove();

		var message = ev.data;
		var source;
		var sub;
		console.log(message);

		d3.select("#earth").transition()
						   .style("opacity",0)
						   .on("end",function(d){
						   	d3.select("#earth").style("display","none");
						   })
						   .on("end",function(){
								write_sentence_twitter(message);						
						   });
	}

	function write_sentence_twitter(message){
		//"subject source"형태로 메세지가 옴. 
		//사용자 인풋이 twitter인지 확인
		if(message.includes("twitter")){
			
			//메세지에서 subject만 분리
			sub = message.split(" ")[0];
			console.log(sub);

			//해당 subject가 포함된 모든 문장 리스트 저장
			sub_sentence_list = twitter_sentences.filter(function(d){return d.subject.includes(sub)});
			console.log(sub_sentence_list);

			//문장 리스트에서 랜돔으로 한문장 추출
			var length = sub_sentence_list.length;
			var index = parseInt(Math.random() * length);
			console.log(index);
			var sentence = sub_sentence_list[index].clean_text;
			var subjects = sub_sentence_list[index].subject;
			var media = sub_sentence_list[index].media;
			var topic_num = sub_sentence_list[index].topic;
			var input_value = {
				"subject": subjects,
				"topic_num": topic_num

			}
			console.log(subjects);
			
			d3.select(".sentence_containner").append("h3")
											 .attr("class","uno_sentence")
											 .attr("data-text",sentence);

			d3.select(".sentence_containner").selectAll("p")
											 .data(subjects)
											 .enter()
											 .append("p")
											 .attr("class","uno_subject un_red")
											 .html(function(d){
											 	return "#" + d;
											 });

			d3.select("body").style("background-image","url(" + media + ")");

			twitter_start_type(input_value);		

		}
	}

	function twitter_typeWriter(text, n) {
		  if (n < (text.length)) {
		    $('.uno_sentence').html(text.substring(0, n+1));
		    n++;
		    setTimeout(function() {
		      twitter_typeWriter(text, n)
		    }, 10);
		  }
		}

	function twitter_start_type(input_value) {
		  var text = $('.uno_sentence').data('text');
		  var n = text.length;
		  var end_time = 10 * n;
		  console.log(end_time);
		  console.log(text);
		  twitter_typeWriter(text, 0);
		 
		  setTimeout(function() {
		  	console.log("send " + input_value + " to Cross Channel")
		      cross_channel.postMessage(input_value);
		    }, end_time);
		}