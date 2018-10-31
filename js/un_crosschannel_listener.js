
	//크로스 채널 이벤트 리스너
	cross_channel.onmessage = function (ev) { 

		/*기존 문장 제거*/
		d3.select(".un_sentence").remove();
		d3.selectAll(".un_subject").remove();

		var input_value = ev.data;
		var selected_subject = input_value.subject;
		var topic_num = input_value.topic_num;
		console.log(input_value);

		d3.select("#earth").transition()
						   .style("opacity",0)
						   .delay(800)
						   .on("end",function(d){
						   	d3.select(this).style("display","none");
						   })
						   .on("end",function(){
						   		write_sentence_cross(selected_subject,topic_num);
						   });

	}

	/*문장쓰기 함수*/
	function write_sentence_cross(selected_subject,topic_num){
		//subject가 겹치는 문장 추려내기
		var max_score = selected_subject.length;
		var related_sentences = [];
		var highest_score = 0;
		var score = 0;

		un_sentences.forEach(function(d){
			var subject = d.subject;
			var score = compare(selected_subject,subject);
			if(0<score){
				if(highest_score<score){
					highest_score = score;
				}
				related_sentences.push({
					"sentence": d.clean_text,
					"subject": d.subject,
					"score": score
				});
				console.log("highest score: " + highest_score);
				console.log("Score of current sentence: " + score);
			}
		});
		console.log("The highest score: " + highest_score);
		console.log(related_sentences);
		//score가 가장 높은 문장 리스트

		if(highest_score==0){
			var topic_num2;
			
			if(topic_num==0){
				topic_num2 = 1;
			}
			else if(topic_num==2){
				topic_num2 = 6;
			}
			else if(topic_num==3){
				topic_num2 = 6;
			}else if(topic_num==4){
				topic_num2 = 9;
			}else if(topic_num==6){
				topic_num2 = 1;
			}else if(topic_num==8){
				topic_num2 = 9;
			}else if(topic_num==9){
				topic_num2 = 4;
			}
			/*토픽으로 크게 문장 추출*/
			var highest_score_sentences = related_sentences.filter(function(d){
				console.log((d.topic == topic_num2));
				return d.topic == topic_num2;
			});

		}else{
			/*서브젝트로 문장 추출*/
			var highest_score_sentences = related_sentences.filter(function(d){
				console.log((d.score == highest_score));
				return d.score == highest_score;
			});

			//최종 리스트에서 1개 랜돔으로 뽑기
			
		}
		console.log(highest_score_sentences);
		var length = highest_score_sentences.length;
		var index = parseInt(Math.random() * length);
		var final_sentence = highest_score_sentences[index].sentence;
		var final_sentence_subject = highest_score_sentences[index].subject;
		d3.select(".sentence_containner").append("h3")
											 .attr("class","un_sentence")
											 .attr("data-text",final_sentence);

		d3.select(".sentence_containner").selectAll("p")
										 .data(final_sentence_subject)
										 .enter()
										 .append("p")
										 .attr("class","un_subject un_blue")
										 .html(function(d){
										 	return "#" + d;
										 });

		start_type();
	}

	function compare(arr1,arr2){
		const finalarray = [];
		arr1.forEach((e1)=>arr2.forEach((e2)=>
					  {if(e1 == e2){
					  	finalarray.push(e1)
					  }
					 }
					));
		return finalarray.length;
	}

	function typeWriter(text, n) {
		  if (n < (text.length)) {
		    $('.un_sentence').html(text.substring(0, n+1));
		    n++;
		    setTimeout(function() {
		      typeWriter(text, n)
		    }, 10);
		  }
		}

	function start_type() {
		  var text = $('.un_sentence').data('text');
		   console.log(text);
		  
		  typeWriter(text, 0);
		}