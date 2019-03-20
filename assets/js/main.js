var req = new XMLHttpRequest();
var container = document.querySelector('#counter');
var updateId = 0;
var updateId2 = 0;
var requestIntervalTime = 1;
var i = 0;
var data = {};
var update = function() {
	req.open('GET', 'counter.json?i=' + i, true);

	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200)
		{
			data = JSON.parse(this.responseText);

			if (isNaN(parseInt(container.innerHTML)))
				container.innerHTML = data.counter;

			if (data.counter != container.innerHTML)
			{
				clearInterval(updateId);

				updateId2 = setInterval(function() {
					if ((container.innerHTML - data.counter) > 0)
						container.innerHTML--;
					else
						container.innerHTML++;
					if (data.counter == container.innerHTML)
					{
						clearInterval(updateId2);
						updateId = setInterval(update, requestIntervalTime * 1000);
					}
				}, 50);
			}
			i++;
		}
	};

	req.send(null);
}

update();
updateId = setInterval(update, requestIntervalTime * 1000);