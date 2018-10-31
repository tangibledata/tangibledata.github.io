	//크로스 채널 이벤트 리스너
	cross_channel.onmessage = function (ev) { 
		console.log(ev);
		/*기존 문장 제거*/
		d3.select(".uno_sentence").remove();
		d3.selectAll(".uno_subject").remove();

		var selected_subject = ev.data;
		console.log(selected_subject);

		d3.select("#earth").transition()
						   .style("opacity",0)
						   .delay(800)
						   .on("end",function(d){
						   	d3.select(this).style("display","none");
						   })
						   .on("end",function(){
						   		write_sentence_cross(selected_subject);
						   });
	}

	/*문장쓰기*/
	function write_sentence_cross(selected_subject){
		//subject가 겹치는 문장 추려내기
		var max_score = selected_subject.length;
		var related_sentences = [];
		var highest_score = 0;

		twitter_sentences.forEach(function(d){
			var subject = d.subject;
			var score = compare(selected_subject,subject);
			if(0<score){
				if(highest_score<score){
					highest_score++;
				}
				related_sentences.push({
					"sentence": d.clean_text,
					"subject": d.subject,
					"score": score,
					"media": d.media
				});
				console.log("Score of current sentence: " + score);
			}
		});
		console.log("The highest score: " + highest_score);

		//score가 가장 높은 문장 리스트
		var highest_score_sentences = related_sentences.filter(function(d){
			console.log((d.score == highest_score));
			return d.score == highest_score;
		});

		console.log(highest_score_sentences);

		//최종 리스트에서 1개 랜돔으로 뽑기
		var length = highest_score_sentences.length;
		var index = parseInt(Math.random() * length);
		var final_sentence = highest_score_sentences[index].sentence;
		var final_sentence_subject = highest_score_sentences[index].subject;
		var media = highest_score_sentences[index].media;

		console.log(highest_score_sentences[index]);
		d3.select(".sentence_containner").append("h3")
										 .attr("class","uno_sentence")
										 .attr("data-text",final_sentence);

		d3.select(".sentence_containner").selectAll("p")
										 .data(final_sentence_subject)
										 .enter()
										 .append("p")
										 .attr("class","uno_subject un_red")
										 .html(function(d){
										 	return "#" + d;
										 });

		d3.select("body").style("background-image","url(" + media + ")");
		cross_start_type();
	}

	/*서브젝트 비교*/
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

	function cross_typeWriter(text, n) {
		  if (n < (text.length)) {
		    $('.uno_sentence').html(text.substring(0, n+1));
		    n++;
		    setTimeout(function() {
		      cross_typeWriter(text, n)
		    }, 10);
		  }
		}

	function cross_start_type() {
		  var text = $('.uno_sentence').data('text');
		   console.log(text);
		  
		  cross_typeWriter(text, 0);
		}