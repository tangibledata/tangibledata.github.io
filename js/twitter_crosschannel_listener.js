//크로스 채널 이벤트 리스너
	cross_channel.onmessage = function (ev) { 

		/*기존 문장 제거*/
		d3.select(".uno_sentence").remove();
		d3.selectAll(".uno_subject").remove();

		var selected_subjects = ev.data;
		console.log(selected_subjects);

		//subject가 겹치는 문장 추려내기
		var max_score = selected_subjects.length;
		var related_sentences = [];
		var highest_score = 0;

		twitter_sentences.forEach(function(d){
			var subjects = d.subjects;
			var score = compare(selected_subjects,subjects);
			if(0<score){
				if(highest_score<score){
					highest_score++;
				}
				related_sentences.push({
					"sentence": d.sentence,
					"subjects": d.subjects,
					"score": score
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
		var final_sentence_subjects = highest_score_sentences[index].subjects;

		d3.select(".sentence_containner").append("h3")
										 .attr("class","uno_sentence")
										 .html(final_sentence);

		d3.select(".sentence_containner").selectAll("p")
										 .data(final_sentence_subjects)
										 .enter()
										 .append("p")
										 .attr("class","uno_subject un_red")
										 .html(function(d){
										 	return "#" + d;
										 });
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