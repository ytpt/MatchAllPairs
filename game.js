window.addEventListener("load",init);
function init(){
	// вывод предыдущего результата
	if(localStorage.getItem("hits")) {
		document.querySelector("title").innerHTML = "Ваш результат " + localStorage.getItem("hits");
		document.querySelector("#counter").innerHTML = "Ваш результат " + localStorage.getItem("hits");
	}

	let cardTotal = 12;
	//элементы
	let sel = document.getElementById("levels"),
	game = document.getElementById("game"),
	btStart = document.getElementById("start"),
	counter = document.getElementById("counter");
	//создание стилей
	let style = document.createElement("style");
	for(let i=0; i<cardTotal; i++){
		style.append("#game .card"+i+"{	background-image:url(cards/k"+(100+i)+".png)}")
	}//for
	document.head.append(style);
	
	btStart.onclick = start;
	
	function start(){
		//удаление старых карточек
		game.querySelectorAll("div").forEach(function(elem){
			elem.remove();
		})//forEach
		
		let count = sel.value * 4;
		let hits = 0;
		let masCard = [];
		//массив с номерами карточек
		for(let i=0; i<count * 2; i++){
			masCard.push(i % count);
		}//for
		//перемешиваем номера в массиве
		for(let i = 0; i < count; i++){
			let n1 = Math.floor(Math.random() * count);
			let n2 = Math.floor(Math.random() * count) + count;
			let buf = masCard[n1];
			masCard[n1] = masCard[n2];
			masCard[n2] = buf;
		}//for
		
		console.log(masCard);
		
		//создание карточек
		for(let i=0; i<count*2; i++){
			let card = document.createElement("div");
			card.classList.add("card");
			card.classList.add("r");
			card.num = masCard[i];
			//card.classList.add("card" + card.num);
			game.append(card);
		}//for
		
		let cards = game.querySelectorAll(".card");
		let card1, card2;
		let step = 0;
		//клик по карточке
		cards.forEach(function(elem){
			elem.onclick = cardClick;
		})//forEach
		
		function cardClick(){
			hits++;
			counter.innerHTML = "Ходов: " + hits;
			if(step == 0){
				if(document.querySelectorAll(".r").length < count * 2){
					if(card1.num == "ok"){
						//ничего
					}else{
						//перевернуть карты 1 и 2
						flipCard(card1,false);
						flipCard(card2,false);
					}//if ok
				}//if length < c*2
				//это карта 1
				card1 = this;
				//перевернуть карту
				flipCard(card1,true);
				step++;
			}else{
				// карта закрыта?
				if(this.classList.contains("r")) {
					// карта 2
					card2 = this;
					// перевернуть карту
					flipCard(card2,true);
					step = 0; // обнулить шаг

					// равны ли карты
					if(card1.num == card2.num) {
						// заморозить карты
						freezeCards(card1,card2);
					}
				} 
				
			}//if step == 0

			// проверка окончания игры и сохранение результата
			if(document.querySelectorAll("r").length == 0) {
				let best = Math.min(hits,localStorage.getItem("hits"));
				localStorage.setItem("hits",hits);
				document.querySelector("title").innerHTML = "Ваш результат " + localStorage.getItem("hits");
			}	
		} // cardClick
		
		// функция переворота карт
		function flipCard(card,toFront) {
			if(toFront) {
				card.classList.add("card" + card.num);
				card.classList.remove("r");
			}else {
				card.classList.remove("card" + card.num);
				card.classList.add("r");
			}
		} // flipCard
		// функция заморозки карт
		function freezeCards(card1,card2) {
			card1.onclick = null;
			card1.num = "ok";
			card1.style.backgroundColor = "#ccf";
			card2.style.backgroundColor = "#ccf";
		} // freezeCards
		
		
	}//start
	
	
	
}//init






